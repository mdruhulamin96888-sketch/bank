"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  X,
  Trash2,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  Wallet,
  History,
  Hash,
  CreditCard,
  Building2,
  Plus,
  CircleDollarSign,
} from "lucide-react";

export default function TopUpHistoryPage() {
  const [topUps, setTopUps] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTopUp, setSelectedTopUp] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadTopUpHistory();
    setMounted(true);
  }, []);

  const loadTopUpHistory = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("topUpHistory") || "[]"
      );

      const data = Array.isArray(saved) ? saved : [];

      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      setTopUps(data);
    } catch (error) {
      console.error("Failed to load history:", error);
      setTopUps([]);
    }
  };

  // Change status and save permanently
  const updateStatus = (id, status) => {
    const updated = topUps.map((topUp) =>
      topUp.id === id
        ? {
            ...topUp,
            status,
            updatedAt: new Date().toISOString(),
          }
        : topUp
    );

    setTopUps(updated);

    localStorage.setItem(
      "topUpHistory",
      JSON.stringify(updated)
    );

    // Update opened modal too
    if (selectedTopUp?.id === id) {
      setSelectedTopUp(
        updated.find((item) => item.id === id)
      );
    }
  };

  const filteredTopUps = useMemo(() => {
    const value = search.toLowerCase().trim();

    return topUps.filter((topUp) => {
      const matchesSearch =
        !value ||
        topUp.id?.toLowerCase().includes(value) ||
        topUp.phoneNumber?.toLowerCase().includes(value) ||
        topUp.operator?.toLowerCase().includes(value) ||
        topUp.method?.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" ||
        topUp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [topUps, search, statusFilter]);

  const stats = useMemo(() => {
    const amount = topUps.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    return {
      total: topUps.length,
      amount,
      completed: topUps.filter(
        (item) => item.status === "Completed"
      ).length,
      pending: topUps.filter(
        (item) => item.status === "Pending"
      ).length,
      failed: topUps.filter(
        (item) => item.status === "Failed"
      ).length,
    };
  }, [topUps]);

  const deleteTopUp = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this record?"
      )
    ) {
      return;
    }

    const updated = topUps.filter(
      (item) => item.id !== id
    );

    setTopUps(updated);

    localStorage.setItem(
      "topUpHistory",
      JSON.stringify(updated)
    );

    setSelectedTopUp(null);
  };

  const clearHistory = () => {
    if (
      !window.confirm(
        "Are you sure you want to clear all top-up history?"
      )
    ) {
      return;
    }

    setTopUps([]);

    localStorage.setItem(
      "topUpHistory",
      JSON.stringify([])
    );
  };

  const exportHistory = () => {
    if (!topUps.length) {
      alert("No top-up history available.");
      return;
    }

    const blob = new Blob(
      [JSON.stringify(topUps, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "topup-history.json";

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
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-5 text-white sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* Header */}
        <section className="mb-5 rounded-2xl border border-slate-800 bg-[#0d1915] p-5 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <Link
                href="/dashboard/top-2heup"
                className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
              >
                <ArrowLeft size={15} />
                Back to Top Up
              </Link>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-bold tracking-[0.15em] text-emerald-400">
                  PAYMENT HISTORY
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-bold">
                Top Up History
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage and monitor your mobile recharge transactions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadTopUpHistory}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <button
                onClick={exportHistory}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-emerald-400"
              >
                <Download size={15} />
                Export
              </button>

              <Link
                href="/dashboard/top-up"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
              >
                <Plus size={16} />
                New Top Up
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          <StatCard
            title="Total Top Ups"
            value={stats.total}
            icon={<Smartphone size={19} />}
            theme="emerald"
          />

          <StatCard
            title="Total Amount"
            value={`৳${stats.amount.toLocaleString("en-BD")}`}
            icon={<Wallet size={19} />}
            theme="blue"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 size={19} />}
            theme="cyan"
          />

          <StatCard
            title="Pending / Failed"
            value={`${stats.pending} / ${stats.failed}`}
            icon={<Clock3 size={19} />}
            theme="violet"
          />
        </section>

        {/* History */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1915] shadow-xl">

          {/* Section Header */}
          <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                <History size={20} />
              </div>

              <div>
                <h2 className="font-bold">
                  Recharge Records
                </h2>

                <p className="text-xs text-slate-500">
                  {filteredTopUps.length} records found
                </p>
              </div>
            </div>

            {topUps.length > 0 && (
              <button
                onClick={clearHistory}
                className="inline-flex items-center gap-2 self-start rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 size={15} />
                Clear History
              </button>
            )}
          </div>

          {/* Search */}
          <div className="border-b border-slate-800 bg-slate-950/20 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_200px]">

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search phone, operator or ID..."
                  className="w-full rounded-xl border border-slate-700 bg-[#07110d] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-[#07110d] py-3 pl-10 pr-4 text-sm text-slate-300 outline-none"
                >
                  <option value="All">
                    All Status
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Failed">
                    Failed
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Records */}
          {filteredTopUps.length > 0 ? (
            <div className="divide-y divide-slate-800">

              {filteredTopUps.map((topUp) => (
                <div
                  key={topUp.id}
                  className="p-4 transition hover:bg-white/[0.02] md:p-5"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                    {/* Left */}
                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Smartphone size={20} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-white">
                          {topUp.phoneNumber ||
                            "Mobile Top Up"}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {topUp.operator ||
                            "Mobile Operator"}{" "}
                          • {topUp.id}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={12} />
                            {topUp.date || "—"}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={12} />
                            {topUp.time || "—"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

                      <div className="xl:min-w-[110px] xl:text-right">
                        <p className="text-lg font-bold text-emerald-400">
                          +৳
                          {Number(
                            topUp.amount || 0
                          ).toLocaleString("en-BD")}
                        </p>

                        <p className="text-[11px] text-slate-500">
                          {topUp.method || "Top Up"}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex flex-wrap gap-1.5">
                        <StatusButton
                          active={
                            topUp.status ===
                            "Completed"
                          }
                          status="Completed"
                          onClick={() =>
                            updateStatus(
                              topUp.id,
                              "Completed"
                            )
                          }
                        />

                        <StatusButton
                          active={
                            topUp.status ===
                            "Pending"
                          }
                          status="Pending"
                          onClick={() =>
                            updateStatus(
                              topUp.id,
                              "Pending"
                            )
                          }
                        />

                        <StatusButton
                          active={
                            topUp.status ===
                            "Failed"
                          }
                          status="Failed"
                          onClick={() =>
                            updateStatus(
                              topUp.id,
                              "Failed"
                            )
                          }
                        />
                      </div>

                      {/* View */}
                      <button
                        onClick={() =>
                          setSelectedTopUp(topUp)
                        }
                        className="rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400"
                        title="View Details"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          deleteTopUp(topUp.id)
                        }
                        className="rounded-lg border border-rose-500/10 bg-rose-500/5 p-2.5 text-rose-400 hover:bg-rose-500/15"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Details Modal */}
      {selectedTopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-[#0d1915] shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-800 p-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-400">
                  TOP UP DETAILS
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Recharge Details
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedTopUp(null)
                }
                className="rounded-lg bg-slate-900 p-2 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">

              {/* Amount */}
              <div className="mb-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Smartphone size={23} />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Top Up Amount
                </p>

                <h3 className="mt-1 text-3xl font-bold text-emerald-400">
                  ৳
                  {Number(
                    selectedTopUp.amount || 0
                  ).toLocaleString("en-BD")}
                </h3>

                <div className="mt-3">
                  <StatusBadge
                    status={selectedTopUp.status}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3">

                <DetailItem
                  icon={<Hash size={15} />}
                  label="Transaction ID"
                  value={selectedTopUp.id}
                />

                <DetailItem
                  icon={<Smartphone size={15} />}
                  label="Mobile Number"
                  value={
                    selectedTopUp.phoneNumber ||
                    "—"
                  }
                />

                <DetailItem
                  icon={<Building2 size={15} />}
                  label="Operator"
                  value={
                    selectedTopUp.operator || "—"
                  }
                />

                <DetailItem
                  icon={<CreditCard size={15} />}
                  label="Payment Method"
                  value={
                    selectedTopUp.method || "—"
                  }
                />

                <DetailItem
                  icon={<CalendarDays size={15} />}
                  label="Date"
                  value={
                    selectedTopUp.date || "—"
                  }
                />

                <DetailItem
                  icon={<CircleDollarSign size={15} />}
                  label="Amount"
                  value={`৳${Number(
                    selectedTopUp.amount || 0
                  ).toLocaleString("en-BD")}`}
                />
              </div>

              {/* Change Status */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  Update Status
                </p>

                <div className="grid grid-cols-3 gap-2">

                  <StatusButton
                    active={
                      selectedTopUp.status ===
                      "Completed"
                    }
                    status="Completed"
                    full
                    onClick={() =>
                      updateStatus(
                        selectedTopUp.id,
                        "Completed"
                      )
                    }
                  />

                  <StatusButton
                    active={
                      selectedTopUp.status ===
                      "Pending"
                    }
                    status="Pending"
                    full
                    onClick={() =>
                      updateStatus(
                        selectedTopUp.id,
                        "Pending"
                      )
                    }
                  />

                  <StatusButton
                    active={
                      selectedTopUp.status ===
                      "Failed"
                    }
                    status="Failed"
                    full
                    onClick={() =>
                      updateStatus(
                        selectedTopUp.id,
                        "Failed"
                      )
                    }
                  />
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  deleteTopUp(selectedTopUp.id)
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 size={15} />
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  icon,
  theme,
}) {
  const themes = {
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    cyan:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    violet:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-4 shadow-lg">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-1.5 text-xl font-bold text-white">
            {value}
          </p>
        </div>

        <div
          className={`rounded-xl border p-2.5 ${themes[theme]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================
   STATUS BUTTON
========================= */

function StatusButton({
  status,
  active,
  onClick,
  full = false,
}) {
  const config = {
    Completed: {
      icon: <CheckCircle2 size={13} />,
      active:
        "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
      normal:
        "border-slate-700 bg-slate-900 text-slate-500 hover:border-emerald-500/30 hover:text-emerald-400",
    },

    Pending: {
      icon: <Clock3 size={13} />,
      active:
        "border-amber-500/40 bg-amber-500/15 text-amber-400",
      normal:
        "border-slate-700 bg-slate-900 text-slate-500 hover:border-amber-500/30 hover:text-amber-400",
    },

    Failed: {
      icon: <XCircle size={13} />,
      active:
        "border-rose-500/40 bg-rose-500/15 text-rose-400",
      normal:
        "border-slate-700 bg-slate-900 text-slate-500 hover:border-rose-500/30 hover:text-rose-400",
    },
  };

  const item = config[status];

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-2.5 py-2 text-[10px] font-bold transition ${
        full ? "w-full" : ""
      } ${
        active
          ? item.active
          : item.normal
      }`}
    >
      {item.icon}
      {status}
    </button>
  );
}

/* =========================
   STATUS BADGE
========================= */

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
    Completed: <CheckCircle2 size={13} />,
    Pending: <Clock3 size={13} />,
    Failed: <XCircle size={13} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold ${
        styles[status] || styles.Pending
      }`}
    >
      {icons[status] || <Clock3 size={13} />}
      {status || "Pending"}
    </span>
  );
}

/* =========================
   DETAIL ITEM
========================= */

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
      <div className="flex items-center gap-1.5 text-slate-500">
        {icon}

        <span className="text-[10px]">
          {label}
        </span>
      </div>

      <p className="mt-2 break-all text-xs font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* =========================
   EMPTY STATE
========================= */

function EmptyState({
  hasFilters,
  onReset,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
        <Smartphone size={27} />
      </div>

      <h3 className="mt-4 text-lg font-bold">
        No Top Up Records
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">
        {hasFilters
          ? "No records match your current filters."
          : "Your mobile top-up transactions will appear here."}
      </p>

      {hasFilters ? (
        <button
          onClick={onReset}
          className="mt-5 rounded-lg bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400"
        >
          Reset Filters
        </button>
      ) : (
        <Link
          href="/dashboard/top-up"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400"
        >
          <Plus size={15} />
          Make a Top Up
        </Link>
      )}
    </div>
  );
}