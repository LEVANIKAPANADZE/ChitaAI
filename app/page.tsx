"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  type chatTypes = {
    role: "user" | "assistant";
    content: string;
  };

  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState<chatTypes[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  async function getAnswer() {
    if (!messages.trim()) return;
    const newChat = [...chat, { role: "user" as const, content: messages }];
    setChat(newChat);
    setMessages("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newChat }),
    });

    const data = await res.json();
    const assistantContent = data.choices?.[0]?.message?.content || "No reply";
    setChat((prev) => [
      ...prev,
      { role: "assistant" as const, content: assistantContent },
    ]);
  }

  return (
    <div className="flex flex-col h-screen bg-black text-cyan-500 font-mono items-center overflow-hidden">
      <header className="w-full max-w-3xl xl:max-w-5xl p-6 border-b border-cyan-900 flex justify-between items-center bg-black z-10">
        <h1 className="font-bold text-2xl xl:text-3xl tracking-tighter uppercase">
          Chita.AI
        </h1>
        <div className="text-[10px] xl:text-xs text-cyan-700 font-bold tracking-widest">
          MODE: TERMINAL
        </div>
      </header>

      <main
        ref={scrollRef}
        className="w-full max-w-3xl xl:max-w-5xl flex-1 overflow-y-auto border-x border-cyan-950 scroll-smooth"
      >
        {chat.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-cyan-900 animate-pulse uppercase italic text-sm xl:text-base">
              _ System idle. Awaiting command...
            </p>
          </div>
        )}

        {chat.map((m, i) => (
          <div
            key={i}
            className={`p-8 md:p-10 xl:p-12 border-b border-cyan-950 ${
              m.role === "assistant" ? "bg-[#050505]" : "bg-black"
            }`}
          >
            <div className="max-w-2xl xl:max-w-3xl mx-auto">
              <div
                className={`text-[10px] xl:text-xs font-bold mb-3 uppercase tracking-widest ${
                  m.role === "assistant" ? "text-white" : "text-cyan-600"
                }`}
              >
                {m.role === "assistant" ? ">> CHITA_CORE" : ">> USER_PROMPT"}
              </div>

              <p
                className={`text-base md:text-lg xl:text-xl leading-relaxed whitespace-pre-wrap ${
                  m.role === "assistant" ? "text-cyan-100" : "text-cyan-400"
                }`}
              >
                {m.content}
              </p>
            </div>
          </div>
        ))}
      </main>

      <footer className="w-full max-w-3xl xl:max-w-5xl p-6 border-t-2 border-cyan-500 bg-black z-10">
        <div className="flex flex-col gap-3">
          <textarea
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                getAnswer();
              }
            }}
            className="w-full bg-[#0a0a0a] border border-cyan-900 p-4 
            outline-none text-cyan-400 focus:border-cyan-400 resize-none 
            h-24 xl:h-32 xl:text-lg transition-colors"
            placeholder="INPUT COMMAND..."
          />
          <button
            onClick={getAnswer}
            className="w-full bg-cyan-500 text-black py-4 xl:py-5 
            font-black uppercase hover:bg-white transition-all 
            active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)] xl:text-xl"
          >
            Execute Send _
          </button>
        </div>
      </footer>
    </div>
  );
}
