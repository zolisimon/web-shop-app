import { ICart } from "@/@types/models";
import { createOrder, getOrders } from "@/actions/orders";
import { authServerSession } from "@/lib/auth";

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     description: Fetches all orders if the user is an admin.
 *     security:
 *       - BearerAuth: [BearerAuth]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Orders not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orders not found
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unexpected error
 *                 error:
 *                   type: string
 *
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with the provided products.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: [BearerAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 $ref: '#/components/schemas/ICart'
 *     responses:
 *       200:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       422:
 *         description: Order not created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not created
 *       500:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unexpected error
 *                 error:
 *                   type: string
 */
export async function GET() {
	try {
		const session = await authServerSession();
		if (!session || session.user.role !== "admin") {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {
				status: 401,
			});
		}
		const orders = await getOrders();
		if (!orders) {
			return new Response(JSON.stringify({ message: "Orders not found" }), {
				status: 404,
			});
		}
		return new Response(JSON.stringify(orders), { status: 200 });
	} catch (e) {
		console.error(e);
		return new Response(
			JSON.stringify({ message: "Unexpected error", error: e }),
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as { products: ICart };
		console.log(body);
		const session = await authServerSession();
		console.log(session);
		if (!session) {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {
				status: 401,
			});
		}
		const ret = await createOrder(body.products, session?.user.email);
		if (!ret) {
			return new Response(JSON.stringify({ message: "Order not created" }), {
				status: 422,
			});
		}
		return new Response(JSON.stringify({ message: "Order created" }), {
			status: 200,
		});
	} catch (e) {
		console.error(e);
		return new Response(
			JSON.stringify({ message: "Unexpected error", error: e }),
			{ status: 500 },
		);
	}
}
