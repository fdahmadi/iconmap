import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract MUI icon names from index.d.ts file (much faster than importing)
const muiPackagePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@mui",
  "icons-material",
  "index.d.ts"
);

const muiIconNames = new Set();
if (fs.existsSync(muiPackagePath)) {
  const content = fs.readFileSync(muiPackagePath, "utf-8");
  // Extract export names using regex: export const IconName:
  const matches = content.matchAll(/export const (\w+):/g);
  for (const match of matches) {
    muiIconNames.add(match[1]);
  }
}
const muiIconNamesArray = Array.from(muiIconNames).sort();

// Extract FluentUI icon names by reading chunk files
const fluentuiPackagePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@fluentui",
  "react-icons",
  "lib"
);

const fluentIconNames = new Set();

// Read icons chunk files
for (let i = 0; i < 30; i++) {
  const chunkPath = path.join(fluentuiPackagePath, "icons", `chunk-${i}.d.ts`);
  if (fs.existsSync(chunkPath)) {
    const content = fs.readFileSync(chunkPath, "utf-8");
    // Extract export names using regex: export declare const IconName:
    const matches = content.matchAll(/export declare const (\w+):/g);
    for (const match of matches) {
      fluentIconNames.add(match[1]);
    }
  }
}

// Read sizedIcons chunk files
for (let i = 0; i < 30; i++) {
  const chunkPath = path.join(
    fluentuiPackagePath,
    "sizedIcons",
    `chunk-${i}.d.ts`
  );
  if (fs.existsSync(chunkPath)) {
    const content = fs.readFileSync(chunkPath, "utf-8");
    // Extract export names using regex: export declare const IconName:
    const matches = content.matchAll(/export declare const (\w+):/g);
    for (const match of matches) {
      fluentIconNames.add(match[1]);
    }
  }
}

// Convert Set to sorted array
const fluentIconNamesArray = Array.from(fluentIconNames).sort();

console.log(`Found ${muiIconNamesArray.length} MUI icons`);
console.log(`Found ${fluentIconNamesArray.length} FluentUI icons`);

// Write MUI icon names to file
const muiOutputPath = path.join(__dirname, "..", "mui-icons-names.txt");
const muiContent = muiIconNamesArray.join("\n");
fs.writeFileSync(muiOutputPath, muiContent, "utf-8");
console.log(`✅ MUI icons written to: ${muiOutputPath}`);

// Write FluentUI icon names to file
const fluentOutputPath = path.join(__dirname, "..", "fluentui-icons-names.txt");
const fluentContent = fluentIconNamesArray.join("\n");
fs.writeFileSync(fluentOutputPath, fluentContent, "utf-8");
console.log(`✅ FluentUI icons written to: ${fluentOutputPath}`);

console.log("\n✨ Done! Icon names have been extracted to text files.");

