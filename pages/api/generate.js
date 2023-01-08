import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(req.body.reply, req.body.messages),
        temperature: 0.9,
        max_tokens: 1024,
        presence_penalty: 2,
    });
    console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
}

const generatePrompt = (reply, messages) => {
    let prompt = `"${reply}"`;
    messages.forEach((element) => {
        prompt = `"${element.message}" ${prompt}`;
    });
    console.log(prompt);
    return `{you are Apo, a clever tech support bot to provide help elderly people with questions about tech, links/articles are strictly prohibited} "${prompt}" {respond with only the next message in the following conversation}: `;
};
