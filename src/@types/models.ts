export interface IUser {
	email: string;
	password: string;
	name: string;
	role: "admin" | "user";
}

export interface IProduct {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
}

export type ICart = Record<string, number>;

export interface IOrder {
	id: string;
	products: ICart;
	createdAt: Date;
	amount: number;
	user: string;
}
