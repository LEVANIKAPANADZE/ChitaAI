# 🤖 ChitaAI

ChitaAI is a modern AI chatbot built with Next.js, React, TypeScript, and Tailwind CSS. It features a terminal-inspired cyberpunk interface and communicates with AI models through the OpenRouter API.

## ✨ Features

- 💬 Real-time AI conversations
- 🤖 Custom ChitaAI personality
- 🎨 Terminal-style cyan-on-black UI
- ⚡ Fast responses through OpenRouter
- 📱 Responsive design
- ⌨️ Send messages with Enter
- 🔄 Automatic chat scrolling

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenRouter API

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/yourusername/chita-ai.git
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
OPENROUTER_KEY=your_api_key_here
```

⚙️ Model Selection (Optional)

ChitaAI uses OpenRouter models.

To change the model, open:

app/api/chat/route.ts

Then edit:

model: "stepfun/step-3.5-flash:free",

You can replace it with any supported OpenRouter model.

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🎯 About

ChitaAI was created as a personal AI assistant project focused on combining modern web technologies with a unique terminal-style user experience.
