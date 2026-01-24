"use client";

import { useState } from "react";

export default function Page() {
  type chatTypes = {
    role: "user" | "assistant";
    content: string;
  };

  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState<chatTypes[]>([]);
  const [loading, setLoading] = useState(false);

  async function getAnswer() {
    setLoading(true);

    const newChat = [...chat, { role: "user" as const, content: messages }];
    setChat(newChat);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newChat }),
    });

    const data = await res.json();
    const assistantContent = data.choices?.[0]?.message?.content || "No reply";

    const newChat2 = [
      ...newChat,
      { role: "assistant" as const, content: assistantContent },
    ];
    setChat(newChat2);

    setLoading(false);
  }

  return (
    <div>
      <h1>ChitaAI</h1>

      <div>
        {chat.map((element, i) => (
          <div key={i}>
            <b>{element.role === "assistant" ? "ChitaAI" : "You"}:</b>{" "}
            {element.content}
          </div>
        ))}

        {loading && <div>Typing...</div>}
      </div>

      <div>
        <textarea
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={getAnswer}>Send</button>
      </div>
    </div>
  );
}
