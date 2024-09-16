import { getProducts } from "@/actions/products";
import { ProductGrid } from "@/components/shop/ProductGrid";

export default async function Home() {
	// const session = useSession();
	const products = await getProducts();
	return <ProductGrid products={products} />;
}
