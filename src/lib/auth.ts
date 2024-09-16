import bcrypt from "bcryptjs";
import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";

import type { IUser } from "@/@types/models";
import client from "@/lib/mongodb";

const { MONGODB_DB } = process.env;

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		credentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			// @ts-expect-error: id should be good
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials");
				}
				const db = client.db(MONGODB_DB);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const user = await db
					.collection<IUser>("users")
					.findOne({ email: credentials?.email });
				if (!user) {
					throw new Error("Wrong Email");
				}
				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.password,
				);
				if (!passwordMatch) {
					throw new Error("Wrong Password");
				}
				return user;
			},
		}),
	],
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/require-await
		async jwt({ token, user, trigger }) {
			if (trigger === "signIn" && token && user) {
				// eslint-disable-next-line no-param-reassign
				token.role = user.role;
			}
			return token;
		},
		// eslint-disable-next-line @typescript-eslint/require-await
		async session({ session, token }) {
			if (session?.user && token && typeof token.role === "string") {
				// eslint-disable-next-line no-param-reassign
				session.user.role = token.role;
			}
			return session;
		},
	},
};

export function authServerSession(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions);
}
