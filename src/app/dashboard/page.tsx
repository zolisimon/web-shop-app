import { Heading, Stack } from "@chakra-ui/react";

import { Orders } from "@/components/dashboard/Orders";
import { NewProduct } from "@/components/form/ProductForm";

export default function Dash() {
	return (
		<>
			<Heading>Dashboard</Heading>
			<Stack
				direction={["column", "column", "column", "row"]}
				justify="center"
				gap={8}
			>
				<NewProduct />
				<Orders />
			</Stack>
		</>
	);
}
