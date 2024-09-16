"use client";

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	FormControl,
	FormLabel,
	Heading,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

import { FormInput } from "@/components/form/FormControl";

export function NewProduct() {
	async function handleSubmit(formData: FormData) {
		return fetch("/api/products", {
			method: "POST",
			body: formData,
		});
	}

	return (
		<Card>
			<form
				action={(data) => {
					handleSubmit(data).catch(console.error);
				}}
			>
				<CardHeader>
					<Heading size="lg">Add new product</Heading>
				</CardHeader>
				<CardBody>
					<input type="hidden" name="id" value={nanoid(8)} />
					<Stack spacing={4}>
						<FormInput label="Name" name="name" type="text" isRequired />
						<FormInput
							defaultValue="https://placecats.com/400/400"
							label="Image URL"
							name="image"
							type="url"
							placeholder="https://placecats.com/400/400"
						/>
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Textarea name="description" />
						</FormControl>
						<FormInput label="Price" name="price" type="number" isRequired />
					</Stack>
				</CardBody>
				<CardFooter>
					<Button type="submit" variant="solid">
						Add
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
