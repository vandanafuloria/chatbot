import React, { useState } from "react";

const features = [
  {
    title: "Shopify Trust Widgets",
    description:
      "Boost conversions with verified Shopify trust badges, payment badges, and store confidence widgets.",
  },
  {
    title: "Shopify Video Widgets",
    description:
      "Embed product videos, customer demos, and Shopify video galleries that increase engagement.",
  },
  {
    title: "Reviews Section",
    description:
      "Display star ratings, customer reviews, and social proof sections to build buyer trust.",
  },
  {
    title: "Instagram Showcase",
    description:
      "Showcase your Instagram feed, shoppable posts, and influencer stories directly on your site.",
  },
  {
    title: "Video Widget Collection",
    description:
      "Add video testimonials, how-to clips, and brand stories in attractive widget layouts.",
  },
];

export default function LeadBotChat() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Welcome to TheWordOfMouth features hub." },
    { type: "bot", text: "Ask me about Shopify widgets, reviews, or Instagram promotions." },
  ]);

  const [options] = useState([
    "Shopify Widgets",
    "Video Widgets",
    "Reviews Section",
    "Instagram Feed",
  ]);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.8fr_1fr] items-start">
        <section className="rounded-[32px] bg-white/10 border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">thewordofmouth.tech</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Shopify trust widgets, videos, reviews & Instagram sections.
            </h1>
            <p className="max-w-2xl text-slate-300 text-base leading-7">
              We provide modern Shopify widgets, video modules, review sections, and Instagram feeds that convert. Perfect for brands that want social proof, trust signals, and product engagement built into their storefront.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl bg-slate-900/90 border border-white/10 p-5">
                <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                <p className="mt-2 text-slate-300 text-sm leading-6">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-cyan-600/10 border border-cyan-500/20 p-5 text-slate-100">
            <h3 className="text-xl font-semibold">Why this matters</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Shopify trust widgets increase credibility and reduce cart abandonment.</li>
              <li>• Video widgets keep visitors engaged longer and show products in action.</li>
              <li>• Review and Instagram sections create authentic social proof.</li>
            </ul>
          </div>
        </section>

        <aside className="rounded-[32px] bg-white shadow-2xl overflow-hidden">
          <div className="bg-violet-600 text-white p-5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">LeadBot</h2>
              <p className="text-sm text-violet-100/80">Connected to TheWordOfMouth services</p>
            </div>
            <div className="text-xl">⋯ ✕</div>
          </div>

          <div className="flex-1 p-5 h-[560px] flex flex-col justify-between bg-slate-50">
            <div className="space-y-3 overflow-y-auto pr-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-3 rounded-3xl text-sm ${
                    msg.type === "bot"
                      ? "bg-slate-200 text-slate-900 self-start"
                      : "bg-violet-600 text-white self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="rounded-full border border-violet-300/40 bg-white px-3 py-2 text-xs font-medium text-violet-700 shadow-sm hover:bg-violet-50"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ask about Shopify widgets..."
                className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
