"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ReceiptText,
  Zap,
  Flame,
  Droplets,
  Wifi,
  Smartphone,
  Wallet,
  Search,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ShieldCheck,
  CalendarDays,
  ChevronRight,
  History,
  CreditCard,
} from "lucide-react";

const billCategories = [
  {
    name: "Electricity",
    icon: Zap,
    providers: ["DESCO", "DPDC", "NESCO", "BREB"],
  },
  {
    name: "Gas",
    icon: Flame,
    providers: ["Titas Gas", "Karnaphuli Gas", "Jalalabad Gas"],
  },
  {
    name: "Water",
    icon: Droplets,
    providers: ["Dhaka WASA", "Chattogram WASA"],
  },
  {
    name: "Internet",
    icon: Wifi,
    providers: ["BTCL", "Link3", "Amber IT", "Local ISP"],
  },
  {
    name: "Mobile Postpaid",
    icon: Smartphone,
    providers: [
      "Grameenphone",
      "Robi",
      "Banglalink",
      "Teletalk",
    ],
  },
];

export default function BillPaymentPage() {
  const [balance, setBalance] = useState(128450);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [provider, setProvider] = useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [amount, setAmount] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  useEffect(() => {
    const savedBalance =
      localStorage.getItem("accountBalance");

    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  const selectedBill =
    billCategories.find(
      (item) =>
        item.name === selectedCategory
    );

  const handlePayBill = () => {
    setMessage("");

    const billAmount = Number(amount);

    if (!selectedCategory) {
      setMessage(
        "Please select a bill category."
      );
      setMessageType("error");
      return;
    }

    if (!provider) {
      setMessage(
        "Please select a service provider."
      );
      setMessageType("error");
      return;
    }

    if (
      !accountNumber ||
      accountNumber.length < 5
    ) {
      setMessage(
        "Please enter a valid account or customer number."
      );
      setMessageType("error");
      return;
    }

    if (!billAmount || billAmount < 1) {
      setMessage(
        "Please enter a valid payment amount."
      );
      setMessageType("error");
      return;
    }

    if (billAmount > balance) {
      setMessage(
        "Insufficient account balance."
      );
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();

      const newBillPayment = {
        id: `BILL-${Date.now()}`,
        category: selectedCategory,
        provider,
        accountNumber,
        amount: billAmount,
        status: "Completed",
        date: now.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        ),
        time: now.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        createdAt: now.toISOString(),
      };

      const existingBills = JSON.parse(
        localStorage.getItem(
          "billPaymentHistory"
        ) || "[]"
      );

      localStorage.setItem(
        "billPaymentHistory",
        JSON.stringify([
          newBillPayment,
          ...existingBills,
        ])
      );

      const newBalance =
        balance - billAmount;

      localStorage.setItem(
        "accountBalance",
        newBalance.toString()
      );

      const existingTransactions =
        JSON.parse(
          localStorage.getItem(
            "transactions"
          ) || "[]"
        );

      const newTransaction = {
        id: `TXN-${Date.now()}`,
        name: `${selectedCategory} Bill Payment`,
        category: "Bills",
        date: newBillPayment.date,
        time: newBillPayment.time,
        amount: `-৳${billAmount.toLocaleString()}`,
        numericAmount: billAmount,
        type: "debit",
        status: "Completed",
        method: provider,
        createdAt:
          newBillPayment.createdAt,
      };

      localStorage.setItem(
        "transactions",
        JSON.stringify([
          newTransaction,
          ...existingTransactions,
        ])
      );

      setBalance(newBalance);

      setMessage(
        "Bill payment completed successfully!"
      );

      setMessageType("success");

      setIsLoading(false);

      setTimeout(() => {
        window.location.href =
          "/dashboard/bill-payment-history";
      }, 1000);
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white md:px-8 lg:px-10">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-140px] top-[-150px] h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="absolute bottom-[-150px] right-[-120px] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:-translate-x-1 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

              <p className="text-sm font-semibold tracking-widest text-amber-400">
                BANKING SERVICES
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Bill Payment
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Pay your utility, internet and
              postpaid bills securely from your
              banking account.
            </p>
          </div>

          <Link
            href="/dashboard/bill-payment-history"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
          >
            <History size={18} />
            Payment History
          </Link>
        </div>

        {/* Balance Card */}
        <section className="mb-6 rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Wallet size={25} />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Available Balance
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  ৳{balance.toLocaleString()}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 size={18} />
              Secure payment enabled
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
          {/* Payment Form */}
          <section className="rounded-3xl border border-slate-800 bg-[#0d1915]/95 p-5 shadow-2xl shadow-black/20 md:p-7">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <ReceiptText size={27} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Pay Your Bill
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Select a bill type and enter
                  your payment details.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-300">
                  Bill Category
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {billCategories.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const active =
                        selectedCategory ===
                        item.name;

                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(
                              item.name
                            );
                            setProvider("");
                          }}
                          className={`rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-amber-500/50 bg-amber-500/10"
                              : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                          }`}
                        >
                          <div
                            className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
                              active
                                ? "bg-amber-500 text-slate-950"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            <Icon size={20} />
                          </div>

                          <p className="text-xs font-bold text-slate-200">
                            {item.name}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Provider */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Service Provider
                </label>

                <select
                  value={provider}
                  disabled={!selectedBill}
                  onChange={(e) =>
                    setProvider(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {selectedBill
                      ? "Select provider"
                      : "Select bill category first"}
                  </option>

                  {selectedBill?.providers.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Customer / Account Number
                </label>

                <div className="relative">
                  <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(
                        e.target.value
                      )
                    }
                    placeholder="Enter customer or account number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Payment Amount
                </label>

                <div className="relative">
                  <CreditCard
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter bill amount"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-amber-500/50"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[500, 1000, 2000, 5000].map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setAmount(
                            value.toString()
                          )
                        }
                        className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                          Number(amount) ===
                          value
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                            : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        ৳{value}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                    messageType === "success"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-rose-500/20 bg-rose-500/10 text-rose-300"
                  }`}
                >
                  {messageType ===
                  "success" ? (
                    <CheckCircle2
                      size={18}
                    />
                  ) : (
                    <AlertCircle
                      size={18}
                    />
                  )}

                  <p>{message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handlePayBill}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={19} />
                    Pay Bill Now
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Information */}
            <section className="rounded-3xl border border-slate-800 bg-[#0d1915]/95 p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Payment Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Important details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoRow
                  title="Processing Time"
                  value="Instant"
                />

                <InfoRow
                  title="Payment Method"
                  value="Account Balance"
                />

                <InfoRow
                  title="Service Fee"
                  value="No Fee"
                />

                <InfoRow
                  title="Security"
                  value="Protected"
                />
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
                    Secure Payment
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your bill payment is securely
                    processed using your available
                    account balance.
                  </p>
                </div>
              </div>
            </section>

            {/* History */}
            <Link
              href="/dashboard/bill-payment-history"
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0d1915] p-5 transition hover:border-amber-500/30 hover:bg-amber-500/5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                  <History size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Payment History
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View previous bill payments
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

function InfoRow({ title, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-slate-400">
        {title}
      </span>

      <span className="text-sm font-semibold text-slate-200">
        {value}
      </span>
    </div>
  );
}