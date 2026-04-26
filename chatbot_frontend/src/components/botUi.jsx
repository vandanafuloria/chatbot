import React, { useState } from "react";
import robotGif from "../assets/Robot.gif";

const options = ["Shopify Widgets", "Video Widgets", "Reviews Section", "Instagram Feed"];

export default function LeadBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Welcome to TheWordOfMouth features hub." },
    { type: "bot", text: "Ask me about Shopify widgets, reviews, or Instagram promotions." },
  ]);
  const [input, setInput] = useState("");

  const handleOptionClick = (option) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: option },
      {
        type: "bot",
        text: `Great choice! We provide ${option.toLowerCase()} integrations and design support.`,
      },
    ]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { type: "user", text: trimmed },
      { type: "bot", text: "Thanks! Our team will get back to you shortly." },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-violet-500 bg-white hover:scale-110 transition-transform duration-200"
        aria-label="Open chat"
      >
        <img src={robotGif} alt="Chat" className="w-full h-full object-cover" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-85 rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-200">
          {/* Header */}
          <div className="bg-violet-600 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={robotGif} alt="bot" className="w-8 h-8 rounded-full object-cover border border-white/30" />
              <div>
                <p className="font-semibold text-sm leading-tight">LeadBot</p>
                <p className="text-xs text-violet-200">TheWordOfMouth</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white text-lg leading-none"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 p-4 h-72 overflow-y-auto bg-slate-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                  msg.type === "bot"
                    ? "bg-slate-200 text-slate-900 self-start"
                    : "bg-violet-600 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Quick options */}
          <div className="flex flex-wrap gap-2 px-4 pt-3 bg-white">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className="rounded-full border border-violet-300 bg-white px-3 py-1 text-xs font-medium text-violet-700 hover:bg-violet-50 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-slate-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition-colors text-sm"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
