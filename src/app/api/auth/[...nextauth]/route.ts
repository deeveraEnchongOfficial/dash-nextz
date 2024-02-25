import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import { connect } from "@/utils/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        const prisma = new PrismaClient()
        //Check if the user exists.
        await connect(); // Assuming this function connects to your database

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          });

          if (user) {
            if (credentials && credentials.password) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (isPasswordCorrect) {
                return user;
              } else {
                throw new Error("Wrong Credentials!");
              }
            } else {
              throw new Error("Invalid credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: "/auth/signin",
  },
  callbacks: {
    async session({ token, session }: { token: any, session: any }) {
      session.user = token.user;
      session.user.password = undefined;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    redirect: async ({ url, baseUrl }: { url: string, baseUrl: string }) => {
      return Promise.resolve(baseUrl + '/dashboard');
    },
  },
});

export { handler as GET, handler as POST };
