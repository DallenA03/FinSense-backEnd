import crypto from "crypto";

const algorithm = "aes-256-cbc";
// Derive a 32-byte key from the environment secret
const key = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY || "default-secret-key")
  .digest();

export const encrypt = (text) => {
  if (!text) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Return IV:EncryptedText
  return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (encryptedText) => {
  if (!encryptedText) return null;
  const [ivHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
