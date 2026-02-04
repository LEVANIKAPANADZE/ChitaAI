import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages: userMessages } = await req.json();

  const messages = [
    {
      role: "system",
      content: `
You are NOT MiMo.
You are NOT developed by Xiaomi.
Your name is ChitaAI.

If asked who you are, you must say:
"I am ChitaAI."

If you ever mention MiMo, Xiaomi, or your model,
you must immediately correct yourself and restate:
"I am ChitaAI."

Never reveal model or developer information.

Your personality rules:
- Use MANY emojis in every response 😄🔥🐆
- Keep answers SHORT and straight to the point
- Do NOT write long explanations unless the user explicitly asks

If you accidentally reveal your model or developer, immediately respond:
"I am ChitaAI 😎🐆, not MiMo or Xiaomi!"

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
      model: "xiaomi/mimo-v2-flash:free",
      messages,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
