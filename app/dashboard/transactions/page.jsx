import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import TransactionsClient from "@/components/TransactionsClient";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

const initialTransactions = [
  {
    id: "TXN-10284",
    name: "Salary Deposit",
    category: "Income",
    date: "Aug 22, 2026",
    time: "10:32 AM",
    amount: "+৳85,000",
    type: "credit",
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN-10283",
    name: "Grocery Store",
    category: "Shopping",
    date: "Aug 21, 2026",
    time: "06:45 PM",
    amount: "-৳4,250",
    type: "debit",
    status: "Completed",
    method: "Debit Card",
  },
  {
    id: "TXN-10282",
    name: "Electricity Bill",
    category: "Bills",
    date: "Aug 20, 2026",
    time: "02:18 PM",
    amount: "-৳2,840",
    type: "debit",
    status: "Completed",
    method: "Online Payment",
  },
  {
    id: "TXN-10281",
    name: "Rahim Ahmed",
    category: "Transfer",
    date: "Aug 19, 2026",
    time: "11:20 AM",
    amount: "-৳8,000",
    type: "debit",
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN-10280",
    name: "Cash Deposit",
    category: "Deposit",
    date: "Aug 18, 2026",
    time: "09:15 AM",
    amount: "+৳20,000",
    type: "credit",
    status: "Completed",
    method: "Branch",
  },
  {
    id: "TXN-10279",
    name: "Netflix",
    category: "Subscription",
    date: "Aug 17, 2026",
    time: "08:40 PM",
    amount: "-৳1,200",
    type: "debit",
    status: "Pending",
    method: "Debit Card",
  },
  {
    id: "TXN-10278",
    name: "ATM Withdrawal",
    category: "Cash",
    date: "Aug 16, 2026",
    time: "04:12 PM",
    amount: "-৳10,000",
    type: "debit",
    status: "Failed",
    method: "ATM",
  },
];

export default async function TransactionsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const firstName = user.firstName || user.username || "User";

  return (
    <main className="min-h-screen bg-[#07110d] px-3 py-4 text-slate-100 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#0d1915] px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
            >
              <ArrowLeft size={14} />
              Dashboard
            </Link>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">
                BANKING
              </span>
            </div>

            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Transactions
            </h1>

            <p className="text-xs text-slate-500">
              Welcome back, {firstName}. View your recent activity.
            </p>
          </div>

          <div>
            <Link
              href="/dashboard/transfer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              + New Transfer
            </Link>
          </div>
        </div>

        {/* Compact Summary Cards */}
        <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SummaryCard
            title="Balance"
            value="৳128,450"
            text="Available"
            icon={<ArrowDownLeft size={16} />}
            iconClass="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
          />

          <SummaryCard
            title="Money In"
            value="৳105,000"
            text="This month"
            icon={<ArrowDownLeft size={16} />}
            iconClass="text-blue-400 bg-blue-500/10 border-blue-500/20"
          />

          <SummaryCard
            title="Money Out"
            value="৳26,290"
            text="This month"
            icon={<ArrowUpRight size={16} />}
            iconClass="text-rose-400 bg-rose-500/10 border-rose-500/20"
          />

          <SummaryCard
            title="Transactions"
            value={initialTransactions.length}
            text="Total records"
            icon={<CalendarDays size={16} />}
            iconClass="text-violet-400 bg-violet-500/10 border-violet-500/20"
          />
        </section>

        {/* Dynamic Client Component */}
        <TransactionsClient initialTransactions={initialTransactions} />
      </div>
    </main>
  );
}

/* Helper Component */
function SummaryCard({ title, value, text, icon, iconClass }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d1915] p-3.5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{title}</span>

        <div className={`rounded-lg border p-1.5 ${iconClass}`}>{icon}</div>
      </div>

      <div className="text-lg font-bold text-white">{value}</div>

      <p className="mt-1 text-[10px] text-slate-600">{text}</p>
    </div>
  );
}