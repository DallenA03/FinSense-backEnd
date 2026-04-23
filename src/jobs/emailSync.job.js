import cron from "node-cron";
import { EmailConfig } from "../modules/email/email.model.js";
import { connectAndFetchEmails } from "../modules/email/email.service.js";

/**
 * Job to sync emails for all active accounts.
 * Runs every hour by default.
 */
export const initEmailSyncJob = () => {
  // Cron expression for every hour: "0 * * * *"
  // For testing every 15 mins: "*/15 * * * *"
  cron.schedule("0 * * * *", async () => {
    console.log("[Job] Starting scheduled email sync...");
    
    try {
      const activeConfigs = await EmailConfig.find({ isActive: true });
      
      for (const config of activeConfigs) {
        try {
          console.log(`[Job] Syncing email: ${config.email}`);
          await connectAndFetchEmails(config._id, config.userId);
        } catch (err) {
          console.error(`[Job] Failed to sync ${config.email}:`, err.message);
        }
      }
      
      console.log("[Job] Scheduled email sync completed.");
    } catch (error) {
      console.error("[Job] Critical error in email sync job:", error.message);
    }
  });
};
