import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    CustomerLoginResponse,
    ICustomerAuthInformation,
} from "@/models/customerAuth.interface";
import { Status } from "@/models/common.interface";
import { parseJWT } from "@/utils/jwt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        // maxAge: 30 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET || "123456",
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Tên tài khoản",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Mật khẩu", type: "password" },
            },
            async authorize(credentials, req) {
                const { username, password } = credentials || {};

                const response = await fetch(
                    `${process.env.API_ROOT}/localfront/Login`,
                    {
                        body: JSON.stringify({
                            requestObject: { username, password },
                        }),
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                const data = (await response.json()) as CustomerLoginResponse;

                // console.log(data);
                if (data.status === Status.OK) {
                    const dataParse = parseJWT<{
                        result: string;
                        nbf: number;
                        exp: number;
                        iat: number;
                    }>(data.result);

                    const userInfo = JSON.parse(
                        dataParse.result,
                    ) as ICustomerAuthInformation;

                    return {
                        id: userInfo.recId.toString(),
                        email: userInfo.email,
                        name: userInfo.username,
                        accessToken: data.result,
                    };
                }
                if (data.status === Status.XX) {
                    throw new Error(data.message);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     /* on successful sign in */
        //     console.log({ user, account, profile, email, credentials });
        //     return true;
        // },
        async jwt({ token, user, account }) {
            // console.log({ token, user, account, profile });
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/customer-login",
        // signOut: "/auth/signout",
        // error: "/auth/error", // Error code passed in query string as ?error=
        // verifyRequest: "/auth/verify-request", // (used for check email message)
        // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};
