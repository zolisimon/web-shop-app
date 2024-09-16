import { Box, ColorModeScript } from "@chakra-ui/react";

import { Navbar } from "@/components/nav/Navbar";
import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="hu">
			<body>
				<ColorModeScript initialColorMode="dark" />
				<Providers>
					<Navbar />
					<Box as="main" p={4}>
						{children}
					</Box>
				</Providers>
			</body>
		</html>
	);
}
