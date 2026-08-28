"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ReceiptText,
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
  Zap,
  Flame,
  Droplets,
  Wifi,
  Smartphone,
  ChevronRight,
  Hash,
  Building2,
  CreditCard,
  Filter,
  History,
  Download,
  TrendingUp,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";

export default function BillPaymentHistoryPage() {
  const [billPayments, setBillPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadBillHistory();
    setMounted(true);
  }, []);

  const loadBillHistory = () => {
    try {
      const savedBills = JSON.parse(
        localStorage.getItem("billPaymentHistory") || "[]"
      );

      setBillPayments(
        Array.isArray(savedBills) ? savedBills : []
      );
    } catch (error) {
      console.error("Failed to load bill payment history:", error);
      setBillPayments([]);
    }
  };

  const filteredPayments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return billPayments.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.id?.toLowerCase().includes(searchValue) ||
        item.provider?.toLowerCase().includes(searchValue) ||
        item.category?.toLowerCase().includes(searchValue) ||
        item.accountNumber
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    billPayments,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const stats = useMemo(() => {
    const totalAmount = billPayments.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );

    const completedAmount = billPayments
      .filter((item) => item.status === "Completed")
      .reduce(
        (total, item) =>
          total + Number(item.amount || 0),
        0
      );

    const completed = billPayments.filter(
      (item) => item.status === "Completed"
    ).length;

    const pending = billPayments.filter(
      (item) => item.status === "Pending"
    ).length;

    return {
      total: billPayments.length,
      totalAmount,
      completedAmount,
      completed,
      pending,
    };
  }, [billPayments]);

  const deletePayment = (id) => {
    const updatedPayments = billPayments.filter(
      (item) => item.id !== id
    );

    setBillPayments(updatedPayments);

    localStorage.setItem(
      "billPaymentHistory",
      JSON.stringify(updatedPayments)
    );

    setSelectedPayment(null);
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all bill payment history?"
    );

    if (!confirmed) return;

    setBillPayments([]);
    localStorage.setItem(
      "billPaymentHistory",
      "[]"
    );

    setSelectedPayment(null);
  };

  const downloadHistory = () => {
    if (!billPayments.length) {
      alert("No payment history available.");
      return;
    }

    const data = JSON.stringify(
      billPayments,
      null,
      2
    );

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "bill-payment-history.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07110d]" />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white sm:px-6 md:px-8 lg:px-10 xl:px-14">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-180px] top-[-180px] h-[550px] w-[550px] rounded-full bg-amber-500/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1750px]">
        {/* Header */}
        <section className="mb-10 rounded-[32px] border border-slate-800 bg-[#0b1612]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8 xl:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/dashboard/bill-payment"
                className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-300 shadow-lg shadow-black/10 transition hover:-translate-x-1 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
              >
                <ArrowLeft size={18} />
                Back to Bill Payment
              </Link>

              <div className="mb-4 flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.9)]" />

                <p className="text-sm font-bold tracking-[0.2em] text-amber-400">
                  BANKING ACTIVITY
                </p>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Bill Payment History
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                Review all your completed utility
                payments, monitor recent activity
                and manage your bill payment records
                securely.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={loadBillHistory}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <button
                onClick={downloadHistory}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                <Download size={18} />
                Export
              </button>

              <Link
                href="/dashboard/bill-payment"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <ReceiptText size={19} />
                Pay New Bill
              </Link>
            </div>
          </div>
        </section>

        {/* Large Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Payments"
            value={stats.total}
            subtitle="All bill transactions"
            icon={<ReceiptText size={25} />}
            theme="amber"
          />

          <StatCard
            title="Total Amount Paid"
            value={`৳${stats.totalAmount.toLocaleString()}`}
            subtitle="Across all payments"
            icon={<Wallet size={25} />}
            theme="emerald"
          />

          <StatCard
            title="Successful Payments"
            value={stats.completed}
            subtitle="Completed transactions"
            icon={<CheckCircle2 size={25} />}
            theme="blue"
          />

          <StatCard
            title="Pending Payments"
            value={stats.pending}
            subtitle="Awaiting processing"
            icon={<Clock3 size={25} />}
            theme="violet"
          />
        </section>

        {/* Activity Summary */}
        <section className="mb-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-[#0d1915]/90 p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
                <TrendingUp size={25} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Completed Amount
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  ৳
                  {stats.completedAmount.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#0d1915]/90 p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-amber-500/10 p-4 text-amber-400">
                <CircleDollarSign size={25} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Average Payment
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  ৳
                  {stats.total
                    ? Math.round(
                        stats.totalAmount /
                          stats.total
                      ).toLocaleString()
                    : 0}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6 md:p-7">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
                <ShieldCheck size={25} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Payment Security
                </p>

                <h3 className="mt-1 text-lg font-bold text-emerald-400">
                  Fully Protected
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="overflow-hidden rounded-[32px] border border-slate-800 bg-[#0d1915]/95 shadow-2xl shadow-black/20">
          {/* Section Header */}
          <div className="border-b border-slate-800 p-6 md:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                    <History size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold md:text-2xl">
                      Payment Records
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Complete history of your bill
                      payments
                    </p>
                  </div>
                </div>
              </div>

              {billPayments.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="inline-flex items-center gap-2 self-start rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20"
                >
                  <Trash2 size={17} />
                  Clear All History
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="border-b border-slate-800 bg-slate-950/30 p-6 md:p-8">
            <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr_1fr]">
              {/* Search */}
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by provider, account number or transaction ID..."
                  className="w-full rounded-2xl border border-slate-700 bg-[#07110d] py-4 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <Filter
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(
                      e.target.value
                    )
                  }
                  className="w-full appearance-none rounded-2xl border border-slate-700 bg-[#07110d] py-4 pl-11 pr-5 text-sm text-slate-300 outline-none transition focus:border-amber-500/50"
                >
                  <option value="All">
                    All Categories
                  </option>

                  <option value="Electricity">
                    Electricity
                  </option>

                  <option value="Gas">
                    Gas
                  </option>

                  <option value="Water">
                    Water
                  </option>

                  <option value="Internet">
                    Internet
                  </option>

                  <option value="Mobile Postpaid">
                    Mobile Postpaid
                  </option>
                </select>
              </div>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-700 bg-[#07110d] px-5 py-4 text-sm text-slate-300 outline-none transition focus:border-amber-500/50"
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

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-200">
                  {filteredPayments.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-200">
                  {billPayments.length}
                </span>{" "}
                payment records
              </p>

              {(search ||
                statusFilter !== "All" ||
                categoryFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setCategoryFilter("All");
                  }}
                  className="text-sm font-semibold text-amber-400 hover:text-amber-300"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          {filteredPayments.length > 0 ? (
            <>
              <div className="hidden overflow-x-auto xl:block">
                <table className="w-full min-w-[1200px] text-left">
                  <thead className="border-b border-slate-800 bg-slate-950/60">
                    <tr>
                      <TableHeader>Bill Details</TableHeader>
                      <TableHeader>
                        Provider
                      </TableHeader>
                      <TableHeader>
                        Customer Account
                      </TableHeader>
                      <TableHeader>
                        Payment Amount
                      </TableHeader>
                      <TableHeader>
                        Date & Time
                      </TableHeader>
                      <TableHeader>
                        Status
                      </TableHeader>

                      <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800">
                    {filteredPayments.map(
                      (item) => {
                        const CategoryIcon =
                          getCategoryIcon(
                            item.category
                          );

                        return (
                          <tr
                            key={item.id}
                            className="group transition hover:bg-white/[0.025]"
                          >
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                                  <CategoryIcon
                                    size={22}
                                  />
                                </div>

                                <div>
                                  <p className="font-bold text-white">
                                    {item.category}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    {item.id}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-slate-800 p-2.5 text-slate-400">
                                  <Building2
                                    size={17}
                                  />
                                </div>

                                <span className="text-sm font-semibold text-slate-300">
                                  {item.provider}
                                </span>
                              </div>
                            </td>

                            <td className="px-8 py-6">
                              <p className="font-mono text-sm font-medium text-slate-300">
                                {item.accountNumber}
                              </p>
                            </td>

                            <td className="px-8 py-6">
                              <p className="text-lg font-bold text-white">
                                ৳
                                {Number(
                                  item.amount || 0
                                ).toLocaleString()}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Bill payment
                              </p>
                            </td>

                            <td className="px-8 py-6">
                              <p className="text-sm font-medium text-slate-300">
                                {item.date || "—"}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {item.time || "—"}
                              </p>
                            </td>

                            <td className="px-8 py-6">
                              <StatusBadge
                                status={item.status}
                              />
                            </td>

                            <td className="px-8 py-6">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() =>
                                    setSelectedPayment(
                                      item
                                    )
                                  }
                                  className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-400 transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                                >
                                  <Eye size={18} />
                                </button>

                                <button
                                  onClick={() =>
                                    deletePayment(
                                      item.id
                                    )
                                  }
                                  className="rounded-xl border border-rose-500/10 bg-rose-500/5 p-3 text-rose-400 transition hover:bg-rose-500/15"
                                >
                                  <Trash2
                                    size={18}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Cards */}
              <div className="divide-y divide-slate-800 xl:hidden">
                {filteredPayments.map((item) => {
                  const CategoryIcon =
                    getCategoryIcon(
                      item.category
                    );

                  return (
                    <div
                      key={item.id}
                      className="p-6 md:p-7"
                    >
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                            <CategoryIcon
                              size={24}
                            />
                          </div>

                          <div>
                            <p className="text-lg font-bold">
                              {item.category}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {item.provider}
                            </p>

                            <p className="mt-2 text-xs text-slate-600">
                              {item.id}
                            </p>
                          </div>
                        </div>

                        <StatusBadge
                          status={item.status}
                        />
                      </div>

                      <div className="mt-7 grid grid-cols-1 gap-5 border-y border-slate-800 py-6 sm:grid-cols-3">
                        <MobileInfo
                          label="Account Number"
                          value={item.accountNumber}
                        />

                        <MobileInfo
                          label="Amount"
                          value={`৳${Number(
                            item.amount || 0
                          ).toLocaleString()}`}
                        />

                        <MobileInfo
                          label="Payment Date"
                          value={
                            item.date || "—"
                          }
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                          {item.time || "—"}
                        </p>

                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              setSelectedPayment(
                                item
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2.5 text-sm font-bold text-amber-400 transition hover:bg-amber-500/20"
                          >
                            <Eye size={17} />
                            Details
                          </button>

                          <button
                            onClick={() =>
                              deletePayment(
                                item.id
                              )
                            }
                            className="rounded-xl bg-rose-500/10 p-2.5 text-rose-400 transition hover:bg-rose-500/20"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <EmptyState
              hasFilters={
                search ||
                statusFilter !== "All" ||
                categoryFilter !== "All"
              }
              onReset={() => {
                setSearch("");
                setStatusFilter("All");
                setCategoryFilter("All");
              }}
            />
          )}
        </section>
      </div>

      {/* Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-slate-700 bg-[#0d1915] shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#0d1915]/95 p-6 backdrop-blur-xl md:p-7">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-amber-400">
                  TRANSACTION DETAILS
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Bill Payment Receipt
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedPayment(null)
                }
                className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Amount */}
              <div className="mb-7 rounded-3xl border border-amber-500/15 bg-amber-500/[0.05] p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-amber-500/10 p-4 text-amber-400">
                      <ReceiptText
                        size={28}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Payment Amount
                      </p>

                      <h3 className="mt-1 text-3xl font-bold text-white">
                        ৳
                        {Number(
                          selectedPayment.amount ||
                            0
                        ).toLocaleString()}
                      </h3>
                    </div>
                  </div>

                  <StatusBadge
                    status={
                      selectedPayment.status
                    }
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow
                  icon={<Hash size={18} />}
                  label="Transaction ID"
                  value={selectedPayment.id}
                />

                <DetailRow
                  icon={
                    <ReceiptText size={18} />
                  }
                  label="Bill Category"
                  value={
                    selectedPayment.category
                  }
                />

                <DetailRow
                  icon={
                    <Building2 size={18} />
                  }
                  label="Service Provider"
                  value={
                    selectedPayment.provider
                  }
                />

                <DetailRow
                  icon={
                    <CreditCard size={18} />
                  }
                  label="Account Number"
                  value={
                    selectedPayment.accountNumber
                  }
                />

                <DetailRow
                  icon={<Wallet size={18} />}
                  label="Payment Amount"
                  value={`৳${Number(
                    selectedPayment.amount || 0
                  ).toLocaleString()}`}
                />

                <DetailRow
                  icon={
                    <CalendarDays size={18} />
                  }
                  label="Payment Date"
                  value={
                    selectedPayment.date || "—"
                  }
                />

                <DetailRow
                  icon={<Clock3 size={18} />}
                  label="Payment Time"
                  value={
                    selectedPayment.time || "—"
                  }
                />

                <DetailRow
                  icon={
                    <CheckCircle2 size={18} />
                  }
                  label="Status"
                  value={
                    selectedPayment.status ||
                    "Pending"
                  }
                />
              </div>

              <button
                onClick={() =>
                  deletePayment(
                    selectedPayment.id
                  )
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 py-4 text-sm font-bold text-rose-400 transition hover:bg-rose-500/20"
              >
                <Trash2 size={18} />
                Delete This Payment Record
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- Components ---------------- */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  theme,
}) {
  const themes = {
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",

    violet:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0d1915]/95 p-6 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-slate-700 md:p-7">
      <div className="mb-7 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-2xl border p-3.5 ${themes[theme]}`}
        >
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white">
        {value}
      </h2>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-slate-500">
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
    Completed: <CheckCircle2 size={14} />,
    Pending: <Clock3 size={14} />,
    Failed: <XCircle size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold ${
        styles[status] || styles.Pending
      }`}
    >
      {icons[status] || (
        <Clock3 size={14} />
      )}

      {status || "Pending"}
    </span>
  );
}

function MobileInfo({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}

        <p className="text-xs font-medium">
          {label}
        </p>
      </div>

      <p className="mt-3 break-all text-sm font-bold text-slate-200">
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
    <div className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-[30px] border border-amber-500/15 bg-amber-500/10 text-amber-400">
        <History size={40} />
      </div>

      <h3 className="mt-7 text-2xl font-bold">
        No Payment Records Found
      </h3>

      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
        {hasFilters
          ? "No payment record matches your current search or selected filters."
          : "Your bill payment history will automatically appear here after you successfully complete a payment."}
      </p>

      {hasFilters ? (
        <button
          onClick={onReset}
          className="mt-7 rounded-xl border border-amber-500/20 bg-amber-500/10 px-6 py-3 text-sm font-bold text-amber-400 transition hover:bg-amber-500/20"
        >
          Reset Filters
        </button>
      ) : (
        <Link
          href="/dashboard/bill-payment"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
        >
          <ReceiptText size={18} />
          Pay Your First Bill
        </Link>
      )}
    </div>
  );
}

function getCategoryIcon(category) {
  const icons = {
    Electricity: Zap,
    Gas: Flame,
    Water: Droplets,
    Internet: Wifi,
    "Mobile Postpaid": Smartphone,
  };

  return icons[category] || ReceiptText;
}