import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import {client, db} from '@/db';
import Google from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(client.connect(), {
        databaseName: 'NextChat',
    }),
  session: {
      strategy: "jwt",
  },
  providers: [
      Google({
          clientId: process.env.GOOGLE_ID ?? "",
          clientSecret: process.env.GOOGLE_SECRET ?? "",
          allowDangerousEmailAccountLinking: true,
        }),
  ],
    callbacks: {
        async signIn(user) {

            // Check if the user already exists in the database
            const existingUser = await db.collection('users').findOne({email: user.user.email});

            // If the user does not exist, it's a new user
            if (!existingUser) {
                // Add additional fields to the new user
                const additionalFields = {
                    // Add your custom fields here
                    // For example:
                    chats: [],
                    friends: [],
                    customStatus: '',
                    lastReadChat: '',
                    status: '',
                    phoneNumber: '',
                    googleId: user.user.id,
                };

                // Insert the new user with additional fields into the database
                await db.collection('users').insertOne({...user.user, ...additionalFields});
            }

            // You can also modify the user object here if needed
            return true;
        },
    },
};
