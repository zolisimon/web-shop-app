"use client";

import { createContext } from "react";

import { ICart } from "@/@types/models";
import { useLocalStorage } from "@/lib/hooks";

export const CartContext = createContext<{
	cart: ICart;
	addToCart: (productId: string) => void;
	removeFromCart: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getCartSize: () => number;
}>({
	cart: {},
	addToCart: () => {},
	removeFromCart: () => {},
	clearCart: () => {},
	getCartSize: () => 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useLocalStorage<ICart>("cart", {});

	function addToCart(productId: string) {
		setCart({ ...cart, [productId]: (cart[productId] || 0) + 1 });
	}

	function removeFromCart(productId: string, quantity: number) {
		const newCart = { ...cart };
		if (!newCart[productId]) {
			return;
		}
		newCart[productId] -= quantity;
		if (newCart[productId] <= 0) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete newCart[productId];
		}
		setCart(newCart);
	}

	function clearCart() {
		setCart({});
	}

	function getCartSize() {
		return Object.values(cart).reduce((acc, qty) => acc + qty, 0);
	}

	return (
		<CartContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				getCartSize,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
