import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),

  trustedOrigins: [
    "https://scrapbook-three-lilac.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },
});