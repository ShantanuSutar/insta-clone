import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma as client } from "@/db/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const { email, password } = credentials;
          const userExists = await client.user.findUnique({
            where: {
              email: email,
              password: password,
            },
          });

          if (!userExists) {
            return null;
          }
          return userExists;
        } catch (error) {
          throw new Error("User does not exist");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
