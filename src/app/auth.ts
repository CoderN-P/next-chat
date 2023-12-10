import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import readUser from "@/db/read/user";
import CredentialsProvider from "next-auth/providers/credentials";

var bcryptjs = require('bcryptjs');

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await readUser(null, credentials.email);
        if (!user || !(await bcryptjs.compare(credentials.password, user.password))) return null;

        return {
            id: user._id,
            name: user.username,
            email: user.email,
            randomKey: "key",
        }
      },
    }),
      GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
      })
  ],
};
