import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import removeMarkdown from "remove-markdown";

const token = import.meta.env.VITE_DEEPSEEK_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-V3-0324";

export function toPlainText(markdown) {
  return removeMarkdown(markdown);
}


export async function callDeepSeek(messages) {
  
try{
  if (!token) {
  throw new Error("VITE_DEEPSEEK_GITHUB_TOKEN is not set in environment variables.");
}
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: messages,
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: model
    }
  });
  return response.body.choices[0].message.content;
  if (isUnexpected(response)) {
    throw response.body.error;
  }
}catch(err){
  console.log(err);
  throw err;
}
}