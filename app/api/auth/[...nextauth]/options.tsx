import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const [existingUser]: any = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [credentials?.username]
          );
          var password = credentials?.password as string;

          var user = existingUser[0];
          //console.log(user.password);
          if (existingUser.length > 0) {
            var user = existingUser[0];

            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              return null;
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    //strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },
  // jwt: {
  //   signingKey: process.env.NEXTAUTH_SECRET,
  // },
  callbacks: {
    async session({ session, token }: any) {
      //const user = token.user as IUser
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
