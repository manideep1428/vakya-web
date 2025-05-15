import Instagram from "next-auth/providers/instagram";
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers: [
      Instagram({
        clientId: process.env.INSTAGRAM_CLIENT_ID!,
        clientSecret : process.env.INSTAGRAM_CLIENT_SECRET!
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    }
}

import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
