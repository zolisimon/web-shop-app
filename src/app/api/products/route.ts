import { nanoid } from "nanoid";

import { addProduct, getProducts } from "@/actions/products";

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Returns all products
 *       500:
 *         description: Unexpected error
 */
export async function GET() {
	try {
		const products = await getProducts();
		return new Response(JSON.stringify(products), { status: 200 });
	} catch (e) {
		return new Response(
			JSON.stringify({ message: "Unexpected error", error: e }),
			{ status: 500 },
		);
	}
}

/**
 * @swagger
 * /api/products:
 *   post:
 *     description: Add a new product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: formData
 *         name: id
 *         type: string
 *         description: Product id
 *         required: true
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Product name
 *         required: true
 *       - in: formData
 *         name: image
 *         type: string
 *         description: Product image URL
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Product description
 *         required: true
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Product price
 *         required: true
 *     responses:
 *       200:
 *         description: Product added
 *       422:
 *         description: Product not added
 *       500:
 *         description: Unexpected
 */
export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const id = formData.get("id") as string;
		const product = {
			id: id.length === 0 ? nanoid(8) : id,
			name: formData.get("name") as string,
			image: formData.get("image") as string,
			description: formData.get("description") as string,
			price: Number(formData.get("price")),
		};
		console.log(product);
		const ret = await addProduct(product);
		console.log(ret);
		if (ret) {
			return new Response(JSON.stringify({ message: "Product added" }), {
				status: 200,
			});
		}
		return new Response(JSON.stringify({ message: "Product not added" }), {
			status: 422,
		});
	} catch (e) {
		return new Response(
			JSON.stringify({ message: "Product not added", error: e }),
			{ status: 500 },
		);
	}
}
