"use server";

import "server-only";

import { IProduct } from "@/@types/models";
import client from "@/lib/mongodb";

const { MONGODB_DB } = process.env;

export async function getProducts() {
	const db = client.db(MONGODB_DB);
	const products = db
		.collection<IProduct>("products")
		.find()
		.map(({ _id, ...o }) => o)
		.toArray();
	return products;
}

export async function getProduct(id: string) {
	const db = client.db(MONGODB_DB);
	const product = await db.collection<IProduct>("products").findOne({ id });
	return product;
}

export async function addProduct(product: IProduct) {
	const db = client.db(MONGODB_DB);

	const productFound = await db
		.collection<IProduct>("products")
		.findOne({ id: product.id });
	if (productFound) {
		throw new Error("Product already exists");
	}

	const { acknowledged } = await db
		.collection<IProduct>("products")
		.insertOne(product);
	return acknowledged;
}
