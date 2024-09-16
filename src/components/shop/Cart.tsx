"use client";

import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
	Button,
	Card,
	CardBody,
	Heading,
	HStack,
	Image,
	Skeleton,
	SkeletonText,
	Stack,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

import { IProduct } from "@/@types/models";
import { CartContext } from "@/components/providers/CartProvider";

interface CartItemProps {
	product: IProduct | undefined;
	quantity: number;
}

function CartItem({ product, quantity }: CartItemProps) {
	const { addToCart, removeFromCart } = useContext(CartContext);

	const currencyFormat = new Intl.NumberFormat("hu-HU", {
		currency: "HUF",
		style: "currency",
	});

	return (
		<Card w="100%">
			<CardBody>
				<Stack direction={["column", "row"]} gap={[4, 8]} align="center">
					{product ? (
						<>
							<Image
								src={product.image}
								alt={product.name}
								h={24}
								w={24}
								rounded={8}
							/>
							<Heading
								as="h3"
								size="lg"
								display="inline-block"
								verticalAlign="middle"
							>
								{product.name}
							</Heading>
							<Text>{currencyFormat.format(product.price)}</Text>
							<HStack align="center" justify="center" gap={4}>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => removeFromCart(product.id, 1)}
								>
									<MinusIcon />
								</Button>
								<Heading as="p" size="md">
									{quantity}
								</Heading>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => addToCart(product.id)}
								>
									<AddIcon />
								</Button>
								<Button
									type="button"
									size="sm"
									colorScheme="red"
									onClick={() => removeFromCart(product.id, quantity)}
								>
									<DeleteIcon />
								</Button>
							</HStack>
							<Heading as="p" size="md">
								{currencyFormat.format(product.price * quantity)}
							</Heading>
						</>
					) : (
						<>
							<Skeleton h={24} w={24} />
							<SkeletonText noOfLines={2} spacing={4} w="100%" />
						</>
					)}
				</Stack>
			</CardBody>
		</Card>
	);
}

export function Cart() {
	const { cart, clearCart } = useContext(CartContext);

	const session = useSession();

	const [total, setTotal] = useState<number>(0);
	const [products, setProducts] = useState<(IProduct & { quantity: number })[]>(
		[],
	);

	const router = useRouter();

	const toast = useToast();

	function placeOrder() {
		if (session.status !== "authenticated") {
			toast({
				title: "You need to be logged in to place an order",
				status: "error",
			});
			router.push("/login");
			return;
		}
		fetch("/api/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				products: cart,
			}),
		})
			.then(async (res) => {
				if (res.ok) {
					return Promise.resolve(res);
				}
				const body = (await res.json()) as Error;
				console.error(body);
				toast({
					title: "Unexpected error",
					description: body.message,
					status: "error",
				});
				return Promise.reject(body);
			})
			.then((res) => {
				if (res.ok) {
					clearCart();
					toast({
						title: "Order placed successfully",
						status: "success",
					});
					router.push(`/`);
				}
			})
			.catch(() => {});
	}

	useEffect(() => {
		setProducts([]);
		setTotal(0);
		// eslint-disable-next-line no-restricted-syntax, guard-for-in
		for (const productId in cart) {
			fetch(`/api/products/${productId}`)
				.then((res) => res.json())
				.then((product: IProduct) => {
					setProducts((prev) => [
						...prev,
						{ ...product, quantity: cart[productId] },
					]);
					setTotal((prev) => prev + product.price * cart[productId]);
				})
				.catch(() => {});
		}
	}, [cart]);

	return (
		<>
			<Heading as="h1">Cart</Heading>
			<Stack direction={["column", "column", "column", "row"]} gap={8}>
				<VStack w="100%">
					{Object.entries(cart).map(([productId, quantity]) => {
						return (
							<CartItem
								key={productId}
								product={products.find((p) => p.id === productId)}
								quantity={quantity}
							/>
						);
					})}
				</VStack>
				<Card maxW={["100%", "32rem"]} w="100%">
					<CardBody>
						<VStack align="start">
							<Heading as="h2" size="lg">
								Summary
							</Heading>

							<Heading as="p" size="md">
								Total:{" "}
								{new Intl.NumberFormat("hu-HU", {
									currency: "HUF",
									style: "currency",
								}).format(total)}
							</Heading>

							<HStack>
								<Button
									type="button"
									colorScheme="red"
									variant="ghost"
									onClick={() => {
										clearCart();
										toast({
											title: "Cart cleared",
											status: "success",
										});
									}}
								>
									Clear cart
								</Button>
								<Button
									type="button"
									onClick={() => {
										if (products.length === 0 || session.status === "loading") {
											return;
										}
										placeOrder();
									}}
									disabled={
										products.length === 0 || session.status === "loading"
									}
								>
									Place order
								</Button>
							</HStack>
						</VStack>
					</CardBody>
				</Card>
			</Stack>
		</>
	);
}
