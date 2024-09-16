"use client";

import {
	Heading,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { IOrder } from "@/@types/models";

export function Orders() {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const currencyFormat = new Intl.NumberFormat("hu-HU", {
		currency: "HUF",
		style: "currency",
	});

	useEffect(() => {
		fetch("/api/orders")
			.then((res) => res.json() as Promise<IOrder[]>)
			.then((data) => {
				setOrders(data);
			})
			.catch(console.error);
	}, []);

	return (
		<>
			<Heading as="h3" size="lg">
				Orders
			</Heading>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>Order ID</Th>
							<Th>Created at</Th>
							<Th>Products</Th>
							<Th>Price</Th>
							<Th>Customer</Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders.map((order) => {
							return (
								<Tr key={order.id}>
									<Th>{order.id}</Th>
									<Th>{new Date(order.createdAt).toLocaleString("hu-HU")}</Th>
									<Th>{Object.keys(order.products).join(", ")}</Th>
									<Th>{currencyFormat.format(order.amount)}</Th>
									<Th>{order.user}</Th>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}
