import { createSwaggerSpec } from "next-swagger-doc";

// eslint-disable-next-line @typescript-eslint/require-await
export const getApiDocs = async () => {
	const spec = createSwaggerSpec({
		apiFolder: "src/app/api", // define api folder under app folder
		definition: {
			openapi: "3.0.0",
			info: {
				title: "App Swagger",
				version: "1.0",
			},
			components: {
				securitySchemes: {
					BearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [],
		},
	});
	return spec;
};
