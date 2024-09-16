import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputProps,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

export interface FormInputProps extends InputProps {
	label: string;
	isRequired?: boolean;
	name: string;
	type: HTMLInputTypeAttribute;
}

export function FormInput({
	label,
	isRequired,
	name,
	type,
	...props
}: FormInputProps) {
	return (
		<FormControl isRequired={isRequired}>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				<Input name={name} type={type} {...props} />
			</InputGroup>
		</FormControl>
	);
}
