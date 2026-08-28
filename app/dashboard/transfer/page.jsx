"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRightLeft,
  Wallet,
  User,
  Building2,
  Hash,
  FileText,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  History,
  Eye,
  EyeOff,
  CircleDollarSign,
} from "lucide-react";

export default function TransferPage() {
  const router = useRouter();

  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [bankName, setBankName] = useState("Greenfield Bank");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const availableBalance = 128450;

  const formattedAmount = useMemo(() => {
    const value = Number(amount || 0);
    return value.toLocaleString("en-BD");
  }, [amount]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const cleanAccountNumber = accountNumber.trim();
    const transferAmount = Number(amount);

    if (!recipientName.trim()) {
      setErrorMessage("Please enter the recipient name.");
      return;
    }

    if (!cleanAccountNumber || cleanAccountNumber.length < 6) {
      setErrorMessage("Please enter a valid account number.");
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      setErrorMessage("Please enter a valid transfer amount.");
      return;
    }

    if (transferAmount > availableBalance) {
      setErrorMessage("Insufficient balance for this transfer.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const now = new Date();

      const newTransfer = {
        id: `TRX-${Date.now()}`,
        recipientName: recipientName.trim(),
        accountNumber: cleanAccountNumber,
        bankName,
        amount: transferAmount,
        description: description.trim() || "Fund transfer",
        status: "Completed",
        type: "debit",
        category: "Transfer",
        method: "Bank Transfer",
        date: now.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: now.toISOString(),
      };

      const storedTransfers = localStorage.getItem("transferHistory");
      let existingTransfers = [];

      try {
        existingTransfers = storedTransfers ? JSON.parse(storedTransfers) : [];
      } catch {
        existingTransfers = [];
      }

      const updatedTransfers = [
        newTransfer,
        ...(Array.isArray(existingTransfers) ? existingTransfers : []),
      ];

      localStorage.setItem("transferHistory", JSON.stringify(updatedTransfers));

      setSuccessMessage(
        `৳${transferAmount.toLocaleString("en-BD")} successfully transferred to ${recipientName.trim()}.`
      );

      setRecipientName("");
      setAccountNumber("");
      setAmount("");
      setDescription("");

      setTimeout(() => {
        router.push("/dashboard/transfer-history");
      }, 1200);

    } catch (error) {
      console.error(error);
      setErrorMessage("Transfer could not be completed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060d0a] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/transfer-history"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-blue-500/50 hover:text-blue-400"
          >
            <History size={16} />
            History
          </Link>
        </div>

        {/* Header Section */}
        <section className="mb-5 rounded-2xl border border-slate-800 bg-[#0b1612] p-5 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-[11px] font-bold tracking-[0.15em] text-blue-400">
                  SECURE BANKING
                </span>
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl">Fund Transfer</h1>
              <p className="mt-1 text-sm text-slate-500">
                Send money quickly and securely.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-400 sm:block">
              <ArrowRightLeft size={34} />
            </div>
          </div>
        </section>

        {/* Form and Sidebar Layout */}
        <section className="grid gap-5 lg:grid-cols-[1fr_280px]">
          {/* Form Area */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5 shadow-xl shadow-black/10">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <Send size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Transfer Details</h2>
                <p className="text-xs text-slate-500">
                  Enter recipient information
                </p>
              </div>
            </div>

            {successMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 size={18} className="shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Recipient Name" icon={<User size={16} />}>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Full name"
                    className="professional-input"
                  />
                </FormField>

                <FormField label="Account Number" icon={<Hash size={16} />}>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Account number"
                    className="professional-input"
                  />
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Bank / Method" icon={<Building2 size={16} />}>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="professional-input"
                  >
                    <option>Greenfield Bank</option>
                    <option>Other Bank</option>
                    <option>Mobile Banking</option>
                    <option>International Transfer</option>
                  </select>
                </FormField>

                <FormField
                  label="Transfer Amount"
                  icon={<CircleDollarSign size={16} />}
                >
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                      ৳
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                      className="professional-input pl-9"
                    />
                  </div>
                </FormField>
              </div>

              <FormField label="Description" icon={<FileText size={16} />} optional>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What is this transfer for?"
                  className="professional-input resize-none"
                />
              </FormField>
 
              {Number(amount) > 0 && (
                <div className="grid gap-3 rounded-xl border border-blue-500/15 bg-blue-500/[0.04] p-4 sm:grid-cols-3">
                  <PreviewItem label="Recipient" value={recipientName || "Not selected"} />
                  <PreviewItem label="Amount" value={`৳${formattedAmount}`} />
                  <PreviewItem label="Method" value={bankName} />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Transfer Money
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar Area */}
          <aside className="space-y-5">
            {/* Balance Widget */}
            <section className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                  <Wallet size={20} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowBalance((prev) => !prev)}
                  className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:text-white"
                >
                  {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <p className="mt-5 text-xs text-slate-500">Available Balance</p>
              <h3 className="mt-1 text-2xl font-bold">
                {showBalance
                  ? `৳${availableBalance.toLocaleString("en-BD")}`
                  : "৳ ••••••••"}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Account Active
              </div>
            </section>

            {/* Security Widget */}
            <section className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Protected Transfer</h3>
                  <p className="text-xs text-slate-500">Secure encryption</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <SecurityItem text="Secure processing" />
                <SecurityItem text="Encrypted data" />
                <SecurityItem text="Instant record" />
              </div>
            </section>
          </aside>
        </section>
      </div>

      <style jsx>{`
        .professional-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgb(51 65 85);
          background: rgb(7 17 13);
          padding: 12px 14px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }
        .professional-input::placeholder {
          color: rgb(100 116 139);
        }
        .professional-input:focus {
          border-color: rgba(59, 130, 246, 0.7);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }
        select.professional-input {
          appearance: auto;
        }
      `}</style>
    </main>
  );
}

/* Sub-components */

function FormField({ label, icon, optional, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <label className="flex items-center gap-1.5">
          {icon}
          {label}
        </label>
        {optional && (
          <span className="text-[10px] text-slate-600">Optional</span>
        )}
      </div>
      {children}
    </div>
  );
}

function PreviewItem({ label, value }) {
  return (
    <div>
      <span className="text-xs text-slate-500">{label}</span>
      <p className="mt-1 truncate text-sm font-bold text-slate-200">{value}</p>
    </div>
  );
}

function SecurityItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
      <span>{text}</span>
    </div>
 );
}