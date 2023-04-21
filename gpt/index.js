const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-gnxlSY5RtvPx3PRAv46p4lmp",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const promptResponse = async() => {
    const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test perreque malvado",
        max_tokens: 7,
        temperature: 0,
    })

    return result
;}
