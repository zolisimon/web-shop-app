"use server";

import "server-only";

import { nanoid } from "nanoid";

import { ICart, IOrder, IProduct } from "@/@types/models";
import client from "@/lib/mongodb";

const { MONGODB_DB } = process.env;

export async function getOrders() {
	const db = client.db(MONGODB_DB);
	const orders = db
		.collection<IOrder>("orders")
		.find()
		.map(({ _id, ...o }) => o)
		.toArray();
	return orders;
}

export async function createOrder(products: ICart, user: string) {
	const db = client.db(MONGODB_DB);

	const orderId = nanoid(10);

	const orderFound = await db
		.collection<IOrder>("orders")
		.findOne({ id: orderId });
	if (orderFound) {
		throw new Error("Order already exists");
	}

	const productsFound: (IProduct & { quantity: number })[] = [];

	console.log(products);
	// eslint-disable-next-line no-restricted-syntax
	for (const [productId, quantity] of Object.entries(products)) {
		console.log(productId, quantity);
		// eslint-disable-next-line no-await-in-loop
		const productFound = await db
			.collection<IProduct>("products")
			.findOne({ id: productId });
		if (!productFound) {
			throw new Error(`${productId} not found`);
		}
		productsFound.push({ ...productFound, quantity });
	}

	const order: IOrder = {
		id: orderId,
		products,
		createdAt: new Date(),
		amount: productsFound.reduce(
			(acc, { price, quantity }) => acc + price * quantity,
			0,
		),
		user,
	};

	const { acknowledged } = await db
		.collection<IOrder>("orders")
		.insertOne(order);
	return acknowledged;
}
