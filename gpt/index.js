const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-gnxlSY5RtvPx3PRAv46p4lmp",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const promptResponse = async(prompt) => {
  try {
    const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 400,
        temperature: 0,
    })
    return result.data.choices[0].text
  } catch (error) {
    console.error(error)
  }
;}
