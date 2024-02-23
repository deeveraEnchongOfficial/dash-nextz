import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
 secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        //Check if the user exists.
        await connect(); // Assuming this function connects to your database

        try {
          const user = await User.findOne({
            email: credentials?.email,
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
    error: "/dashboard/login",
  },
  callbacks: {
    session: async ({ session, token, user }: { session: any, token: any, user: any}) => {
      const fullUser = await User.findOne({ email: session.user.email }).select('-password');
      session.auth = session.user || {};
      session.auth.email = session.user.email;
      session.auth.fullUser = fullUser;
      return Promise.resolve(session);
    },
  },
});

export { handler as GET, handler as POST };
