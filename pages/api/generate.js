import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(req.body.reply, req.body.messages, req.body.language),
        temperature: 0.7,
        max_tokens: 1024,
        presence_penalty: 2,
    });
    console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
}

const generatePrompt = (reply, messages, language) => {
    let prompt = `"${reply}"`;
    let chosenLanguage = language === "en" ? "English" : "Spanish";
    messages.forEach((element) => {
        prompt = `"${element.message}" ${prompt}`;
    });
    console.log(prompt);
    return `{you are Apo, a helpful tech support bot to provide help elderly people with tech, links/articles are strictly prohibited, if you're giving a step by step, make sure the steps are numbered and indented. Make sure the message has spacing for more readability.} "${prompt}" {respond with a useful message in the following conversation in ${language}}: `;
};
