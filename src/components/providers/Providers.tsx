"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import {
	ChakraProvider,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import { CartProvider } from "@/components/providers/CartProvider";

export const customTheme = extendTheme(
	withDefaultColorScheme({ colorScheme: "orange" }),
);

interface Props {
	children?: React.ReactNode;
}

export function Providers({ children }: Props) {
	return (
		<SessionProvider>
			<CacheProvider>
				<ChakraProvider
					theme={customTheme}
					toastOptions={{
						defaultOptions: {
							position: "bottom-right",
							variant: "left-accent",
							isClosable: true,
							duration: 2000,
						},
					}}
				>
					<CartProvider>{children}</CartProvider>
				</ChakraProvider>
			</CacheProvider>
		</SessionProvider>
	);
}
