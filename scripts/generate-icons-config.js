import * as MuiIcons from "@mui/icons-material";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateMapping } from "./ai.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color palette for icons
const colors = [
  "#1976d2",
  "#d32f2f",
  "#388e3c",
  "#f57c00",
  "#7b1fa2",
  "#0288d1",
  "#c2185b",
  "#00796b",
  "#fbc02d",
  "#616161",
  "#5d4037",
  "#455a64",
  "#e64a19",
  "#512da8",
  "#303f9f",
  "#00796b",
  "#388e3c",
  "#f57c00",
  "#d32f2f",
  "#1976d2",
  "#7b1fa2",
  "#0288d1",
  "#c2185b",
  "#00796b",
  "#fbc02d",
];

// Function to get a color for an icon based on its index
const getColor = (index) => colors[index % colors.length];

// Filter out non-icon exports (like default exports, types, etc.)
const iconNames = Object.keys(MuiIcons)
  .filter((name) => {
    // Exclude default exports and ensure it's a valid component name
    // All MUI icon components start with uppercase letter
    return (
      name !== "default" &&
      name !== "__esModule" &&
      name[0] === name[0].toUpperCase() && // Component names start with uppercase
      name[0] >= "A" &&
      name[0] <= "Z" // Ensure it's a letter
    );
  })
  .sort()
  .slice(0, 20);

console.log(`Found ${iconNames.length} MUI icons`);

// Generate the iconsConfig.js content
const generateConfig = async () => {
  let content = `// Common icons configuration
// Takes Icons namespace as parameter and returns icons array
// Auto-generated with ${iconNames.length} icons
export const IconsMapping = {\n`;

  for (const index in iconNames) {
    const name = iconNames[index];
    const comma = index < iconNames.length - 1 ? "," : "";
    console.log(name);
    let fluentName = await generateMapping(name);
    console.log(fluentName);
    if (fluentName.includes(" ")) {
      fluentName = "null";
    } else {
      content += `   ${name}: "${fluentName}" ${comma}\n`;
    }
  }

  content += `}\n\n`;

  return content;
};

// Write to iconsConfig.js
const configContent = await generateConfig();
const outputPath = path.join(__dirname, "mui-to-fluent-icons-mapping.js");

fs.writeFileSync(outputPath, configContent, "utf-8");

console.log(
  `✅ Successfully generated iconsConfig.js with ${iconNames.length} icons`
);
console.log(`📁 Output file: ${outputPath}`);
