import { execSync } from "node:child_process";
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const v = pkg.version;

execSync("npm install --package-lock-only");

const init = fs.readFileSync("__init__.py", "utf8").replace(/(\n@version: )([^\n])+/, `$1${v}`);
fs.writeFileSync("__init__.py", init, "utf8");


const toml = fs.readFileSync("pyproject.toml", "utf8").replace(/(\nversion = )([^\n])+/, `$1"${v}"`);
fs.writeFileSync("pyproject.toml", toml, "utf8");

const d = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// 04/25/2025
const date = d.format(Date.now());

const commands = [
  "git add .",
  `git commit -m "Updated on ${date}"`,
  `git push origin main`,
];

try {
  execSync(commands.join(" && "));
} catch(err) {
  console.error(err);
  process.exit(1);
}