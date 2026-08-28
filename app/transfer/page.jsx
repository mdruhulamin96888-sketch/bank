"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Hash,
  Landmark,
  Loader2,
  Search,
  Send,
  ShieldCheck,
  User,
  Wallet,
  XCircle,
} from "lucide-react";

const DEFAULT_ACCOUNT = {
  name: "Md Siam Babu",
  accountNumber: "874292103847",
  balance: 125450.75,
};

export default function TransferPage() {
  const [account, setAccount] = useState(DEFAULT_ACCOUNT);

  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const [search, setSearch] = useState("");
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem("bankAccount");
    const savedTransfers = localStorage.getItem("bankTransfers");

    if (savedAccount) {
      try {
        setAccount(JSON.parse(savedAccount));
      } catch {
        localStorage.setItem(
          "bankAccount",
          JSON.stringify(DEFAULT_ACCOUNT)
        );
      }
    } else {
      localStorage.setItem(
        "bankAccount",
        JSON.stringify(DEFAULT_ACCOUNT)
      );
    }

    if (savedTransfers) {
      try {
        setTransfers(JSON.parse(savedTransfers));
      } catch {
        setTransfers([]);
      }
    }
  }, []);

  const filteredTransfers = useMemo(() => {
    return transfers.filter((transfer) =>
      `${transfer.recipientName} ${transfer.recipientAccount}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, transfers]);

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const transferAmount = Number(amount);

    if (!recipientName.trim()) {
      setError("Please enter the recipient name.");
      return;
    }

    if (!recipientAccount.trim()) {
      setError("Please enter the recipient account number.");
      return;
    }

    if (recipientAccount === account.accountNumber) {
      setError("You cannot transfer money to your own account.");
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      setError("Please enter a valid transfer amount.");
      return;
    }

    if (transferAmount > account.balance) {
      setError("Insufficient account balance.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newBalance = Number(
        (account.balance - transferAmount).toFixed(2)
      );

      const transaction = {
        id: `TRX-${Date.now()}`,
        recipientName: recipientName.trim(),
        recipientAccount: recipientAccount.trim(),
        amount: transferAmount,
        reference: reference.trim() || "Bank Transfer",
        status: "Completed",
        type: "transfer",
        createdAt: new Date().toISOString(),
      };

      const updatedAccount = {
        ...account,
        balance: newBalance,
      };

      const updatedTransfers = [transaction, ...transfers];

      setAccount(updatedAccount);
      setTransfers(updatedTransfers);

      localStorage.setItem(
        "bankAccount",
        JSON.stringify(updatedAccount)
      );

      localStorage.setItem(
        "bankTransfers",
        JSON.stringify(updatedTransfers)
      );

      // Optional: Save to transaction history
      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

      const newTransaction = {
        id: transaction.id,
        name: `Transfer to ${transaction.recipientName}`,
        type: "transfer",
        amount: transaction.amount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Completed",
        createdAt: transaction.createdAt,
      };

      localStorage.setItem(
        "transactions",
        JSON.stringify([newTransaction, ...savedTransactions])
      );

      setRecipientName("");
      setRecipientAccount("");
      setAmount("");
      setReference("");

      setLoading(false);
      setSuccess(
        `৳ ${formatMoney(
          transferAmount
        )} successfully transferred to ${transaction.recipientName}.`
      );

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Transfer Money
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Send money securely to another bank account.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Secure Banking
              </p>

              <p className="font-semibold text-emerald-400">
                Protected Transfer
              </p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950">
                <Wallet className="h-6 w-6" />
              </div>

              <p className="text-sm text-slate-400">
                Available Balance
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                ৳ {formatMoney(account.balance)}
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                {account.name} • Savings Account
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Your Account Number
              </p>

              <div className="mt-2 flex items-center gap-3">
                <Hash className="h-5 w-5 text-emerald-400" />

                <span className="font-semibold text-white">
                  {account.accountNumber}
                </span>

                <button
                  onClick={handleCopy}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
                  title="Copy account number"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Transfer Form */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <div className="mb-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Send className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                New Transfer
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the recipient account details below.
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0" />

                <p className="text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                <p className="text-sm">{success}</p>
              </div>
            )}

            <form
              onSubmit={handleTransfer}
              className="space-y-5"
            >
              {/* Recipient Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Recipient Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) =>
                      setRecipientName(e.target.value)
                    }
                    placeholder="Enter recipient full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-12 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Recipient Account */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Recipient Account Number
                </label>

                <div className="relative">
                  <Landmark className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    value={recipientAccount}
                    onChange={(e) =>
                      setRecipientAccount(e.target.value)
                    }
                    placeholder="Enter account number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-12 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transfer Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-emerald-400">
                    ৳
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-10 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Maximum available: ৳{" "}
                  {formatMoney(account.balance)}
                </p>
              </div>

              {/* Reference */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Reference <span className="text-slate-600">(Optional)</span>
                </label>

                <input
                  type="text"
                  value={reference}
                  onChange={(e) =>
                    setReference(e.target.value)
                  }
                  placeholder="e.g. Payment, Rent, Loan"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                />
              </div>

              {/* Transfer Preview */}
              {amount && Number(amount) > 0 && (
                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                  <p className="mb-4 text-sm font-medium text-slate-300">
                    Transfer Summary
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">
                        Transfer Amount
                      </p>

                      <p className="mt-1 text-xl font-bold text-white">
                        ৳ {formatMoney(amount)}
                      </p>
                    </div>

                    <ArrowRight className="h-5 w-5 text-emerald-400" />

                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Remaining Balance
                      </p>

                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        ৳{" "}
                        {formatMoney(
                          Math.max(
                            account.balance -
                              Number(amount || 0),
                            0
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 py-4 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Transfer Money
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Recent Transfers */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Recent Transfers
                  </h2>

                  <p className="text-sm text-slate-400">
                    Your latest money transfers.
                  </p>
                </div>
              </div>

              <div className="relative mt-5">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipient..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-800">
              {filteredTransfers.length > 0 ? (
                filteredTransfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="p-5 transition hover:bg-slate-800/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                        <ArrowRightLeft className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-white">
                          {transfer.recipientName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {transfer.recipientAccount}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-red-400">
                          - ৳ {formatMoney(transfer.amount)}
                        </p>

                        <p className="mt-1 text-xs text-emerald-400">
                          {transfer.status}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />

                      {new Date(
                        transfer.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
                    <CreditCard className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 font-semibold text-white">
                    No transfers yet
                  </h3>

                  <p className="mt-2 max-w-xs text-sm text-slate-500">
                    Your completed money transfers will appear here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}