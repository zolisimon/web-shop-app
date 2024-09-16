"use client";

import {
	AspectRatio,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { CartContext } from "@/components/providers/CartProvider";

export interface ProductProps {
	productId: string;
	name: string;
	price: number;
	description: string;
	image: string;
}

export function Product({
	productId,
	name,
	price,
	description,
	image,
}: ProductProps) {
	const { addToCart } = useContext(CartContext);
	const toast = useToast();

	const router = useRouter();

	return (
		<Card
			maxW={["100%", "20rem"]}
			minW={["100%", "14rem"]}
			w="100%"
			overflow="hidden"
		>
			<AspectRatio ratio={1}>
				<Image src={image} alt={name} objectFit="cover" />
			</AspectRatio>
			<CardBody>
				<Heading>{name}</Heading>
				<Text>{description}</Text>
				<Text fontSize="xl" align="right">
					{new Intl.NumberFormat("hu-HU", {
						currency: "HUF",
						style: "currency",
					}).format(price)}
				</Text>
			</CardBody>
			<Divider />
			<CardFooter>
				<Stack direction={["column", "row"]} gap={4} justify="center" w="100%">
					<Button
						variant="ghost"
						type="button"
						onClick={() => {
							addToCart(productId);
							toast({
								title: `${name} Added to cart`,
								status: "success",
								duration: 2000,
								isClosable: true,
								position: "bottom-right",
								variant: "left-accent",
							});
						}}
					>
						Add to Cart
					</Button>
					<Button
						variant="solid"
						type="button"
						onClick={() => {
							addToCart(productId);
							router.push("/cart");
						}}
					>
						Buy Now
					</Button>
				</Stack>
			</CardFooter>
		</Card>
	);
}
