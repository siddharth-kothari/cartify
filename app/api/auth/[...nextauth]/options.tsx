import type { NextAuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User, Account } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

type SignInCallbackParams = {
  user: User | AdapterUser;
  account: Account | null;
};

const signInCallback: (
  params: SignInCallbackParams
) => Promise<boolean | undefined> = async ({ user, account }) => {
  if (account?.provider == "credentials") {
    return true;
  }

  if (account?.provider == "google") {
    try {
      const [existingUser]: any = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [user.email]
      );

      if (existingUser.length == 0) {
        const [newUser]: any = await pool.execute(
          "INSERT INTO users(name,email) VALUES(?,?)",
          [user.name, user.email]
        );

        return true;
      }
      return true;
    } catch (error) {
      console.log("Error saving user: ", error);
      return false;
    }
  }
};

const callbacks = {
  signIn: signInCallback,

  // Add other callbacks as needed
};

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

          var user = existingUser[0];
          if (existingUser.length > 0) {
            var user = existingUser[0];

            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
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

  callbacks: callbacks as Record<string, (params: any) => Promise<any>>,
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/login",
  // },

  // session: {
  //   //strategy: "jwt",
  //   maxAge: 90 * 24 * 60 * 60,
  // },
  // // jwt: {
  // //   signingKey: process.env.NEXTAUTH_SECRET,
  // // },
  // callbacks: {
  //   async session({ session, token }: any) {
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
