import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

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
