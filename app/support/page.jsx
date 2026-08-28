"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Wallet,
  ArrowRightLeft,
  FileText,
  Clock3,
  Send,
} from "lucide-react";

const faqs = [
  {
    category: "Account",
    question: "How can I update my account information?",
    answer:
      "Go to Settings from your dashboard and update your available profile information. Some sensitive information may require verification.",
  },
  {
    category: "Payments",
    question: "How can I check my transaction history?",
    answer:
      "Open Transactions from the dashboard to view your recent transfers, payments, and other account activity.",
  },
  {
    category: "Top Up",
    question: "How can I complete a mobile top up?",
    answer:
      "Open Top Up from your dashboard, select your mobile operator, enter the number and amount, then confirm the top up.",
  },
  {
    category: "Transfer",
    question: "What should I do if my transfer is pending?",
    answer:
      "Check your Transfer History first. If the transfer remains pending, contact support with your transaction ID.",
  },
  {
    category: "Loans",
    question: "How can I check my loan application status?",
    answer:
      "Open the Loans section to view your submitted applications and their current status.",
  },
  {
    category: "Security",
    question: "What should I do if I notice suspicious activity?",
    answer:
      "Contact support immediately and avoid sharing your password, OTP, PIN, or other security information with anyone.",
  },
];

const categories = [
  {
    title: "Account & Security",
    description: "Profile, login and security help",
    icon: ShieldCheck,
  },
  {
    title: "Payments & Cards",
    description: "Cards, payments and billing",
    icon: CreditCard,
  },
  {
    title: "Transfers & Top Up",
    description: "Transfer and recharge support",
    icon: ArrowRightLeft,
  },
  {
    title: "Loans",
    description: "Application and loan assistance",
    icon: FileText,
  },
];

export default function HelpSupportPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(keyword) ||
        faq.answer.toLowerCase().includes(keyword) ||
        faq.category.toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7">
          <Link
            href="/dashboard"
            className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm text-slate-400 transition hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <HelpCircle size={19} />
                </div>

                <span className="text-sm font-semibold text-emerald-400">
                  Help Center
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Help & Support
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Find answers, get assistance, and manage your banking
                questions quickly.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-400 md:flex">
              <Clock3 size={17} className="text-emerald-400" />
              Support available
            </div>
          </div>
        </div>

        {/* Search */}
        <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="mb-3">
            <h2 className="font-semibold text-white">
              How can we help you?
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Search our frequently asked questions.
            </p>
          </div>

          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
            />
          </div>
        </section>

        {/* Support Cards */}
        <section className="mb-7 grid gap-4 md:grid-cols-3">
          <SupportCard
            icon={<MessageCircle size={21} />}
            title="Live Chat"
            description="Chat with our support team."
            action="Start Chat"
            iconClass="bg-emerald-500/10 text-emerald-400"
          />

          <SupportCard
            icon={<Mail size={21} />}
            title="Email Support"
            description="Send us your questions anytime."
            action="Send Email"
            iconClass="bg-blue-500/10 text-blue-400"
          />

          <SupportCard
            icon={<Phone size={21} />}
            title="Phone Support"
            description="Speak directly with support."
            action="Call Support"
            iconClass="bg-purple-500/10 text-purple-400"
          />
        </section>

        {/* Categories */}
        <section className="mb-7">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Browse Help Topics</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a category to find the information you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900/80"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-emerald-400 transition group-hover:bg-emerald-500/10">
                    <Icon size={20} />
                  </div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div className="border-b border-slate-800 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <HelpCircle size={20} />
              </div>

              <div>
                <h2 className="font-bold">Frequently Asked Questions</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Quick answers to common questions.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question}>
                    <button
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-800/40"
                    >
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                          {faq.category}
                        </span>

                        <p className="mt-1 text-sm font-medium text-slate-200">
                          {faq.question}
                        </p>
                      </div>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-500 transition ${
                          isOpen ? "rotate-180 text-emerald-400" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-400">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-12 text-center">
                <Search
                  size={28}
                  className="mx-auto text-slate-600"
                />
                <h3 className="mt-3 font-semibold">
                  No results found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try searching with a different keyword.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Banner */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Send size={18} className="text-emerald-400" />
                <h2 className="font-bold">Still need help?</h2>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Our support team is ready to help with your banking
                questions.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400">
              <MessageCircle size={17} />
              Contact Support
            </button>
          </div>
        </section>

        <p className="py-6 text-center text-xs text-slate-600">
          Greenfield Bank • Help & Support Center
        </p>
      </div>
    </main>
  );
}

function SupportCard({
  icon,
  title,
  description,
  action,
  iconClass,
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-slate-700">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-xs text-emerald-400 opacity-0 transition group-hover:opacity-100">
          Available
        </span>
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <button className="mt-4 text-xs font-bold text-slate-300 transition hover:text-emerald-400">
        {action} →
      </button>
    </div>
  );
}