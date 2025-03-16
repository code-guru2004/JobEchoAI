import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_iZY3EvF7yjMs@ep-crimson-lab-a8t5deh1-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});