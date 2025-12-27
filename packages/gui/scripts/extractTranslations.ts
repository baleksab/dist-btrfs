import { exec } from "node:child_process";

const cmd = `
  formatjs extract "src/**/*.ts*" \
    --ignore "**/*.d.ts" \
    --out-file locales/en.json \
    --format simple \
    --id-interpolation-pattern "[sha512:contenthash:base64:6]"
`;

exec(cmd);
