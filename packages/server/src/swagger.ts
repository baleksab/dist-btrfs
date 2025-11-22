import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Btrfs Backup System API",
      version: "1.0.0",
      description: "API documentation for container and snapshot management",
    },
  },
  apis: ["./src/routes/*.ts"],
});
