import { exec } from "node:child_process";

const cmd = `
  formatjs extract "src/**/translations.ts" \
    --ignore "**/*.d.ts" \
    --out-file locales/en.json \
    --format simple
`;

exec(cmd);
