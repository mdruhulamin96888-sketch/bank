import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

import {
  Wallet,
  ArrowRightLeft,
  Receipt,
  Landmark,
  CreditCard,
  Eye,
  PiggyBank,
  ChevronRight,
  Smartphone,
  FileText,
  Building,
  Home,
  Car,
  Briefcase,
} from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Bank Customer";
  const transactions = [
    {
      id: 1,
      desc: "Fund Transfer to Mohammad Ali",
      date: "Aug 16, 2026",
      amount: "৳ 5,000.00",
    },
    {
      id: 2,
      desc: "Electricity Bill Payment",
      date: "Aug 15, 2026",
      amount: "৳ 1,200.00",
    },
    {
      id: 3,
      desc: "Mobile Recharge",
      date: "Aug 14, 2026",
      amount: "৳ 500.00",
    },
    {
      id: 4,
      desc: "ATM Withdrawal",
      date: "Aug 14, 2026",
      amount: "৳ 2,000.00",
    },
    {
      id: 5,
      desc: "Salary Credit",
      date: "Aug 13, 2026",
      amount: "৳ 25,000.00",
    },
  ];

  const loans = [
    {
      id: "personal",
      title: "Personal Loan",
      icon: PiggyBank,
    },
    {
      id: "home",
      title: "Home Loan",
      icon: Home,
    },
    {
      id: "car",
      title: "Car Loan",
      icon: Car,
    },
    {
      id: "business",
      title: "Business Loan",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Topbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar current="dashboard" />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* ==================== WELCOME ==================== */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Welcome back, {userName}! 👋
                </h1>

                <p className="text-sm text-slate-400 mt-2">
                  Here is what is happening with your bank accounts today.
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
                Friday, August 21, 2026
              </div>
            </section>

            {/* ==================== BALANCE CARDS ==================== */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* Total Balance */}
              <div className="sm:col-span-2 xl:col-span-1 rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/30 shadow-lg shadow-blue-950/30">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-white" />
                  </div>

                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-300/20">
                    Active Account
                  </span>
                </div>

                <p className="text-sm text-blue-100 mt-5">
                  Total 1 year Balance
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-2xl font-extrabold text-white">
                    ৳ 1,25,430.00
                  </h2>

                  <Eye className="w-4 h-4 text-blue-100 cursor-pointer" />
                </div>

                <p className="text-xs text-blue-100 mt-3">
                  Available Balance:{" "}
                  <strong className="text-white">
                    ৳ 1,20,430.00
                  </strong>
                </p>
              </div>

              {/* Savings */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-blue-500/40 transition">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <PiggyBank className="w-6 h-6" />
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </div>

                <p className="text-xs text-slate-400 mt-5">
                 1 year savings Account
                </p>

                <h3 className="text-xl font-bold text-white mt-1">
                  ৳ 75,000.00
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  A/C No: 101234567890
                </p>
              </div>

              {/* Current */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-emerald-500/40 transition">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </div>

                <p className="text-xs text-slate-400 mt-5">
                  7 days current Account
                </p>

                <h3 className="text-xl font-bold text-white mt-1">
                  ৳ 45,430.00
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  A/C No: 102345678901
                </p>
              </div>

              {/* Fixed Deposit */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-purple-500/40 transition">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </div>

                <p className="text-xs text-slate-400 mt-5">
                  Fixed Deposit
                </p>

                <h3 className="text-xl font-bold text-white mt-1">
                  ৳ 5,00,000.00
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  A/C No: 103456789012
                </p>
              </div>
            </section>

            {/* ==================== ACCOUNTS + QUICK ACTIONS ==================== */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* My Accounts */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                  <h2 className="text-lg font-bold text-white">
                    My Accounts
                  </h2>

                  <Link
                    href="/account"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500">
                        <th className="text-left px-6 py-4 font-semibold">
                          Account
                        </th>
                        <th className="text-left px-4 py-4 font-semibold">
                          Number
                        </th>
                        <th className="text-left px-4 py-4 font-semibold">
                          Balance
                        </th>
                        <th className="text-right px-6 py-4 font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-slate-800/70 hover:bg-slate-800/40">
                        <td className="px-6 py-4 font-semibold text-white">
                          Savings
                        </td>

                        <td className="px-4 py-4 text-slate-400">
                          101234567890
                        </td>

                        <td className="px-4 py-4 font-semibold text-white">
                          ৳ 75,000.00
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                            Active
                          </span>
                        </td>
                      </tr>

                      <tr className="border-b border-slate-800/70 hover:bg-slate-800/40">
                        <td className="px-6 py-4 font-semibold text-white">
                          Current
                        </td>

                        <td className="px-4 py-4 text-slate-400">
                          102345678901
                        </td>

                        <td className="px-4 py-4 font-semibold text-white">
                          ৳ 45,430.00
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                            Active
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-800/40">
                        <td className="px-6 py-4 font-semibold text-white">
                          Fixed Deposit
                        </td>

                        <td className="px-4 py-4 text-slate-400">
                          103456789012
                        </td>

                        <td className="px-4 py-4 font-semibold text-white">
                          ৳ 5,00,000.00
                        </td>

                        <td className="px-6 py-4 text-right">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400">
                            Matured
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="m-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Open a New Account
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">
                      Choose from our savings, current and fixed deposit accounts.
                    </p>
                  </div>

                  <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition">
                    Open Account
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-white">
                    Quick Actions
                  </h2>

                  <span className="text-xs text-slate-400">
                    Services
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                  {/* Fund Transfer */}
                  <Link
                    href="/dashboard/transfer"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition"
                  >
                    <ArrowRightLeft size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Fund Transfer
                    </span>
                  </Link>

                  {/* Bill Payment */}
                  <Link
                    href="/dashboard/bill-payment"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition"
                  >
                    <Receipt size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Bill Payment
                    </span>
                  </Link>

                  {/* Top Up */}
                  <Link
                    href="/dashboard/top-up"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Smartphone size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Top Up
                    </span>
                  </Link>

                  {/* Loan Apply */}
                  <Link
                    href="/dashboard/loans"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition"
                  >
                    <Landmark size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Loan Apply
                    </span>
                  </Link>

                  {/* Card Request */}
                  <Link
                    href="/dashboard/cards"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition"
                  >
                    <CreditCard size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Card Request
                    </span>
                  </Link>

                  {/* Statement */}
                  <Link
                    href="/dashboard/statement"
                    className="flex flex-col items-center justify-center gap-3 min-h-[105px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition"
                  >
                    <FileText size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Statement
                    </span>
                  </Link>

                </div>
              </div>
            </section>

            {/* ==================== BOTTOM GRID ==================== */}
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Recent Transactions */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
                  <h2 className="text-lg font-bold text-white">
                    Recent Transactions
                  </h2>

                  <Link
                    href="/transactions"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Link>
                </div>

                <div className="divide-y divide-slate-800">
                  {transactions.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-200 truncate">
                          {item.desc}
                        </p>

                        <p className="text-[11px] text-slate-500 mt-1">
                          {item.date}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-white">
                          {item.amount}
                        </p>

                        <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400">
                          Success
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Services */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-white">
                    Loan Services
                  </h2>

                  <Link
                    href="/loans"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                  <h4 className="text-sm font-bold text-blue-400">
                    Need a Loan?
                  </h4>

                  <p className="text-xs text-slate-400 mt-1">
                    Flexible loan solutions for your needs.
                  </p>

                  <Link
                    href="/loans/apply"
                    className="inline-flex mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                  >
                    Apply Now
                  </Link>
                </div>

                <div className="space-y-1">
                  {loans.map((loan) => {
                    const LoanIcon = loan.icon;

                    return (
                      <Link
                        href="/loans"
                        key={loan.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <LoanIcon className="w-4 h-4 text-blue-400" />
                          </div>

                          <span className="text-sm font-semibold text-slate-300">
                            {loan.title}
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Card Services */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-white">
                    Card Services
                  </h2>

                  <Link
                    href="/cards"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Link>
                </div>

                <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 border border-slate-700">
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-500/10" />

                  <div className="relative flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold">
                      Greenfield Bank
                    </span>

                    <span className="font-bold text-white">
                      VISA
                    </span>
                  </div>

                  <div className="relative mt-8 text-lg tracking-[0.25em] font-semibold text-slate-200">
                    **** **** **** 5678
                  </div>

                  <div className="relative mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase">
                        Card Holder
                      </p>

                      <p className="text-xs text-slate-300 mt-1">
                        {userName}
                      </p>
                    </div>

                    <CreditCard className="w-7 h-7 text-blue-400" />
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    No Annual Fee
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Global Acceptance
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Secure Online Payments
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Contactless Technology
                  </li>
                </ul>

                <Link
                  href="/cards"
                  className="block text-center w-full mt-5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                >
                  Request New Card
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}2