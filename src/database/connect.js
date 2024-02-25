import { connect } from "mongoose";

export default {
  async start() {
    try {
      const urlConnect = process.env.DATABASE_URL;

      if (!urlConnect) {
        throw new Error(
          "Insert the database connection string into the DATABASE_URL key of the .env file",
        );
      }

      await connect(urlConnect);

      console.log("[DATABASE] - Connected to database");
    } catch (error) {
      console.error("[DATABASE] - " + error);
      process.exit(1);
    }
  },
};
