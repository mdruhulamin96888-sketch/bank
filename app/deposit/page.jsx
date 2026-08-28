"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wallet,
  Landmark,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  ArrowDownToLine,
  Building2,
  FileText,
  CircleDollarSign,
} from "lucide-react";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const depositMethods = [
    {
      name: "Bank Transfer",
      icon: Landmark,
      description: "Deposit from another bank account",
    },
    {
      name: "Debit Card",
      icon: CreditCard,
      description: "Add money using your debit card",
    },
    {
      name: "Mobile Banking",
      icon: Smartphone,
      description: "Deposit through mobile banking",
    },
    {
      name: "Cash Deposit",
      icon: Banknote,
      description: "Deposit cash at a branch",
    },
  ];

  const formattedAmount = useMemo(() => {
    const value = Number(amount || 0);

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }, [amount]);

  const handleDeposit = async (e) => {
    e.preventDefault();

    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    if (depositAmount < 100) {
      alert("Minimum deposit amount is ৳ 100.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newTransaction = {
      id: Date.now(),
      name: `Deposit via ${method}`,
      type: "deposit",
      amount: depositAmount,
      category: "Deposit",
      method,
      reference: reference || "No reference provided",
      status: "Completed",
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      createdAt: new Date().toISOString(),
    };

    const oldTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );

    localStorage.setItem(
      "transactions",
      JSON.stringify([newTransaction, ...oldTransactions])
    );

    const currentBalance = Number(
      localStorage.getItem("accountBalance") || 125450.75
    );

    const newBalance = currentBalance + depositAmount;

    localStorage.setItem("accountBalance", String(newBalance));

    setLoading(false);
    setSuccess(true);
  };

  const resetDeposit = () => {
    setAmount("");
    setReference("");
    setMethod("Bank Transfer");
    setSuccess(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-emerald-500/20 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-11 w-11" />
            </div>

            <p className="text-sm font-medium text-emerald-400">
              DEPOSIT SUCCESSFUL
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white">
              Money Deposited Successfully
            </h1>

            <p className="mx-auto mt-4 max-w-md text-slate-400">
              Your deposit has been added to your account successfully.
            </p>

            <div className="my-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              <p className="text-sm text-slate-400">Deposited Amount</p>

              <p className="mt-2 text-4xl font-bold text-emerald-400">
                + ৳ {formattedAmount}
              </p>

              <div className="mt-6 border-t border-slate-800 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Deposit Method</span>
                  <span className="font-medium text-white">{method}</span>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="font-medium text-emerald-400">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={resetDeposit}
                className="rounded-xl bg-slate-800 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-700"
              >
                Make Another Deposit
              </button>

              <Link
                href="/dashboard/statement"
                className="rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                View My Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <ArrowDownToLine className="h-7 w-7" />
              </div>

              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                Deposit Money
              </h1>

              <p className="mt-2 text-slate-400">
                Add money securely to your bank account.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />

              <div>
                <p className="text-xs text-slate-500">Secure Deposit</p>
                <p className="text-sm font-semibold text-emerald-400">
                  Protected Transaction
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Deposit Form */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-7">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-white">
                Deposit Details
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the amount and choose your preferred deposit method.
              </p>
            </div>

            <form onSubmit={handleDeposit} className="space-y-7">
              {/* Account */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Deposit To
                </label>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Wallet className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Primary Savings Account
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Account •••• 9210
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Deposit Amount
                </label>

                <div className="relative">
                  <CircleDollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-400" />

                  <input
                    type="number"
                    min="100"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-12 py-4 text-lg font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    BDT
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Minimum deposit amount: ৳ 100
                </p>
              </div>

              {/* Quick Amount */}
              <div>
                <p className="mb-3 text-sm font-medium text-slate-300">
                  Quick Select
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[500, 1000, 5000, 10000].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                    >
                      ৳ {value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deposit Methods */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Deposit Method
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {depositMethods.map((item) => {
                    const Icon = item.icon;
                    const active = method === item.name;

                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setMethod(item.name)}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-slate-700 bg-slate-950 hover:border-slate-600"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? "bg-emerald-500 text-slate-950"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <p
                            className={`font-semibold ${
                              active ? "text-emerald-400" : "text-white"
                            }`}
                          >
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reference */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Reference / Note
                  <span className="text-slate-600">(Optional)</span>
                </label>

                <textarea
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Add a note for this deposit..."
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing Deposit...
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="h-5 w-5" />
                    Deposit Money
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Summary */}
          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-white">Deposit Summary</h2>
                  <p className="text-xs text-slate-500">
                    Review your transaction
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/70 p-5">
                <p className="text-sm text-slate-500">You are depositing</p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  ৳ {formattedAmount}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Account</span>
                  <span className="text-right font-medium text-white">
                    Savings Account
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Method</span>
                  <span className="text-right font-medium text-white">
                    {method}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-slate-800 pt-4 text-sm">
                  <span className="text-slate-500">Deposit Fee</span>
                  <span className="font-medium text-emerald-400">Free</span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-6">
              <ShieldCheck className="mb-4 h-8 w-8 text-emerald-400" />

              <h3 className="font-bold text-white">Secure Banking</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your deposit information is protected with secure banking
                technology.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}