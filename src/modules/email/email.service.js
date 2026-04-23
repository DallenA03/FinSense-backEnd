import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { google } from "googleapis";
import * as emailRepo from "./email.repository.js";
import { parseTransactionEmail } from "./email.parser.js";
import * as transactionService from "../transaction/transaction.service.js";
import { encrypt, decrypt } from "../../common/utils/encryption.js";
import { EmailConfig } from "./email.model.js";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * Saves or updates Google OAuth tokens for a user
 */
export const saveEmailOAuth = async ({
  userId,
  email,
  accessToken,
  refreshToken,
  expiryDate,
}) => {
  return await EmailConfig.findOneAndUpdate(
    { userId, email: email.toLowerCase() },
    {
      userId,
      email: email.toLowerCase(),
      provider: "gmail",
      accessToken: encrypt(accessToken),
      refreshToken: refreshToken ? encrypt(refreshToken) : undefined,
      tokenExpiry: new Date(expiryDate),
    },
    { upsert: true, new: true }
  );
};

/**
 * Fetches and syncs emails for a given config
 */
export const connectAndFetchEmails = async (configId, userId) => {
  // We need to select encrypted tokens specifically as they are select: false
  const config = await EmailConfig.findOne({ _id: configId, userId }).select("+accessToken +refreshToken");

  if (!config) throw new Error("Email configuration not found");

  let accessToken = decrypt(config.accessToken);

  // Handle Token Refresh for Gmail OAuth
  if (config.provider === "gmail" && config.refreshToken) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    auth.setCredentials({
      access_token: accessToken,
      refresh_token: decrypt(config.refreshToken),
      expiry_date: config.tokenExpiry.getTime(),
    });

    // Check if expired (with 1 min buffer)
    if (Date.now() >= config.tokenExpiry.getTime() - 60000) {
      const { credentials } = await auth.refreshAccessToken();
      accessToken = credentials.access_token;
      
      // Update database with new tokens
      await EmailConfig.findByIdAndUpdate(configId, {
        accessToken: encrypt(credentials.access_token),
        tokenExpiry: new Date(credentials.expiry_date),
      });
    }
  }

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: config.email,
      accessToken: accessToken,
    },
  });

  const transactionsCreated = [];

  try {
    await client.connect();
    let lock = await client.getMailboxLock("INBOX");
    
    try {
      const searchCriteria = config.lastFetchedAt 
        ? { since: config.lastFetchedAt }
        : { unseen: true };

      for await (let message of client.fetch(searchCriteria, { source: true })) {
        const parsed = await simpleParser(message.source);
        const text = parsed.text || "";
        const txData = parseTransactionEmail(text);
        
        if (txData.amount > 0) {
          try {
            const referenceId = `email-${message.uid}`; 
            const result = await transactionService.createTransaction(userId, {
              ...txData,
              referenceId,
            });
            transactionsCreated.push(result);
          } catch (err) {
            // Duplicate skip
          }
        }
      }

      await EmailConfig.findByIdAndUpdate(configId, { lastFetchedAt: new Date() });
      
    } finally {
      lock.release();
    }
    await client.logout();
  } catch (error) {
    throw new Error("Failed to fetch emails: " + error.message);
  }

  return transactionsCreated;
};

export const getConfigs = async (userId) => {
  return await EmailConfig.find({ userId });
};
