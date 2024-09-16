import { getProduct } from "@/actions/products";

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     description: Get a product by its id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         description: Product id
 *         required: true
 *     responses:
 *       200:
 *         description: Returns a product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Unexpected error
 */
export async function GET(
	request: Request,
	{ params }: { params: { productId: string } },
) {
	try {
		const { productId } = params;
		const product = await getProduct(productId);
		if (!product) {
			return new Response(JSON.stringify({ message: "Product not found" }), {
				status: 404,
			});
		}
		return new Response(JSON.stringify(product), { status: 200 });
	} catch (e) {
		return new Response(
			JSON.stringify({ message: "Unexpected error", error: e }),
			{ status: 500 },
		);
	}
}
