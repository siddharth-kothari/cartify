import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../..";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const body = JSON.stringify({
          identifier: credentials?.username,
          password: credentials?.password,
        });
        const { data: user } = await api.post(
          "http://127.0.0.1:1337/api/auth/local",
          body
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },

  // session: {
  //   strategy: "jwt",
  //   maxAge: 90 * 24 * 60 * 60,
  // },
  // jwt: {
  //   signingKey: process.env.NEXTAUTH_SECRET,
  // },
  // callbacks: {
  //   async session({ session, token }) {
  //     //const user = token.user as IUser
  //     session.user = token.user;
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  // },
};
