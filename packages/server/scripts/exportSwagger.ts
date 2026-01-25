import fs from "node:fs";
import path from "node:path";
import "../src/server";
import { swaggerSpec } from "../src/swagger";

const exportSwagger = () => {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.error("Provide a path: pnpm gen:swagger <path>");
    process.exit(1);
  }

  try {
    const outputPath = path.resolve(process.cwd(), targetPath);
    const dir = path.dirname(outputPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), "utf-8");
    console.log(`✔ ${outputPath}`);
    process.exit(0);
  } catch {
    process.exit(1);
  }
};

exportSwagger();
