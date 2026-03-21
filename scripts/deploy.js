import { execSync } from "node:child_process";
import fs from "node:fs";
import 'dotenv/config';

const message = process.argv[2];
if (!message) {
  console.error("Usage: npm run deploy \"MESSAGE\"");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const v = pkg.version;

execSync("npm install --package-lock-only");

const init = fs.readFileSync("__init__.py", "utf8").replace(/(\n@version: )([^\r\n]+)/, `$1${v}`);
fs.writeFileSync("__init__.py", init, "utf8");

const toml = fs.readFileSync("pyproject.toml", "utf8").replace(/(\nversion = )([^\r\n]+)/, `$1"${v}"`);
fs.writeFileSync("pyproject.toml", toml, "utf8");

const d = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

try {
  execSync([
    "git add .",
    `git commit -m "${message}"`,
    `git push origin main`,
  ].join(" && "));
} catch(err) {
  console.error(err);
  process.exit(1);
}

try {
  execSync([
    `comfy --skip-prompt --no-enable-telemetry env`,
    `comfy node publish --token ${process.env.API_TOKEN}`,
  ].join(" && "));
} catch(err) {
  console.error(err);
  process.exit(1);
}