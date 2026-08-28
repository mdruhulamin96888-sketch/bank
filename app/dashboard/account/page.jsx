"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  Search,
  Wallet,
  CreditCard,
  CalendarDays,
  Hash,
  User,
  X,
  ChevronRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Landmark,
} from "lucide-react";

export default function AccountPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const account = {
    name: "Md Siam Babu",
    accountNumber: "GF-8742-XXXX-9210",
    fullAccountNumber: "874292103847",
    accountType: "Savings Account",
    balance: 125450.75,
    availableBalance: 125450.75,
    status: "Active",
    openedDate: "15 January 2026",
  };

  const transactions = [
    {
      id: 1,
      name: "Salary Deposit",
      type: "deposit",
      amount: 85000,
      date: "26 Aug 2026",
      time: "10:42 AM",
      category: "Income",
      status: "Completed",
    },
    {
      id: 2,
      name: "Online Shopping",
      type: "withdraw",
      amount: 4250,
      date: "25 Aug 2026",
      time: "07:18 PM",
      category: "Shopping",
      status: "Completed",
    },
    {
      id: 3,
      name: "Account Transfer",
      type: "transfer",
      amount: 15000,
      date: "24 Aug 2026",
      time: "02:35 PM",
      category: "Transfer",
      status: "Completed",
    },
    {
      id: 4,
      name: "Cash Deposit",
      type: "deposit",
      amount: 10000,
      date: "22 Aug 2026",
      time: "11:20 AM",
      category: "Deposit",
      status: "Completed",
    },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.fullAccountNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <Link
                href="/dashboard"
                className="transition hover:text-emerald-400"
              >
                Dashboard
              </Link>

              <ChevronRight className="h-4 w-4" />

              <span className="text-slate-300">Account</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Account
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your account information and recent activity.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Account Status</p>
              <p className="font-semibold text-emerald-400">Active & Secured</p>
            </div>
          </div>
        </div>

        {/* Main Account Card */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative">
            <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20">
                  <Landmark className="h-7 w-7" />
                </div>

                <p className="text-sm text-slate-400">Total Available Balance</p>

                <div className="mt-2 flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-white sm:text-5xl">
                    {showBalance
                      ? `৳ ${formatMoney(account.balance)}`
                      : "৳ ••••••••••"}
                  </h2>

                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-2.5 text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
                    aria-label="Toggle balance visibility"
                  >
                    {showBalance ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  Savings Account • {account.accountNumber}
                </p>
              </div>

              <div className="flex items-start">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                  {account.status}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-slate-400">Account Type</p>
                  <Wallet className="h-5 w-5 text-emerald-400" />
                </div>

                <p className="font-semibold text-white">{account.accountType}</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-slate-400">Available Balance</p>
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                </div>

                <p className="font-semibold text-white">
                  ৳ {formatMoney(account.availableBalance)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-slate-400">Account Opened</p>
                  <CalendarDays className="h-5 w-5 text-violet-400" />
                </div>

                <p className="font-semibold text-white">{account.openedDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-400">
              Access your most frequently used banking actions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/deposit"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-slate-950">
                <ArrowDownToLine className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-white">Deposit</h3>
              <p className="mt-1 text-sm text-slate-400">
                Add money to your account.
              </p>
            </Link>

            <Link
              href="/withdraw"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition group-hover:bg-red-500 group-hover:text-white">
                <ArrowUpFromLine className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-white">Withdraw</h3>
              <p className="mt-1 text-sm text-slate-400">
                Withdraw funds securely.
              </p>
            </Link>

            <Link
              href="/transfer"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition group-hover:bg-cyan-500 group-hover:text-slate-950">
                <ArrowRightLeft className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-white">Transfer</h3>
              <p className="mt-1 text-sm text-slate-400">
                Send money to another account.
              </p>
            </Link>

            <Link
              href="/cards"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                <CreditCard className="h-5 w-5" />
              </div>

              <h3 className="font-semibold text-white">My Cards</h3>
              <p className="mt-1 text-sm text-slate-400">
                Manage linked bank cards.
              </p>
            </Link>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          {/* Recent Transactions */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900">
            <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your latest account activity.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search activity..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-800">
              {filteredTransactions.map((transaction) => {
                const isDeposit = transaction.type === "deposit";

                return (
                  <button
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-slate-800/40 sm:p-6"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        transaction.type === "deposit"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : transaction.type === "withdraw"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-cyan-500/10 text-cyan-400"
                      }`}
                    >
                      {transaction.type === "deposit" ? (
                        <ArrowDownToLine className="h-5 w-5" />
                      ) : transaction.type === "withdraw" ? (
                        <ArrowUpFromLine className="h-5 w-5" />
                      ) : (
                        <ArrowRightLeft className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">
                        {transaction.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          isDeposit ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isDeposit ? "+" : "-"} ৳{" "}
                        {formatMoney(transaction.amount)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {transaction.status}
                      </p>
                    </div>
                  </button>
                );
              })}

              {filteredTransactions.length === 0 && (
                <div className="p-10 text-center text-sm text-slate-500">
                  No transactions found.
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 p-4">
              <Link
                href="/transactions"
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/10"
              >
                View All Transactions
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Account Details */}
          <section className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Account Details</h2>
              <p className="mt-1 text-sm text-slate-400">
                Your banking account information.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                  <User className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Account Holder
                  </p>
                  <p className="mt-1 font-semibold text-white">{account.name}</p>
                </div>
              </div>

              <div className="border-t border-slate-800" />

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                  <Hash className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Account Number
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <p className="truncate font-semibold text-white">
                      {account.fullAccountNumber}
                    </p>

                    <button
                      onClick={handleCopy}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-emerald-400"
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

              <div className="border-t border-slate-800" />

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Bank
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    Green Field Bank
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800" />

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Opened On
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {account.openedDate}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/settings"
              className="mt-8 flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-semibold text-white transition hover:border-emerald-500/40 hover:bg-slate-800/70"
            >
              Manage Account Settings
            </Link>
          </section>
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">Transaction Details</p>
                <h3 className="mt-1 text-xl font-bold text-white">
                  {selectedTransaction.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="rounded-xl bg-slate-800 p-2 text-slate-400 transition hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Amount</span>
                <span
                  className={`font-bold ${
                    selectedTransaction.type === "deposit"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedTransaction.type === "deposit" ? "+" : "-"} ৳{" "}
                  {formatMoney(selectedTransaction.amount)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Category</span>
                <span className="font-medium text-white">
                  {selectedTransaction.category}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Date</span>
                <span className="font-medium text-white">
                  {selectedTransaction.date}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Status</span>
                <span className="font-medium text-emerald-400">
                  {selectedTransaction.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}