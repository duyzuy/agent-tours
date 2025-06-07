import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { CustomerLoginResponse, ICustomerAuthInformation } from "@/models/customerAuth.interface";
import { BaseResponse, Status } from "@/models/common.interface";
import { parseJWT } from "@/utils/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Tên tài khoản",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Mật khẩu",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials || {};

        const response = await fetch(`${process.env.API_ROOT}/localfront/Login`, {
          body: JSON.stringify({
            requestObject: { username, password },
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = (await response.json()) as BaseResponse<string>;

        if (data.status === Status.OK) {
          const dataParse = parseJWT<{
            result: string;
            nbf: number;
            exp: number;
            iat: number;
          }>(data.result);

          const userInfo = JSON.parse(dataParse.result) as ICustomerAuthInformation;
          console.log({ data });
          return {
            id: userInfo.recId.toString(),
            email: userInfo.email,
            name: userInfo.username,
            accessToken: data.result,
          };
        }
        if (data.status === Status.XX) {
          throw new Error(data.errorCode);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //     /* on successful sign in */
    //     console.log({ user, account, profile, email, credentials });
    //     return true;
    // },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  pages: {
    signIn: "/customer-login",
    // signOut: "/auth/signout",
    //error: "/login-fail", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
