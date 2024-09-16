"use server";

import "server-only";

import bcrypt from "bcryptjs";

import { IUser } from "@/@types/models";
import client from "@/lib/mongodb";

const { MONGODB_DB } = process.env;

export async function register(values: {
	email: string | null;
	password: string | null;
	name: string | null;
}) {
	const { email, password, name } = values;

	try {
		if (!email || !password || !name) {
			throw new Error("Missing credentials");
		}
		const db = client.db(MONGODB_DB);
		const userFound = await db.collection<IUser>("users").findOne({ email });
		if (userFound) {
			throw new Error("User already exists");
		}

		const role = name === "admin" ? "admin" : "user";

		const hashedPassword = await bcrypt.hash(password, 10);
		await db
			.collection<IUser>("users")
			.insertOne({ name, email, password: hashedPassword, role });
	} catch (e) {
		console.error(e);
	}
}
