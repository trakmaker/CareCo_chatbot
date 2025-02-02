import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey.trim()) {
    console.error("❌ Missing OpenAI API Key");
    return res.status(500).json({ error: "OpenAI API Key is missing in environment variables." });
  }

  try {
    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a healthcare assistant." }, { role: "user", content: req.body.message }],
      max_tokens: 100,
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI API." });
  }
}
