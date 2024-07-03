<<<<<<< HEAD:src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
=======
import NextAuth from "next-auth/next";

>>>>>>> parent of ba05b49 (fix nextauth):src/app/api/auth/[...nextAuth]/route.ts
import { authOptions } from "@/auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
