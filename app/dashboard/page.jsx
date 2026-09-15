"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function DashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/sign-in");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  const userName = "Bank Customer";

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

        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">

            {/* Welcome */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  Welcome back, {userName}! 👋
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  Here is what is happening with your bank accounts today.
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-400">
                Friday, August 21, 2026
              </div>
            </section>

            {/* Balance Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total Balance */}
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-lg shadow-blue-950/30 sm:col-span-2 xl:col-span-1">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Landmark className="h-6 w-6 text-white" />
                  </div>

                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    Active Account
                  </span>
                </div>

                <p className="mt-5 text-sm text-blue-100">
                  Total 1 year Balance
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white">
                    ৳ 1,25,430.00
                  </h2>

                  <Eye className="h-4 w-4 cursor-pointer text-blue-100" />
                </div>

                <p className="mt-3 text-xs text-blue-100">
                  Available Balance:{" "}
                  <strong className="text-white">
                    ৳ 1,20,430.00
                  </strong>
                </p>
              </div>

              {/* Savings */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <PiggyBank className="h-6 w-6" />
                  </div>

                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </div>

                <p className="mt-5 text-xs text-slate-400">
                  1 year savings Account
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  ৳ 75,000.00
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  A/C No: 101234567890
                </p>
              </div>

              {/* Current */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Wallet className="h-6 w-6" />
                  </div>

                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </div>

                <p className="mt-5 text-xs text-slate-400">
                  7 days current Account
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  ৳ 45,430.00
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  A/C No: 102345678901
                </p>
              </div>

              {/* Fixed Deposit */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-purple-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Building className="h-6 w-6" />
                  </div>

                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </div>

                <p className="mt-5 text-xs text-slate-400">
                  Fixed Deposit
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                  ৳ 5,00,000.00
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  A/C No: 103456789012
                </p>
              </div>
            </section>

            {/* Accounts + Quick Actions */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

              {/* My Accounts */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
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
                        <th className="px-6 py-4 text-left font-semibold">
                          Account
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Number
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Balance
                        </th>

                        <th className="px-6 py-4 text-right font-semibold">
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
                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
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
                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
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
                          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400">
                            Matured
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="m-5 flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-800/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Open a New Account
                    </h4>

                    <p className="mt-1 text-xs text-slate-400">
                      Choose from our savings, current and fixed deposit accounts.
                    </p>
                  </div>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                    Open Account
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    Quick Actions
                  </h2>

                  <span className="text-xs text-slate-400">
                    Services
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                  <Link
                    href="/dashboard/transfer"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition hover:bg-blue-500/20"
                  >
                    <ArrowRightLeft size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Fund Transfer
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/bill-payment"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition hover:bg-emerald-500/20"
                  >
                    <Receipt size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Bill Payment
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/top-up"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                  >
                    <Smartphone size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Top Up
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/loans"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition hover:bg-amber-500/20"
                  >
                    <Landmark size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Loan Apply
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/cards"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition hover:bg-purple-500/20"
                  >
                    <CreditCard size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Card Request
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/statement"
                    className="flex min-h-[105px] flex-col items-center justify-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition hover:bg-cyan-500/20"
                  >
                    <FileText size={22} />

                    <span className="text-xs font-semibold text-slate-200">
                      Statement
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Bottom Grid */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">

              {/* Recent Transactions */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
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
                      className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-800/40"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-200">
                          {item.desc}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                          {item.date}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-white">
                          {item.amount}
                        </p>

                        <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-400">
                          Success
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Services */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
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

                <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                  <h4 className="text-sm font-bold text-blue-400">
                    Need a Loan?
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    Flexible loan solutions for your needs.
                  </p>

                  <Link
                    href="/loans/apply"
                    className="mt-3 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
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
                        className="flex items-center justify-between rounded-lg p-3 transition hover:bg-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                            <LoanIcon className="h-4 w-4 text-blue-400" />
                          </div>

                          <span className="text-sm font-semibold text-slate-300">
                            {loan.title}
                          </span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-slate-600" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Card Services */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
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

                <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-5">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10" />

                  <div className="relative flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold">
                      Greenfield Bank
                    </span>

                    <span className="font-bold text-white">
                      VISA
                    </span>
                  </div>

                  <div className="relative mt-8 text-lg font-semibold tracking-[0.25em] text-slate-200">
                    **** **** **** 5678
                  </div>

                  <div className="relative mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] uppercase text-slate-500">
                        Card Holder
                      </p>

                      <p className="mt-1 text-xs text-slate-300">
                        {userName}
                      </p>
                    </div>

                    <CreditCard className="h-7 w-7 text-blue-400" />
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    No Annual Fee
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Global Acceptance
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Secure Online Payments
                  </li>

                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Contactless Technology
                  </li>
                </ul>

                <Link
                  href="/cards"
                  className="mt-5 block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
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
}