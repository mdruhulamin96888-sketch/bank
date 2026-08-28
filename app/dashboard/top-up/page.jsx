"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Wallet,
  Loader2,
  History,
  Phone,
  Banknote,
  ShieldCheck,
  AlertCircle,
  Zap,
  Copy,
} from "lucide-react";

const operators = [
  {
    name: "Grameenphone",
    short: "GP",
    color: "emerald",
  },
  {
    name: "Robi",
    short: "R",
    color: "red",
  },
  {
    name: "Banglalink",
    short: "BL",
    color: "amber",
  },
  {
    name: "Teletalk",
    short: "TT",
    color: "emerald",
  },
];

const recentNumbers = [
  {
    name: "Personal Number",
    number: "01712345678",
    operator: "Grameenphone",
  },
  {
    name: "Office Number",
    number: "01898765432",
    operator: "Robi",
  },
];

export default function TopUpPage() {
  const [operator, setOperator] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(128450);

  useEffect(() => {
    const savedBalance = localStorage.getItem("accountBalance");

    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const handleTopUp = () => {
    setMessage("");

    const cleanNumber = mobileNumber.replace(/\D/g, "");
    const topUpAmount = Number(amount);

    if (!operator) {
      setMessage("Please select a mobile operator.");
      return;
    }

    if (
      cleanNumber.length !== 11 ||
      !cleanNumber.startsWith("01")
    ) {
      setMessage("Please enter a valid 11-digit mobile number.");
      return;
    }

    if (!topUpAmount || topUpAmount < 10) {
      setMessage("Minimum top up amount is ৳10.");
      return;
    }

    if (topUpAmount > balance) {
      setMessage("Insufficient account balance.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newTopUp = {
        id: `TOPUP-${Date.now()}`,
        mobileNumber: cleanNumber,
        operator,
        amount: topUpAmount,
        status: "Completed",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: new Date().toISOString(),
      };

      const existingTopUps = JSON.parse(
        localStorage.getItem("topUpHistory") || "[]"
      );

      const updatedHistory = [
        newTopUp,
        ...existingTopUps,
      ];

      const updatedBalance = balance - topUpAmount;

      localStorage.setItem(
        "topUpHistory",
        JSON.stringify(updatedHistory)
      );

      localStorage.setItem(
        "accountBalance",
        updatedBalance.toString()
      );

      /*
        Also add this top up
        to transaction history
      */
      const existingTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

      const newTransaction = {
        id: `TXN-${Date.now()}`,
        name: `Mobile Top Up - ${cleanNumber}`,
        category: "Mobile Top Up",
        date: newTopUp.date,
        time: newTopUp.time,
        amount: `-৳${topUpAmount.toLocaleString()}`,
        numericAmount: topUpAmount,
        type: "debit",
        status: "Completed",
        method: operator,
        createdAt: newTopUp.createdAt,
      };

      localStorage.setItem(
        "transactions",
        JSON.stringify([
          newTransaction,
          ...existingTransactions,
        ])
      );

      window.location.href = "/dashboard/topup-history";
    }, 1200);
  };

  const selectRecentNumber = (item) => {
    setMobileNumber(item.number);
    setOperator(item.operator);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white md:px-8 lg:px-10">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-120px] top-[-150px] h-[380px] w-[380px] rounded-full bg-red-500/10 blur-[130px]" />

        <div className="absolute bottom-[-150px] right-[-120px] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:-translate-x-1 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />

              <p className="text-sm font-semibold tracking-widest text-red-400">
                MOBILE SERVICES
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Mobile Top Up
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Recharge any Bangladeshi mobile number quickly,
              securely and directly from your bank account.
            </p>
          </div>

          <Link
            href="/dashboard/topup-history"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <History size={18} />
            Top Up History
          </Link>
        </div>

        {/* Account Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">
                Available Balance
              </p>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
                <Wallet size={19} />
              </div>
            </div>

            <h2 className="text-2xl font-bold">
              ৳{balance.toLocaleString()}
            </h2>

            <p className="mt-2 text-xs text-emerald-400">
              Available for top up
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">
                Instant Recharge
              </p>

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-400">
                <Zap size={19} />
              </div>
            </div>

            <h2 className="text-2xl font-bold">
              Instant
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Processed securely
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">
                Supported Operators
              </p>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400">
                <Smartphone size={19} />
              </div>
            </div>

            <h2 className="text-2xl font-bold">
              4 Networks
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              GP, Robi, Banglalink & Teletalk
            </p>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
          {/* Main Form */}
          <section className="rounded-3xl border border-slate-800 bg-[#0d1915]/95 p-5 shadow-2xl shadow-black/20 md:p-7">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                <Smartphone size={27} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Recharge Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Enter the mobile number and recharge amount.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Operator */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-300">
                  Select Operator
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {operators.map((item) => {
                    const active =
                      operator === item.name;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() =>
                          setOperator(item.name)
                        }
                        className={`rounded-2xl border p-4 text-center transition ${
                          active
                            ? "border-red-500/50 bg-red-500/10"
                            : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                        }`}
                      >
                        <div
                          className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
                            active
                              ? "bg-red-500 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {item.short}
                        </div>

                        <p className="mt-3 text-xs font-semibold text-slate-200">
                          {item.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Mobile Number
                </label>

                <div className="relative">
                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="tel"
                    value={mobileNumber}
                    maxLength={11}
                    onChange={(e) =>
                      setMobileNumber(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="017XXXXXXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-12 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/5"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Recharge Amount
                </label>

                <div className="relative">
                  <Banknote
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="number"
                    min="10"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-12 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/5"
                  />
                </div>

                {/* Quick Amount */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[50, 100, 200, 500, 1000].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setAmount(value.toString())
                        }
                        className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                          Number(amount) === value
                            ? "border-red-500/40 bg-red-500/10 text-red-400"
                            : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        ৳{value}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Error */}
              {message && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleTopUp}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-4 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Processing Top Up...
                  </>
                ) : (
                  <>
                    <Smartphone size={19} />
                    Top Up Now
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Recent Numbers */}
            <section className="rounded-3xl border border-slate-800 bg-[#0d1915]/95 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Recent Numbers
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Quickly select a saved number
                  </p>
                </div>

                <History
                  size={20}
                  className="text-red-400"
                />
              </div>

              <div className="space-y-3">
                {recentNumbers.map((item) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() =>
                      selectRecentNumber(item)
                    }
                    className="flex w-full items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-left transition hover:border-red-500/30 hover:bg-red-500/5"
                  >
                    <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                      <Smartphone size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.number} · {item.operator}
                      </p>
                    </div>

                    <Copy
                      size={17}
                      className="text-slate-600"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Security */}
            <section className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Secure Top Up
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your mobile recharge is processed securely
                    using your available account balance.
                  </p>
                </div>
              </div>
            </section>

            {/* History Link */}
            <Link
              href="/dashboard/topup-history"
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0d1915] p-5 transition hover:border-red-500/30 hover:bg-red-500/5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
                  <History size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    View Top Up History
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Check all previous mobile recharges
                  </p>
                </div>
              </div>

              <ChevronRight
                size={19}
                className="text-slate-500"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}