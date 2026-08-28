"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpFromLine,
  Wallet,
  Building2,
  CreditCard,
  Landmark,
  CircleCheckBig,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Banknote,
} from "lucide-react";

const DEFAULT_BALANCE = 125450.75;

export default function WithdrawPage() {
  const [balance, setBalance] = useState(DEFAULT_BALANCE);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Account");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [withdrawData, setWithdrawData] = useState(null);

  useEffect(() => {
    const savedBalance = localStorage.getItem("accountBalance");

    if (savedBalance !== null) {
      setBalance(Number(savedBalance));
    } else {
      localStorage.setItem("accountBalance", DEFAULT_BALANCE.toString());
    }
  }, []);

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  };

  const selectAmount = (value) => {
    setAmount(value.toString());
    setError("");
    setMessage("");
  };

  const handleWithdraw = (e) => {
    e.preventDefault();

    const withdrawAmount = Number(amount);

    setError("");
    setMessage("");

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (withdrawAmount > balance) {
      setError("Insufficient balance for this withdrawal.");
      return;
    }

    if (withdrawAmount < 100) {
      setError("Minimum withdrawal amount is ৳ 100.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newBalance = balance - withdrawAmount;

      const transaction = {
        id: Date.now(),
        name: "Cash Withdrawal",
        type: "withdraw",
        amount: withdrawAmount,
        method,
        note: note || "Account withdrawal",
        status: "Completed",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: new Date().toISOString(),
      };

      const existingTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

      localStorage.setItem(
        "transactions",
        JSON.stringify([transaction, ...existingTransactions])
      );

      localStorage.setItem("accountBalance", newBalance.toString());

      setBalance(newBalance);
      setWithdrawData(transaction);
      setAmount("");
      setNote("");
      setMessage("Withdrawal completed successfully.");
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/account"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Withdraw Money
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Withdraw funds securely from your bank account.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <p className="text-xs text-slate-500">Secure Transaction</p>
              <p className="font-semibold text-emerald-400">
                Protected
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Withdraw Form */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-8">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <ArrowUpFromLine className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Withdrawal Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Enter the amount you want to withdraw.
                </p>
              </div>
            </div>

            {message && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <CircleCheckBig className="h-5 w-5 shrink-0 text-emerald-400" />

                <p className="text-sm font-medium text-emerald-300">
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />

                <p className="text-sm font-medium text-red-300">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Withdrawal Amount
                </label>

                <div className="flex items-center rounded-2xl border border-slate-700 bg-slate-950 transition focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10">
                  <div className="border-r border-slate-800 px-4 py-4 font-bold text-slate-400">
                    ৳
                  </div>

                  <input
                    type="number"
                    min="100"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-4 py-4 text-lg font-semibold text-white outline-none placeholder:text-slate-600"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Minimum withdrawal amount: ৳ 100.00
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
                      type="button"
                      key={value}
                      onClick={() => selectAmount(value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        Number(amount) === value
                          ? "border-red-500 bg-red-500/10 text-red-400"
                          : "border-slate-700 bg-slate-950 text-slate-300 hover:border-red-500/40 hover:text-red-400"
                      }`}
                    >
                      ৳ {formatMoney(value)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Withdrawal Method */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Withdrawal Method
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMethod("Bank Account")}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      method === "Bank Account"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 bg-slate-950 hover:border-slate-600"
                    }`}
                  >
                    <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
                      <Landmark className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">Bank Account</p>
                      <p className="text-xs text-slate-500">
                        Withdraw to linked account
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("Cash Withdrawal")}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      method === "Cash Withdrawal"
                        ? "border-red-500 bg-red-500/10"
                        : "border-slate-700 bg-slate-950 hover:border-slate-600"
                    }`}
                  >
                    <div className="rounded-xl bg-red-500/10 p-2 text-red-400">
                      <Banknote className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Cash Withdrawal
                      </p>
                      <p className="text-xs text-slate-500">
                        Withdraw physical cash
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Note <span className="text-slate-600">(Optional)</span>
                </label>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Add a note for this withdrawal..."
                  className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-4 font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing Withdrawal...
                  </>
                ) : (
                  <>
                    <ArrowUpFromLine className="h-5 w-5" />
                    Withdraw Money
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Account Summary */}
          <aside className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-red-950/20 p-6">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <Wallet className="h-6 w-6" />
              </div>

              <p className="text-sm text-slate-400">Available Balance</p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                ৳ {formatMoney(balance)}
              </h2>

              <div className="mt-6 border-t border-slate-800 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Account Type</span>
                  <span className="font-medium text-slate-200">
                    Savings Account
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Account Status</span>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Active
                  </span>
                </div>
              </div>
            </section>

            {/* Preview */}
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-slate-800 p-2 text-slate-300">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Withdrawal Preview
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review before confirming
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-slate-500">Amount</span>

                  <span className="font-semibold text-red-400">
                    - ৳ {formatMoney(amount || 0)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-slate-500">Method</span>

                  <span className="text-right text-sm font-medium text-white">
                    {method}
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm font-medium text-slate-400">
                      Remaining Balance
                    </span>

                    <span className="font-bold text-white">
                      ৳{" "}
                      {formatMoney(
                        Math.max(
                          0,
                          balance - Number(amount || 0)
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {withdrawData && (
              <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <div className="flex items-start gap-3">
                  <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                  <div>
                    <h3 className="font-bold text-emerald-400">
                      Withdrawal Successful
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      ৳ {formatMoney(withdrawData.amount)} has been withdrawn
                      successfully.
                    </p>

                    <Link
                      href="/dashboard/transactions"
                      className="mt-4 inline-flex text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      View Transactions →
                    </Link>
                  </div>
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}