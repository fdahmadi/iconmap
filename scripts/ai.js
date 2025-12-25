import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.CLAUDE_API_KEY;
const model = process.env.CLAUDE_MODEL || "claude-sonnet-4-5";

const client = new Anthropic({
  apiKey,
  baseURL: "https://api.z.ai/api/anthropic",
});

export async function generateMapping(muiIconName) {
  try {
    const response = await client.messages.create({
      model,
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `
          
          #You are a helpful assistant that generates a mapping of MUI icons to Fluent UI icons.
          #You will be given a MUI icon name and you will need to generate a mapping of that icon to a Fluent UI icon.
          #You will need to return the Fluent UI icon name in a string format without backticks.
          #You should use the exact name of the Fluent UI icon for example AlertUrgent24Regular not alert_urgent_24_regular.
          #If you cannot find a mapping, return null.
          #use this link for finding fluent ui icon name: https://storybooks.fluentui.dev/react/?path=/docs/icons-catalog--docs
          #use size 24 and regular .
          #The mapping should be a 70% accurate mapping of the MUI icon name to the Fluent UI icon name.
          #Don't send any extra description just your final answer shuld be a string of fluent ui icon name or null.
          MUI icon name: ${muiIconName}`,
        },
      ],
    });
    return response.content[0].text;
  } catch (err) {
    console.error("Error:", err);
  }
}

let res = await generateMapping("AcUnitOutlined");
console.log(res);
