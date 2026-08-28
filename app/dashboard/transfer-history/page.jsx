"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRightLeft,
  Search,
  RefreshCw,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  Wallet,
  Building2,
  Hash,
  User,
  Filter,
  History,
  Download,
  TrendingUp,
  ShieldCheck,
  Send,
  CircleDollarSign,
  CreditCard,
  FileText,
} from "lucide-react";

const STORAGE_KEY = "transferHistory";
const VALID_STATUSES = ["Completed", "Pending", "Failed"];

export default function TransferHistoryPage() {
  const [transfers, setTransfers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [mounted, setMounted] = useState(false);

  const loadTransferHistory = useCallback(() => {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);

      if (!rawData) {
        setTransfers([]);
        return;
      }

      const savedTransfers = JSON.parse(rawData);

      if (!Array.isArray(savedTransfers)) {
        setTransfers([]);
        return;
      }

      const normalizedTransfers = savedTransfers
        .map((transfer, index) => {
          const createdAt =
            transfer.createdAt ||
            transfer.updatedAt ||
            new Date().toISOString();

          return {
            ...transfer,
            id: transfer.id || `TRX-${Date.now()}-${index + 1}`,
            recipientName:
              transfer.recipientName ||
              transfer.recipient ||
              transfer.name ||
              "Unknown Recipient",
            bankName:
              transfer.bankName ||
              transfer.bank ||
              "Bank Transfer",
            accountNumber:
              transfer.accountNumber ||
              transfer.account ||
              "—",
            amount: Number(transfer.amount || 0),
            status: VALID_STATUSES.includes(transfer.status)
              ? transfer.status
              : "Pending",
            createdAt,
            updatedAt: transfer.updatedAt || createdAt,
          };
        })
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        );

      setTransfers(normalizedTransfers);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(normalizedTransfers)
      );
    } catch (error) {
      console.error(error);
      setTransfers([]);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadTransferHistory();
  }, [loadTransferHistory]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTransfer(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        loadTransferHistory();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, [loadTransferHistory]);

  const updateTransferStatus = (id, newStatus) => {
    if (!VALID_STATUSES.includes(newStatus)) return;

    const updatedAt = new Date().toISOString();

    setTransfers((current) => {
      const updated = current
        .map((transfer) =>
          transfer.id === id
            ? { ...transfer, status: newStatus, updatedAt }
            : transfer
        )
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });

    setSelectedTransfer((current) =>
      current?.id === id
        ? {
            ...current,
            status: newStatus,
            updatedAt,
          }
        : current
    );
  };

  const filteredTransfers = useMemo(() => {
    const value = search.toLowerCase().trim();

    return transfers.filter((transfer) => {
      const matchesSearch =
        !value ||
        [transfer.id, transfer.recipientName, transfer.accountNumber, transfer.bankName]
          .some((item) =>
            String(item || "").toLowerCase().includes(value)
          );

      const matchesStatus =
        statusFilter === "All" ||
        transfer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transfers, search, statusFilter]);

  const stats = useMemo(() => {
    const totalAmount = transfers.reduce(
      (total, transfer) =>
        total + Number(transfer.amount || 0),
      0
    );

    return {
      total: transfers.length,
      totalAmount,
      completed: transfers.filter(
        (item) => item.status === "Completed"
      ).length,
      pending: transfers.filter(
        (item) => item.status === "Pending"
      ).length,
      failed: transfers.filter(
        (item) => item.status === "Failed"
      ).length,
    };
  }, [transfers]);

  const deleteTransfer = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this transfer?"
      )
    ) {
      return;
    }

    setTransfers((current) => {
      const updated = current.filter(
        (transfer) => transfer.id !== id
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });

    setSelectedTransfer(null);
  };

  const clearHistory = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all transfer history?"
      )
    ) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([])
    );

    setTransfers([]);
    setSelectedTransfer(null);
  };

  const downloadHistory = () => {
    if (!transfers.length) {
      alert("No transfer history available.");
      return;
    }

    const blob = new Blob(
      [
        JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            totalTransfers: transfers.length,
            transfers,
          },
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `transfer-history-${
      new Date().toISOString().split("T")[0]
    }.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07110d]" />
    );
  }

  return (
    <main className="min-h-screen bg-[#07110d] px-3 py-4 text-white sm:px-5">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <section className="mb-4 rounded-2xl border border-slate-800 bg-[#0b1612] p-4 shadow-xl sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href="/dashboard/transfer"
                className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-blue-400"
              >
                <ArrowLeft size={15} />
                Back
              </Link>

              <div className="flex items-center gap-2">
                <History
                  size={22}
                  className="text-blue-400"
                />

                <h1 className="text-2xl font-bold sm:text-3xl">
                  Transfer History
                </h1>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Manage and track all your money transfers.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadTransferHistory}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-300"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <button
                onClick={downloadHistory}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-300"
              >
                <Download size={15} />
                Export
              </button>

              <Link
                href="/dashboard/transfer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold hover:bg-blue-500"
              >
                <Send size={15} />
                Transfer
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}

        <section className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            title="Total"
            value={stats.total}
            icon={<ArrowRightLeft size={18} />}
            theme="blue"
          />

          <StatCard
            title="Amount Sent"
            value={`৳${stats.totalAmount.toLocaleString("en-BD")}`}
            icon={<Wallet size={18} />}
            theme="emerald"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 size={18} />}
            theme="cyan"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={18} />}
            theme="violet"
          />
        </section>

        {/* Records */}

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1915]">
          <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Transfer Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredTransfers.length} of{" "}
                {transfers.length} records
              </p>
            </div>

            {transfers.length > 0 && (
              <button
                onClick={clearHistory}
                className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-400"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>

          {/* Filters */}

          <div className="grid gap-3 border-b border-slate-800 p-4 md:grid-cols-[1fr_180px]">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search transfers..."
                className="w-full rounded-lg border border-slate-700 bg-[#07110d] py-2.5 pl-10 pr-3 text-xs outline-none focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-[#07110d] py-2.5 pl-9 pr-3 text-xs text-slate-300 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Table */}

          {filteredTransfers.length > 0 ? (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="border-b border-slate-800 bg-slate-950/50">
                    <tr>
                      <TableHeader>Recipient</TableHeader>
                      <TableHeader>Bank</TableHeader>
                      <TableHeader>Amount</TableHeader>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800">
                    {filteredTransfers.map((transfer) => (
                      <tr
                        key={transfer.id}
                        className="hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                              <User size={16} />
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                {transfer.recipientName}
                              </p>

                              <p className="text-[10px] text-slate-500">
                                {transfer.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div>
                            <p className="text-xs font-medium text-slate-300">
                              {transfer.bankName}
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-slate-500">
                              {transfer.accountNumber}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-rose-400">
                            -৳
                            {Number(
                              transfer.amount
                            ).toLocaleString("en-BD")}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-xs text-slate-300">
                            {formatDate(transfer)}
                          </p>

                          <p className="text-[10px] text-slate-500">
                            {formatTime(transfer)}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <select
                            value={transfer.status}
                            onChange={(e) =>
                              updateTransferStatus(
                                transfer.id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-slate-700 bg-[#07110d] px-2 py-1.5 text-[11px] font-bold outline-none"
                          >
                            {VALID_STATUSES.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() =>
                                setSelectedTransfer(
                                  transfer
                                )
                              }
                              className="rounded-lg bg-blue-500/10 p-2 text-blue-400"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              onClick={() =>
                                deleteTransfer(
                                  transfer.id
                                )
                              }
                              className="rounded-lg bg-rose-500/10 p-2 text-rose-400"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}

              <div className="divide-y divide-slate-800 md:hidden">
                {filteredTransfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-2.5">
                        <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
                          <User size={17} />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">
                            {transfer.recipientName}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {transfer.bankName}
                          </p>

                          <p className="text-[10px] text-slate-600">
                            {transfer.id}
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={transfer.status}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-800 py-3">
                      <MobileInfo
                        label="Amount"
                        value={`-৳${Number(
                          transfer.amount
                        ).toLocaleString("en-BD")}`}
                      />

                      <MobileInfo
                        label="Account"
                        value={transfer.accountNumber}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <select
                        value={transfer.status}
                        onChange={(e) =>
                          updateTransferStatus(
                            transfer.id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-700 bg-[#07110d] px-2 py-2 text-xs"
                      >
                        {VALID_STATUSES.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setSelectedTransfer(
                              transfer
                            )
                          }
                          className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            deleteTransfer(
                              transfer.id
                            )
                          }
                          className="rounded-lg bg-rose-500/10 p-2.5 text-rose-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              hasFilters={
                search || statusFilter !== "All"
              }
              onReset={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            />
          )}
        </section>
      </div>

      {selectedTransfer && (
        <TransferDetailsModal
          transfer={selectedTransfer}
          onClose={() =>
            setSelectedTransfer(null)
          }
          onDelete={deleteTransfer}
          onStatusChange={
            updateTransferStatus
          }
        />
      )}
    </main>
  );
}

function formatDate(transfer) {
  const value =
    transfer.date ||
    transfer.updatedAt ||
    transfer.createdAt;

  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(transfer) {
  if (transfer.time) return transfer.time;

  const value =
    transfer.updatedAt ||
    transfer.createdAt;

  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatCard({
  title,
  value,
  icon,
  theme,
}) {
  const themes = {
    blue: "bg-blue-500/10 text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    violet: "bg-violet-500/10 text-violet-400",
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d1915] p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] text-slate-500">
            {title}
          </p>

          <h2 className="mt-1.5 break-all text-lg font-bold sm:text-xl">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-lg p-2 ${themes[theme]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Pending:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Failed:
      "border-rose-500/20 bg-rose-500/10 text-rose-400",
  };

  const icons = {
    Completed: <CheckCircle2 size={12} />,
    Pending: <Clock3 size={12} />,
    Failed: <XCircle size={12} />,
  };

  const normalizedStatus =
    VALID_STATUSES.includes(status)
      ? status
      : "Pending";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${styles[normalizedStatus]}`}
    >
      {icons[normalizedStatus]}
      {normalizedStatus}
    </span>
  );
}

