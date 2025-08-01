import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.email = profile.email;
      }
      return token;
    },
  },
});

export const GET = handler;
export const POST = handler;
