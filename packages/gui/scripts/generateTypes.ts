import { exec } from "node:child_process";

const cmd = `
  pnpm openapi-generator-cli generate \
    -i http://localhost:3001/specifications \
    -g typescript-axios \
    -o src/generated-types \
    --global-property=apiDocs=false,modelDocs=false \
    --additional-properties=withoutRuntimeChecks=true \
    --global-property=gitPushCommand=false \
    --skip-validate-spec
`;

exec(cmd);
