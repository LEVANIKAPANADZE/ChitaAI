"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function getAnswer() {}

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={getAnswer}>Send</button>

      <pre>{reply}</pre>
    </div>
  );
}
