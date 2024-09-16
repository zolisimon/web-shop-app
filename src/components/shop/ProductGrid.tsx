import { Grid } from "@chakra-ui/react";

import { IProduct } from "@/@types/models";
import { Product } from "@/components/shop/Product";

export interface ProductGridProps {
	products: IProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
	return (
		<Grid
			templateColumns="repeat(auto-fit, minmax(14rem, 1fr))"
			alignItems="start"
			justifyItems="center"
			gap={4}
		>
			{products.map((product) => (
				<Product
					// eslint-disable-next-line react/no-array-index-key
					key={`${product.id}`}
					productId={product.id}
					description={product.description}
					image={product.image}
					name={product.name}
					price={product.price}
				/>
			))}
		</Grid>
	);
}
