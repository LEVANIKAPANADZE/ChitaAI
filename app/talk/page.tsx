"use client";

import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState("");
  const [reply, setReply] = useState("");

  async function getAnswer() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: messages }],
      }),
    });

    const data = await res.json();
    setReply(data.choices?.[0]?.message?.content || "No reply");
  }

  return (
    <div>
      <textarea
        value={messages}
        onChange={(e) => setMessages(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={getAnswer}>Send</button>

      <pre>{reply}</pre>
    </div>
  );
}
