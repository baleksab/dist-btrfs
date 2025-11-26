import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./utils";

const generateOpenAPIDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Btrfs Backup System API",
      version: "1.0.0",
      description: "API documentation",
    },
  });
};

export const swaggerSpec = generateOpenAPIDocument();
