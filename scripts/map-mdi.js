import fs from "fs";
import path from "path";

let fileName = "./icon-mappings-output-mdi.txt";
let fileContent = fs.readFileSync(fileName, "utf-8");
let IconsMapping = {};
fileContent.split("\n").map((line) => {
  const [muiIconName, fluentIconName] = line.split(",");
  if (fluentIconName) {
    IconsMapping[muiIconName] = fluentIconName.replace(/\r/g, "");
  }
});
// Generate the icons-mapping.jsx content
const generateMapping = () => {
  let content = `import {\n`;
  let fluentNamesImported = [];
  for (const MuiIconName in IconsMapping) {
    const fluentName = IconsMapping[MuiIconName];
    if (fluentName == "null") {
      continue;
    }
    if (fluentNamesImported.includes(fluentName)) {
      continue;
    }
    fluentNamesImported.push(fluentName);
    content += `   ${fluentName},\n`;
  }
  content += `} from "@fluentui/react-icons";\n`;
  for (const MuiIconName in IconsMapping) {
    const fluentName = IconsMapping[MuiIconName];
    if (fluentName == "null") {
      content += `export { ${MuiIconName} } from '@mui/icons-material-original';\n`;
      continue;
    }
    content += `export const ${MuiIconName} = ${fluentName};\n`;
  }
  return content;
};

// Write to icons-mapping.jsx
const mappingContent = generateMapping();
const outputPath = path.join("scripts", "icons-mapping.jsx");

fs.writeFileSync(outputPath, mappingContent, "utf-8");

console.log(
  `✅ Successfully generated icons-mapping.jsx with ${
    Object.keys(IconsMapping).length
  } icon mappings`
);
console.log(`📁 Output file: ${outputPath}`);
