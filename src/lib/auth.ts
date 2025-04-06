import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { useGetUser } from "./hooks"; 
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await useGetUser(email);
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password as string);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // ✅ true JWT strategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