function MobileInfo({ label, value }) {
  return (
    <div>
      <p className="text-[10px] text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-all text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  hasFilters,
  onReset,
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl bg-blue-500/10 p-5 text-blue-400">
        <History size={32} />
      </div>

      <h3 className="mt-4 text-lg font-bold">
        No Transfer Found
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">
        {hasFilters
          ? "No records match your current filters."
          : "Your transfer history will appear here."}
      </p>

      {hasFilters ? (
        <button
          onClick={onReset}
          className="mt-5 rounded-lg bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-400"
        >
          Reset Filters
        </button>
      ) : (
        <Link
          href="/dashboard/transfer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold"
        >
          <Send size={15} />
          New Transfer
        </Link>
      )}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}

        <p className="text-[10px]">
          {label}
        </p>
      </div>

      <p className="mt-2 break-all text-xs font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function TransferDetailsModal({
  transfer,
  onClose,
  onDelete,
  onStatusChange,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d1915] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#0d1915] p-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] text-blue-400">
              TRANSFER DETAILS
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Transfer Receipt
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">
                  Transfer Amount
                </p>

                <h3 className="mt-1 text-2xl font-bold text-rose-400">
                  -৳
                  {Number(
                    transfer.amount || 0
                  ).toLocaleString("en-BD")}
                </h3>
              </div>

              <StatusBadge
                status={transfer.status}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailRow
              icon={<Hash size={15} />}
              label="Transaction ID"
              value={transfer.id}
            />

            <DetailRow
              icon={<User size={15} />}
              label="Recipient"
              value={transfer.recipientName}
            />

            <DetailRow
              icon={<Building2 size={15} />}
              label="Bank"
              value={transfer.bankName}
            />

            <DetailRow
              icon={<CreditCard size={15} />}
              label="Account"
              value={transfer.accountNumber}
            />

            <DetailRow
              icon={<CircleDollarSign size={15} />}
              label="Amount"
              value={`৳${Number(
                transfer.amount || 0
              ).toLocaleString("en-BD")}`}
            />

            <DetailRow
              icon={<CalendarDays size={15} />}
              label="Date"
              value={formatDate(transfer)}
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold tracking-wider text-blue-400">
              UPDATE STATUS
            </p>

            <div className="grid grid-cols-3 gap-2">
              {VALID_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    onStatusChange(
                      transfer.id,
                      status
                    )
                  }
                  className={`rounded-lg border px-2 py-2.5 text-[10px] font-bold ${
                    transfer.status === status
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {transfer.description && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex items-center gap-2 text-slate-500">
                <FileText size={15} />
                <span className="text-[10px]">
                  Description
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-300">
                {transfer.description}
              </p>
            </div>
          )}

          <button
            onClick={() =>
              onDelete(transfer.id)
            }
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500/10 py-3 text-xs font-bold text-rose-400"
          >
            <Trash2 size={16} />
            Delete Transfer
          </button>
        </div>
      </div>
    </div>
  );
}