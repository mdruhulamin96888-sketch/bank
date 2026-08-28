"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  X,
  Loader2,
  Copy,
  Check,
  MoreHorizontal,
  Smartphone,
  Landmark,
  Sparkles,
} from "lucide-react";

const initialCards = [
  {
    id: "CARD-001",
    cardType: "Debit Card",
    holderName: "MD SIAM BABU",
    number: "4567 1289 3456 5678",
    expiry: "12/29",
    cvv: "482",
    balance: 128450,
    brand: "VISA",
    status: "Active",
    gradient: "from-slate-800 via-slate-900 to-purple-950",
  },
];

export default function CardsPage() {
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [cardType, setCardType] = useState("Debit Card");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCards = localStorage.getItem("bankCards");

    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (error) {
        console.error("Failed to load cards:", error);
      }
    }

    setMounted(true);
  }, []);

  const saveCards = (updatedCards) => {
    setCards(updatedCards);

    localStorage.setItem(
      "bankCards",
      JSON.stringify(updatedCards)
    );
  };

  const selected =
    selectedCard ||
    cards[0];

  const toggleCardStatus = (id) => {
    const updatedCards = cards.map((card) =>
      card.id === id
        ? {
            ...card,
            status:
              card.status === "Active"
                ? "Frozen"
                : "Active",
          }
        : card
    );

    saveCards(updatedCards);

    const updatedSelected = updatedCards.find(
      (card) => card.id === id
    );

    setSelectedCard(updatedSelected);
  };

  const requestNewCard = () => {
    const newCard = {
      id: `CARD-${Date.now()}`,
      cardType,
      holderName: "MD SIAM BABU",
      number: generateCardNumber(),
      expiry: generateExpiry(),
      cvv: Math.floor(
        100 + Math.random() * 900
      ).toString(),
      balance: 0,
      brand:
        cardType === "Credit Card"
          ? "MASTERCARD"
          : "VISA",
      status: "Active",
      gradient:
        cardType === "Credit Card"
          ? "from-emerald-800 via-emerald-950 to-slate-950"
          : cardType === "Virtual Card"
          ? "from-violet-700 via-purple-950 to-slate-950"
          : "from-blue-900 via-slate-950 to-slate-900",
    };

    const updatedCards = [
      ...cards,
      newCard,
    ];

    saveCards(updatedCards);

    setSelectedCard(newCard);

    setRequestModal(false);
  };

  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(
        selected.number.replace(/\s/g, "")
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07110d]" />
    );
  }

  if (!selected) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white md:px-8 lg:px-10">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:-translate-x-1 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />

              <p className="text-sm font-semibold tracking-wider text-purple-400">
                CARD MANAGEMENT
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              My Cards
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Manage your bank cards, control security and request
              new cards from one place.
            </p>
          </div>

          <button
            onClick={() => setRequestModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-400"
          >
            <Plus size={18} />
            Request New Card
          </button>
        </div>

        {/* Summary */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<CreditCard size={20} />}
            label="Total Cards"
            value={cards.length}
            color="purple"
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            label="Active Cards"
            value={
              cards.filter(
                (card) =>
                  card.status === "Active"
              ).length
            }
            color="emerald"
          />

          <SummaryCard
            icon={<Wallet size={20} />}
            label="Card Balance"
            value={`৳${selected.balance.toLocaleString()}`}
            color="blue"
          />

          <SummaryCard
            icon={<ShieldCheck size={20} />}
            label="Security Status"
            value={
              selected.status === "Active"
                ? "Protected"
                : "Frozen"
            }
            color="amber"
          />
        </section>

        <div className="grid gap-7 xl:grid-cols-[1.25fr_0.75fr]">
          {/* Left Side */}
          <div>
            {/* Card Design */}
            <div
              className={`relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${selected.gradient} p-7 shadow-2xl shadow-black/40 md:p-9`}
            >
              {/* Decorative */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />

              <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-purple-400/10" />

              <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/60">
                      Greenfield Bank
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {selected.cardType}
                    </h2>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
                    <CreditCard size={28} />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl tracking-[0.15em] md:text-2xl">
                      {showCardNumber
                        ? selected.number
                        : "**** **** **** " +
                          selected.number.slice(-4)}
                    </h3>

                    <button
                      onClick={() =>
                        setShowCardNumber(
                          !showCardNumber
                        )
                      }
                      className="text-white/50 transition hover:text-white"
                    >
                      {showCardNumber ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="mb-1 text-[10px] uppercase tracking-wider text-white/50">
                        Card Holder
                      </p>

                      <p className="text-sm font-semibold tracking-wider">
                        {selected.holderName}
                      </p>
                    </div>

                    <div className="flex gap-8">
                      <div>
                        <p className="mb-1 text-[10px] uppercase text-white/50">
                          Expires
                        </p>

                        <p className="text-sm font-semibold">
                          {selected.expiry}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="mb-1 text-[10px] uppercase text-white/50">
                          Network
                        </p>

                        <p className="text-sm font-bold italic">
                          {selected.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Selector */}
            {cards.length > 1 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {cards.map((card) => {
                  const isSelected =
                    selected.id === card.id;

                  return (
                    <button
                      key={card.id}
                      onClick={() =>
                        setSelectedCard(card)
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-purple-500/50 bg-purple-500/10"
                          : "border-slate-800 bg-[#0d1915] hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard
                          size={19}
                          className="text-purple-400"
                        />

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            card.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {card.status}
                        </span>
                      </div>

                      <p className="mt-3 font-semibold">
                        {card.cardType}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        **** {card.number.slice(-4)}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Recent Card Activity */}
            <section className="mt-7 rounded-3xl border border-slate-800 bg-[#0d1915] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Recent Card Activity
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your latest card transactions
                  </p>
                </div>

                <Link
                  href="/dashboard/transactions"
                  className="text-sm font-semibold text-purple-400 transition hover:text-purple-300"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                <ActivityRow
                  name="Online Shopping"
                  date="Today, 10:42 AM"
                  amount="-৳2,450"
                  icon={<Smartphone size={18} />}
                />

                <ActivityRow
                  name="ATM Withdrawal"
                  date="Yesterday, 04:18 PM"
                  amount="-৳10,000"
                  icon={<Landmark size={18} />}
                />

                <ActivityRow
                  name="Netflix Subscription"
                  date="Aug 17, 08:40 PM"
                  amount="-৳1,200"
                  icon={<CreditCard size={18} />}
                />
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="space-y-5">
            {/* Card Status */}
            <section className="rounded-3xl border border-slate-800 bg-[#0d1915] p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Card Security
                  </h2>

                  <p className="text-xs text-slate-500">
                    Control your card instantly
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Card Status
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {selected.status === "Active"
                        ? "Your card is ready for transactions"
                        : "Your card is temporarily frozen"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      selected.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {selected.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  toggleCardStatus(selected.id)
                }
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
                  selected.status === "Active"
                    ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                }`}
              >
                {selected.status === "Active" ? (
                  <>
                    <Lock size={17} />
                    Freeze Card
                  </>
                ) : (
                  <>
                    <Unlock size={17} />
                    Unfreeze Card
                  </>
                )}
              </button>
            </section>

            {/* Card Details */}
            <section className="rounded-3xl border border-slate-800 bg-[#0d1915] p-6">
              <h2 className="font-semibold">
                Card Details
              </h2>

              <div className="mt-5 space-y-5">
                <DetailRow
                  label="Card Number"
                  value={
                    showCardNumber
                      ? selected.number
                      : `**** **** **** ${selected.number.slice(
                          -4
                        )}`
                  }
                  action={
                    <button
                      onClick={copyCardNumber}
                      className="text-purple-400 transition hover:text-purple-300"
                    >
                      {copied ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  }
                />

                <DetailRow
                  label="Expiry Date"
                  value={selected.expiry}
                />

                <DetailRow
                  label="CVV"
                  value={
                    showCvv
                      ? selected.cvv
                      : "***"
                  }
                  action={
                    <button
                      onClick={() =>
                        setShowCvv(!showCvv)
                      }
                      className="text-purple-400 transition hover:text-purple-300"
                    >
                      {showCvv ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  }
                />

                <DetailRow
                  label="Available Balance"
                  value={`৳${selected.balance.toLocaleString()}`}
                />
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-3xl border border-slate-800 bg-[#0d1915] p-6">
              <h2 className="mb-4 font-semibold">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard/transfer"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center transition hover:border-purple-500/40 hover:bg-purple-500/5"
                >
                  <Wallet
                    size={20}
                    className="text-purple-400"
                  />

                  <span className="text-xs font-medium">
                    Transfer
                  </span>
                </Link>

                <button
                  onClick={() =>
                    setRequestModal(true)
                  }
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center transition hover:border-purple-500/40 hover:bg-purple-500/5"
                >
                  <Plus
                    size={20}
                    className="text-purple-400"
                  />

                  <span className="text-xs font-medium">
                    New Card
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Request Card Modal */}
      {requestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#101b17] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Request New Card
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Choose the card type you need.
                </p>
              </div>

              <button
                onClick={() =>
                  setRequestModal(false)
                }
                className="rounded-xl bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  type: "Debit Card",
                  icon: <CreditCard size={20} />,
                  description:
                    "Use money directly from your account.",
                },
                {
                  type: "Credit Card",
                  icon: <Sparkles size={20} />,
                  description:
                    "Access your approved credit limit.",
                },
                {
                  type: "Virtual Card",
                  icon: <Smartphone size={20} />,
                  description:
                    "Secure digital card for online payments.",
                },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() =>
                    setCardType(item.type)
                  }
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    cardType === item.type
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "border-slate-700 bg-slate-950/50 hover:border-slate-600"
                  }`}
                >
                  <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                    {item.icon}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {item.type}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  {cardType === item.type && (
                    <CheckCircle2
                      size={19}
                      className="ml-auto text-purple-400"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={requestNewCard}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 py-3.5 font-bold text-white transition hover:bg-purple-400"
            >
              <Plus size={18} />
              Request {cardType}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({
  icon,
  label,
  value,
  color,
}) {
  const colorClasses = {
    purple:
      "border-purple-500/20 bg-purple-500/10 text-purple-400",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5 shadow-lg shadow-black/10">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">
          {label}
        </p>

        <div
          className={`rounded-xl border p-2.5 ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}

function DetailRow({
  label,
  value,
  action,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-white">
          {value}
        </p>
      </div>

      {action}
    </div>
  );
}

function ActivityRow({
  name,
  date,
  amount,
  icon,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
      <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {date}
        </p>
      </div>

      <p className="text-sm font-bold text-rose-400">
        {amount}
      </p>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function generateCardNumber() {
  const group = () =>
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `${group()} ${group()} ${group()} ${group()}`;
}

function generateExpiry() {
  const year =
    new Date().getFullYear() +
    Math.floor(Math.random() * 5) +
    2;

  const month = String(
    Math.floor(Math.random() * 12) + 1
  ).padStart(2, "0");

  return `${month}/${String(year).slice(-2)}`;
}