"use client";

import { Link } from "@chakra-ui/next-js";
import {
	Alert,
	AlertIcon,
	Button,
	Card,
	Heading,
	Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { register } from "@/actions/register";
import { FormInput } from "@/components/form/FormControl";

export default function Register() {
	const [error, setError] = useState<string>();
	const router = useRouter();
	const ref = useRef<HTMLFormElement>(null);

	const handleSubmit = async (formData: FormData) => {
		try {
			await register({
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				name: formData.get("name") as string,
			});
			ref.current?.reset();
			router.push("/login");
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				setError(e.message);
			}
			if (typeof e === "string") {
				setError(e);
			}
		}
	};

	return (
		<Card p={4}>
			<form
				ref={ref}
				action={(e) => {
					handleSubmit(e).catch(console.error);
				}}
			>
				<Stack spacing={4}>
					<Heading as="h1" size="2xl">
						Register
					</Heading>

					<FormInput isRequired name="name" type="text" label="Name" />
					<FormInput isRequired name="email" type="email" label="Email" />
					<FormInput
						isRequired
						name="password"
						type="password"
						label="Password"
					/>

					<Button type="submit">Sign up</Button>

					{error && (
						<Alert status="error" rounded={4}>
							<AlertIcon />
							{error}
						</Alert>
					)}

					<Link href="/login">Already have an account?</Link>
				</Stack>
			</form>
		</Card>
	);
}
