import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

import {
  CreditCard,
  Plus,
  ShieldCheck,
  Lock,
  Eye,
  Settings,
  Zap,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default async function CardsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const customerName =
    session.user.name || session.user.email || "VALUED CUSTOMER";

  const transactions = [
    {
      desc: "Netflix Subscription",
      date: "Aug 20, 2026",
      amount: "৳ 1,150.00",
      card: "Visa •• 5678",
    },
    {
      desc: "Agoda Hotel Booking",
      date: "Aug 18, 2026",
      amount: "৳ 14,200.00",
      card: "Mastercard •• 9101",
    },
    {
      desc: "Starbucks Coffee",
      date: "Aug 17, 2026",
      amount: "৳ 650.00",
      card: "Visa •• 5678",
    },
  ];

  const cardActions = [
    {
      title: "Freeze Card",
      icon: Lock,
      color:
        "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20",
    },
    {
      title: "Show PIN",
      icon: Eye,
      color:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
    },
    {
      title: "Block Card",
      icon: ShieldCheck,
      color:
        "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20",
    },
    {
      title: "Set Limits",
      icon: Zap,
      color:
        "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20",
    },
    {
      title: "Replace Card",
      icon: CreditCard,
      color:
        "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    },
    {
      title: "Preferences",
      icon: Settings,
      color:
        "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20",
    },
  ];

  const benefits = [
    "0% Foreign transaction markup fees",
    "Contactless NFC payment enabled",
    "24/7 Priority Banking Fraud Protection",
    "Complimentary Airport Lounge access",
    "Instant SMS notification for transactions",
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <Topbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar current="cards" />

        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <CreditCard size={19} />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Card Center
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                  My Cards
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your debit and credit cards, limits, security and
                  preferences.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus size={17} />
                Request New Card
              </button>
            </div>

            {/* Card Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Active Cards
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h2 className="text-2xl font-bold text-white">02</h2>

                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <CheckCircle2 size={13} />
                    Active
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Available Credit
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  ৳ 1,75,000
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Credit limit available
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Security Status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-400" />

                  <span className="font-semibold text-emerald-400">
                    Protected
                  </span>
                </div>
              </div>
            </div>

            {/* Cards */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Your Cards
                  </h2>

                  <p className="text-xs text-slate-500">
                    Your currently active banking cards
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Manage Cards
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Visa Debit */}
                <div className="group relative overflow-hidden rounded-2xl border border-blue-400/20 bg-linear-to-br from-blue-700 via-blue-800 to-blue-950 p-6 shadow-2xl shadow-blue-950/30">
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-400/10 blur-2xl" />
                  <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-blue-100/80">
                          GREENFIELD BANK
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-wider text-blue-200/60">
                          Debit Card
                        </p>
                      </div>

                      <div className="text-lg font-black italic tracking-tight text-white">
                        VISA
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="mb-2 h-8 w-11 rounded-md bg-linear-to-br from-yellow-100 to-yellow-500 shadow-lg" />

                      <p className="font-mono text-lg tracking-[0.18em] text-white">
                        4532 •••• •••• 5678
                      </p>
                    </div>

                    <div className="mt-7 flex items-end justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-blue-200/60">
                          Card Holder
                        </p>

                        <p className="mt-1 max-w-47.5 truncate text-sm font-bold uppercase text-white">
                          {customerName}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-blue-200/60">
                          Expires
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          08/28
                        </p>
                      </div>

                      <div className="text-xs font-bold text-white/80">
                        ●●
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mastercard */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-linear-to-br from-slate-800 via-slate-900 to-black p-6 shadow-2xl">
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-500/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-200">
                          GREENFIELD PLATINUM
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                          Credit Card
                        </p>
                      </div>

                      <div className="flex items-center text-sm font-bold text-white">
                        <span className="-mr-2 h-6 w-6 rounded-full bg-red-500/90" />
                        <span className="h-6 w-6 rounded-full bg-orange-400/90" />
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="mb-2 h-8 w-11 rounded-md bg-linear-to-br from-yellow-100 to-yellow-500 shadow-lg" />

                      <p className="font-mono text-lg tracking-[0.18em] text-white">
                        5412 •••• •••• 9101
                      </p>
                    </div>

                    <div className="mt-7 flex items-end justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                          Card Holder
                        </p>

                        <p className="mt-1 max-w-47.5 truncate text-sm font-bold uppercase text-white">
                          {customerName}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                          Expires
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          11/29
                        </p>
                      </div>

                      <div className="text-xs font-bold text-slate-400">
                        PLATINUM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Management + Benefits */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Card Management */}
              <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="font-bold text-white">
                      Card Management
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Security and card controls
                    </p>
                  </div>

                  <MoreHorizontal size={19} className="text-slate-500" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cardActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.title}
                        type="button"
                        className={`flex min-h-25 flex-col items-center justify-center gap-3 rounded-xl border p-3 transition ${action.color}`}
                      >
                        <Icon size={21} />

                        <span className="text-center text-xs font-semibold">
                          {action.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Benefits */}
              <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Card Benefits
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Premium features included with your cards
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-emerald-400">
                        Your card is protected
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Fraud monitoring and transaction alerts are enabled
                        for your account.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Recent Transactions */}
            <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="flex items-center justify-between border-b border-slate-800 p-5">
                <div>
                  <h2 className="font-bold text-white">
                    Recent Card Transactions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Latest transactions made with your cards
                  </p>
                </div>

                <Link
                  href="/transactions"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  View All
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-162.5 text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/40 text-left text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4 font-semibold">
                        Transaction
                      </th>

                      <th className="px-5 py-4 font-semibold">
                        Card
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-right font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((item) => (
                      <tr
                        key={`${item.desc}-${item.date}`}
                        className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-200">
                            {item.desc}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-500">
                            {item.date}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-400">
                          {item.card}
                        </td>

                        <td className="px-5 py-4 text-right font-bold text-slate-200">
                          {item.amount}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 size={12} />
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Security Notice */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-amber-400"
              />

              <div>
                <p className="text-sm font-semibold text-amber-300">
                  Stay secure
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Greenfield Bank will never ask for your full card number,
                  PIN, OTP or password through phone calls, email or messages.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}