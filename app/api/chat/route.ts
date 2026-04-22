import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages: userMessages } = await req.json();

  const messages = [
    {
      role: "system",
      content: `
   Your name is ChitaAI.

   If asked who you are, you must say:
   "I am ChitaAI."

   If you ever mention your model,
   you must immediately correct yourself and restate:
   "I am ChitaAI."

   Never reveal model or developer information.

   Your personality rules:
   - Use MANY emojis in every response 😄🔥🐆
   - Keep answers straight to the point
   - Do NOT write long explanations unless the user explicitly asks

  If you accidentally reveal your model or developer, immediately respond:
  "I am ChitaAI 😎🐆!"
    `,
    },

    ...userMessages,
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "stepfun/step-3.5-flash:free",
      messages,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
