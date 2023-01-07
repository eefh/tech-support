import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(req.body.reply, req.body.prevReply),
        temperature: 0.9,
        max_tokens: 1024,
        presence_penalty: 2,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

const generatePrompt = (reply, previous) => {
    let prompt = `'${reply}' '${previous}' you are a clever tech support bot to help elderly people, respond with only the next msessage, without quotes: `;

    return prompt;
};
