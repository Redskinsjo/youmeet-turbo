import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);
const filepath = join(_dirname, "schema.graphql");

export const schema = readFileSync(filepath).toString("utf-8");
