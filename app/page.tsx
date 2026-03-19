"use client";

import { useState } from "react";

export default function Home() {
  type chatTypes = {
    role: "user" | "assistant";
    content: string;
  };

  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState<chatTypes[]>([]);

  async function getAnswer() {
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
  }

  return (
    <div>
      <header className="flex items-center py-4 justify-center border-indigo-500 border-4">
        <h1 className="font-extrabold">ChitaAI</h1>
      </header>

      <main className="mt-12.5">
        {chat.map((element, i) => (
          <div key={i}>
            <b>{element.role === "assistant" ? "ChitaAI" : "You"}:</b>{" "}
            {element.content}
          </div>
        ))}
      </main>

      <footer>
        <textarea
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={getAnswer}>Send</button>
      </footer>
    </div>
  );
}
