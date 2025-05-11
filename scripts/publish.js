import { execSync } from "node:child_process";
import 'dotenv/config';

const commands = [
  `comfy --skip-prompt --no-enable-telemetry env`,
  `comfy node publish --token ${process.env.API_TOKEN}`,
];

try {
  execSync(commands.join(" && "));
} catch(err) {
  console.error(err);
  process.exit(1);
}