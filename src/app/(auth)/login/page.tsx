"use client";

import { Link } from "@chakra-ui/next-js";
import {
	Alert,
	AlertIcon,
	Button,
	Card,
	CardBody,
	Heading,
	Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

import { FormInput } from "@/components/form/FormControl";

export default function Login() {
	const [error, setError] = useState("");
	const router = useRouter();
	const ref = useRef<HTMLFormElement>(null);

	const handleSubmit = async (formData: FormData) => {
		const res = await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		});
		if (res?.error) {
			setError(res.error);
		}
		if (res?.ok) {
			ref.current?.reset();
			router.push("/");
		}
	};

	return (
		<Card>
			<form
				ref={ref}
				action={(e) => {
					handleSubmit(e).catch(console.error);
				}}
			>
				<CardBody>
					<Stack gap={4}>
						<Heading as="h1" size="2xl">
							Sign In
						</Heading>
						<FormInput
							isRequired
							name="email"
							type="email"
							label="Email"
							placeholder="name@email.com"
						/>
						<FormInput
							isRequired
							name="password"
							type="password"
							label="Password"
						/>
						<Button type="submit">Sign In</Button>

						{error && (
							<Alert status="error" rounded={4}>
								<AlertIcon />
								{error}
							</Alert>
						)}

						<Link href="/register">Don&apos;t have an account?</Link>
					</Stack>
				</CardBody>
			</form>
		</Card>
	);
}
