import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const message = body.message;

    const completion = await openai.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content:
            "You are a professional AI business assistant helping with SaaS, CRM, invoices, analytics, startups, productivity, automation, and business growth.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "No response generated.";

    return Response.json({
      reply,
    });
  } catch (error) {
    console.error("OPENROUTER ERROR:", error);

    return Response.json(
      {
        error: "AI request failed",
      },
      {
        status: 500,
      }
    );
  }
}