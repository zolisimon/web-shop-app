"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Badge, Button, Flex, Link, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "@/components/providers/CartProvider";

export function Navbar() {
	const { status, data } = useSession();
	const router = useRouter();
	const { getCartSize } = useContext(CartContext);
	const { colorMode, toggleColorMode } = useColorMode();
	const [cartSize, setCartSize] = useState(0);

	// eslint-disable-next-line react-etc/prefer-usememo
	useEffect(() => {
		setCartSize(getCartSize());
	}, [getCartSize]);

	return (
		<Flex
			as="nav"
			position="sticky"
			top={0}
			justifyContent="space-between"
			gap={4}
			p={4}
			zIndex={10}
			bg={colorMode === "dark" ? "blackAlpha.500" : "whiteAlpha.700"}
			backdropFilter="auto"
			backdropBlur="8px"
		>
			<Button variant="link">
				<Link href="/">Home</Link>
			</Button>
			<Flex gap={4}>
				<Button variant="link" onClick={toggleColorMode}>
					{colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
				</Button>
				<Button variant="link">
					<Link href="/cart">
						Cart
						<Badge
							ml={1}
							display={cartSize > 0 ? "inline-block" : "none"}
							verticalAlign="center"
						>
							{cartSize}
						</Badge>
					</Link>
				</Button>
				{data?.user.role === "admin" && (
					<Button variant="link">
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				)}
				{status === "authenticated" && (
					<Button
						variant="link"
						onClick={() => {
							signOut({ redirect: false })
								.then(() => {
									router.push("/");
								})
								.catch(console.error);
						}}
					>
						Sign Out
					</Button>
				)}
				{status === "loading" && <Button isLoading variant="link" />}
				{status === "unauthenticated" && (
					<Button variant="link">
						<Link href="/login">Sign In</Link>
					</Button>
				)}
			</Flex>
		</Flex>
	);
}
