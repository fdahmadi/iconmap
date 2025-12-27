import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.CLAUDE_API_KEY;
const model = process.env.CLAUDE_MODEL || "claude-sonnet-4-5";

const client = new Anthropic({
  apiKey,
  baseURL: "https://api.z.ai/api/anthropic",
});

// Read icon name lists
const muiIconsPath = path.join(__dirname, "..", "mui-icons-names.txt");
const fluentIconsPath = path.join(__dirname, "..", "fluentui-icons-names.txt");
const outputPath = path.join(__dirname, "..", "icon-mapping-output-mui.txt");

// Load icon lists into Sets for fast lookup
const muiIcons = new Set(
  fs
    .readFileSync(muiIconsPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
);

const fluentIcons = new Set(
  fs
    .readFileSync(fluentIconsPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
);

console.log(`Loaded ${muiIcons.size} MUI icons`);
console.log(`Loaded ${fluentIcons.size} FluentUI icons`);

// Load existing mappings to resume
const processedMuiIcons = new Set();
if (fs.existsSync(outputPath)) {
  const existingContent = fs.readFileSync(outputPath, "utf-8");
  const lines = existingContent.split("\n").filter((line) => line.trim().length > 0);
  for (const line of lines) {
    const [muiName] = line.split(",").map((s) => s.trim());
    // Add all processed icons (including those mapped to null)
    if (muiName && muiName !== "null") {
      processedMuiIcons.add(muiName);
    }
  }
  console.log(`Resuming from ${processedMuiIcons.size} already processed icons`);
} else {
  console.log("Starting fresh - no existing output file found");
}

// Open output file in append mode
const outputStream = fs.createWriteStream(outputPath, { flags: "a" });

async function generateMappingWithRetry(muiIconName, attempt = 1, previousAttempts = []) {
  try {
    let prompt = `
#You are a helpful assistant that generates a mapping of MUI icons to Fluent UI icons.
#You will be given a MUI icon name and you will need to generate a mapping of that icon to a Fluent UI icon.
#You will need to return the Fluent UI icon name in a string format without backticks.
#You should use the exact name of the Fluent UI icon for example AlertUrgent24Regular not alert_urgent_24_regular.
#If you cannot find a mapping, return null.
#use this link for finding fluent ui icon name: https://storybooks.fluentui.dev/react/?path=/docs/icons-catalog--docs
#use size 24 and regular .
#The mapping should be a 70% accurate mapping of the MUI icon name to the Fluent UI icon name.
#Don't send any extra description just your final answer shuld be a string of fluent ui icon name or null.
MUI icon name: ${muiIconName}`;

    // If this is a retry, add information about previous failed attempts
    if (attempt > 1) {
      prompt += `\n\nPrevious attempts returned names that are not in the FluentUI icons list: ${previousAttempts.join(", ")}. Please try again with a different FluentUI icon name that actually exists in the FluentUI icons catalog.`;
    }

    const response = await client.messages.create({
      model,
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const fluentIconName = response.content[0].text.trim();

    // Check if the returned name is in the FluentUI icons list
    if (fluentIconName && fluentIconName.toLowerCase() !== "null") {
      // Check if it exists in the FluentUI icons set
      if (fluentIcons.has(fluentIconName)) {
        return fluentIconName;
      } else {
        // Name doesn't exist, retry if we haven't exceeded max attempts
        if (attempt < 3) {
          console.log(
            `  ⚠️  Attempt ${attempt}: "${fluentIconName}" not found in FluentUI icons list. Retrying...`
          );
          return generateMappingWithRetry(muiIconName, attempt + 1, [
            ...previousAttempts,
            fluentIconName,
          ]);
        } else {
          console.log(
            `  ❌ Failed after 3 attempts. Last attempt: "${fluentIconName}"`
          );
          return null;
        }
      }
    }

    return null;
  } catch (err) {
    console.error(`Error on attempt ${attempt}:`, err);
    if (attempt < 3) {
      return generateMappingWithRetry(muiIconName, attempt + 1, previousAttempts);
    }
    return null;
  }
}

async function processAllIcons() {
  const muiIconsArray = Array.from(muiIcons).sort();
  const totalIcons = muiIconsArray.length;
  let processedCount = processedMuiIcons.size;
  let successCount = 0;
  let nullCount = 0;

  for (const muiIconName of muiIconsArray) {
    // Skip if already processed
    if (processedMuiIcons.has(muiIconName)) {
      continue;
    }

    console.log(`\n[${processedCount + 1}/${totalIcons}] Processing: ${muiIconName}`);

    const fluentIconName = await generateMappingWithRetry(muiIconName);

    // Write to output file
    if (fluentIconName) {
      outputStream.write(`${muiIconName},${fluentIconName}\n`);
      successCount++;
      console.log(`  ✅ Mapped to: ${fluentIconName}`);
    } else {
      outputStream.write(`${muiIconName},null\n`);
      nullCount++;
      console.log(`  ❌ No mapping found (null)`);
    }

    processedCount++;

    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  outputStream.end();

  console.log(`\n✨ Processing complete!`);
  console.log(`   Total icons: ${totalIcons}`);
  console.log(`   Successfully mapped: ${successCount}`);
  console.log(`   No mapping found: ${nullCount}`);
  console.log(`   Output file: ${outputPath}`);
}

// Start processing
processAllIcons().catch((err) => {
  console.error("Fatal error:", err);
  outputStream.end();
  process.exit(1);
});

