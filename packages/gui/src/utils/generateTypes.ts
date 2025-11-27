import { exec } from "node:child_process";
import { config } from "../config";

const cmd = `
  pnpm openapi-generator-cli generate \
    -i ${config.serverUrl}/openapi \
    -g typescript-axios \
    -o src/generated-types \
    --global-property=apiDocs=false,modelDocs=false \
    --additional-properties=withoutRuntimeChecks=true \
    --global-property=gitPushCommand=false \
`;

exec(cmd);