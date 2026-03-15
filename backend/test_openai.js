const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    console.log("Testing OpenAI API with key:", process.env.OPENAI_API_KEY ? "Present (Starts with " + process.env.OPENAI_API_KEY.substring(0, 7) + ")" : "MISSING");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 10,
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI Error Details:");
    console.error("Status:", error.status);
    console.error("Code:", error.code);
    console.error("Type:", error.type);
    console.error("Message:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
    }
  }
}

test();
