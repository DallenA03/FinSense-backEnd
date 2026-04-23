import app from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";
import { initEmailSyncJob } from "./jobs/emailSync.job.js";

connectDB();

// Initialize Background Jobs
initEmailSyncJob();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});