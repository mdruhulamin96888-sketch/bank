"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Search,
  CalendarDays,
  Printer,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  Eye,
  X,
  CheckCircle2,
  Clock3,
  XCircle,
  Filter,
  Building2,
  Hash,
  CreditCard,
  Smartphone,
  ArrowRightLeft,
} from "lucide-react";

const defaultTransactions = [
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
    createdAt: "2026-08-22T10:32:00",
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
    createdAt: "2026-08-21T18:45:00",
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
    createdAt: "2026-08-20T14:18:00",
  },
];

export default function StatementPage() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadStatement();
    setMounted(true);
  }, []);

  const loadStatement = () => {
    try {
      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

      const savedTransfers = JSON.parse(
        localStorage.getItem("transferHistory") || "[]"
      );

      const savedTopUps = JSON.parse(
        localStorage.getItem("topUpHistory") || "[]"
      );

      const savedStatusUpdates = JSON.parse(
        localStorage.getItem(
          "statementStatusUpdates"
        ) || "{}"
      );

      const formattedTransfers = savedTransfers.map(
        (item, index) => ({
          id:
            item.id ||
            `TRANSFER-${item.createdAt || index}`,
          name:
            item.recipientName ||
            item.name ||
            "Bank Transfer",
          category: "Transfer",
          date: item.date || "—",
          time: item.time || "—",
          amount: `-৳${Number(
            item.amount || 0
          ).toLocaleString()}`,
          type: "debit",
          status: item.status || "Completed",
          method: "Bank Transfer",
          createdAt:
            item.createdAt ||
            new Date().toISOString(),
        })
      );

      const formattedTopUps = savedTopUps.map(
        (item, index) => ({
          id:
            item.id ||
            `TOPUP-${item.createdAt || index}`,
          name: `Mobile Top Up - ${
            item.mobileNumber || ""
          }`,
          category: "Mobile Top Up",
          date: item.date || "—",
          time: item.time || "—",
          amount: `-৳${Number(
            item.amount || 0
          ).toLocaleString()}`,
          type: "debit",
          status: item.status || "Completed",
          method:
            item.operator || "Mobile Recharge",
          createdAt:
            item.createdAt ||
            new Date().toISOString(),
        })
      );

      const rawTransactions = [
        ...savedTransactions,
        ...formattedTransfers,
        ...formattedTopUps,
        ...defaultTransactions,
      ];

      const allTransactions = rawTransactions.map(
        (transaction) => ({
          ...transaction,
          status:
            savedStatusUpdates[
              transaction.id
            ] ||
            transaction.status ||
            "Pending",
        })
      );

      const uniqueTransactions =
        allTransactions.filter(
          (item, index, array) =>
            index ===
            array.findIndex(
              (transaction) =>
                transaction.id === item.id
            )
        );

      uniqueTransactions.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

      setTransactions(uniqueTransactions);
    } catch (error) {
      console.error(
        "Failed to load statement:",
        error
      );

      setTransactions(defaultTransactions);
    }
  };

  const updateTransactionStatus = (
    transactionId,
    newStatus
  ) => {
    const updatedTransactions =
      transactions.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              status: newStatus,
            }
          : transaction
      );

    setTransactions(updatedTransactions);

    setSelectedTransaction((current) =>
      current
        ? {
            ...current,
            status: newStatus,
          }
        : null
    );

    try {
      const previousStatusUpdates = JSON.parse(
        localStorage.getItem(
          "statementStatusUpdates"
        ) || "{}"
      );

      const updatedStatusUpdates = {
        ...previousStatusUpdates,
        [transactionId]: newStatus,
      };

      localStorage.setItem(
        "statementStatusUpdates",
        JSON.stringify(updatedStatusUpdates)
      );

      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );

      const updatedSavedTransactions =
        savedTransactions.map(
          (transaction) =>
            transaction.id === transactionId
              ? {
                  ...transaction,
                  status: newStatus,
                }
              : transaction
        );

      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedSavedTransactions)
      );

      const savedTransfers = JSON.parse(
        localStorage.getItem(
          "transferHistory"
        ) || "[]"
      );

      const updatedTransfers =
        savedTransfers.map((transaction) =>
          transaction.id === transactionId
            ? {
                ...transaction,
                status: newStatus,
              }
            : transaction
        );

      localStorage.setItem(
        "transferHistory",
        JSON.stringify(updatedTransfers)
      );

      const savedTopUps = JSON.parse(
        localStorage.getItem(
          "topUpHistory"
        ) || "[]"
      );

      const updatedTopUps =
        savedTopUps.map((transaction) =>
          transaction.id === transactionId
            ? {
                ...transaction,
                status: newStatus,
              }
            : transaction
        );

      localStorage.setItem(
        "topUpHistory",
        JSON.stringify(updatedTopUps)
      );
    } catch (error) {
      console.error(
        "Failed to update transaction status:",
        error
      );
    }
  };

  const getNumericAmount = (transaction) => {
    if (
      typeof transaction.numericAmount ===
      "number"
    ) {
      return transaction.numericAmount;
    }

    return Number(
      String(transaction.amount || "")
        .replace(/[^\d.-]/g, "")
        .replace(",", "")
    );
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        transaction.name
          ?.toLowerCase()
          .includes(searchValue) ||
        transaction.category
          ?.toLowerCase()
          .includes(searchValue) ||
        transaction.method
          ?.toLowerCase()
          .includes(searchValue) ||
        transaction.id
          ?.toLowerCase()
          .includes(searchValue);

      const matchesType =
        typeFilter === "All" ||
        transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        transaction.status === statusFilter;

      let matchesDate = true;

      if (
        startDate &&
        transaction.createdAt
      ) {
        matchesDate =
          matchesDate &&
          new Date(
            transaction.createdAt
          ) >= new Date(startDate);
      }

      if (
        endDate &&
        transaction.createdAt
      ) {
        const end = new Date(endDate);

        end.setHours(
          23,
          59,
          59,
          999
        );

        matchesDate =
          matchesDate &&
          new Date(
            transaction.createdAt
          ) <= end;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    transactions,
    search,
    typeFilter,
    statusFilter,
    startDate,
    endDate,
  ]);

  const statementStats = useMemo(() => {
    const moneyIn = filteredTransactions
      .filter(
        (item) =>
          item.type === "credit" &&
          item.status === "Completed"
      )
      .reduce(
        (total, item) =>
          total + getNumericAmount(item),
        0
      );

    const moneyOut = filteredTransactions
      .filter(
        (item) =>
          item.type === "debit" &&
          item.status === "Completed"
      )
      .reduce(
        (total, item) =>
          total + getNumericAmount(item),
        0
      );

    return {
      moneyIn,
      moneyOut,
      transactions:
        filteredTransactions.length,
    };
  }, [filteredTransactions]);

  const handlePrint = () => {
    window.print();
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("All");
    setStartDate("");
    setEndDate("");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#07110d]" />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] px-4 py-6 text-white md:px-8 lg:px-10">
      <div className="pointer-events-none fixed inset-0 print:hidden">
        <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="absolute bottom-[-150px] right-[-120px] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between print:hidden">
          <div>
            <Link
              href="/dashboard"
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:-translate-x-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

              <p className="text-sm font-semibold tracking-widest text-emerald-400">
                ACCOUNT RECORDS
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Account Statement
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Review your complete account activity,
              including transfers, payments, deposits and
              mobile top ups.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadStatement}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              <Printer size={18} />
              Print Statement
            </button>
          </div>
        </div>

        {/* Statement Header */}
        <section className="mb-6 overflow-hidden rounded-3xl border border-emerald-500/15 bg-[#0d1915] shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-6 border-b border-slate-800 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <Building2 size={28} />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-emerald-400">
                  GREENFIELD BANK
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Personal Account Statement
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Generated account activity report
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 px-5 py-4">
              <p className="text-xs text-slate-500">
                Statement Generated
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {new Date().toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatementInfo
              label="Account Holder"
              value="Account Owner"
            />

            <StatementInfo
              label="Account Number"
              value="**** **** 5678"
            />

            <StatementInfo
              label="Account Type"
              value="Personal Banking"
            />

            <StatementInfo
              label="Currency"
              value="Bangladeshi Taka (BDT)"
            />
          </div>
        </section>

        {/* Summary */}
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Current Balance"
            value="৳128,450"
            icon={<Wallet size={20} />}
            type="emerald"
          />

          <SummaryCard
            label="Money In"
            value={`৳${statementStats.moneyIn.toLocaleString()}`}
            icon={<ArrowDownLeft size={20} />}
            type="blue"
          />

          <SummaryCard
            label="Money Out"
            value={`৳${statementStats.moneyOut.toLocaleString()}`}
            icon={<ArrowUpRight size={20} />}
            type="rose"
          />

          <SummaryCard
            label="Transactions"
            value={statementStats.transactions}
            icon={<FileText size={20} />}
            type="violet"
          />
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-3xl border border-slate-800 bg-[#0d1915] p-5 print:hidden md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
              <Filter size={19} />
            </div>

            <div>
              <h2 className="font-semibold">
                Filter Statement
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search, select transaction type or status
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search transactions..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-500/50"
              />
            </div>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500/50"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500/50"
            />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500/50"
            >
              <option value="All">
                All Transactions
              </option>

              <option value="credit">
                Money In
              </option>

              <option value="debit">
                Money Out
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-emerald-500/50"
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

          {(search ||
            typeFilter !== "All" ||
            statusFilter !== "All" ||
            startDate ||
            endDate) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-xs font-semibold text-rose-400 transition hover:text-rose-300"
            >
              Clear all filters
            </button>
          )}
        </section>

        {/* Transactions */}
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0d1915] shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <h2 className="text-lg font-bold">
                Transaction Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing{" "}
                {filteredTransactions.length}{" "}
                transaction
                {filteredTransactions.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={17} />
              <span>
                Latest account activity
              </span>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-950/40">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Transaction
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredTransactions.map(
                  (transaction) => (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <TransactionIcon
                            transaction={transaction}
                          />

                          <div>
                            <p className="font-semibold text-slate-200">
                              {transaction.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {transaction.method}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400">
                          {transaction.category}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-300">
                          {transaction.date}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {transaction.time}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p
                          className={`font-bold ${
                            transaction.type ===
                            "credit"
                              ? "text-emerald-400"
                              : "text-white"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={transaction.status}
                        />
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() =>
                            setSelectedTransaction(
                              transaction
                            )
                          }
                          className="rounded-lg bg-white/5 p-2.5 text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-800 lg:hidden">
            {filteredTransactions.map(
              (transaction) => (
                <button
                  key={transaction.id}
                  onClick={() =>
                    setSelectedTransaction(
                      transaction
                    )
                  }
                  className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/[0.02]"
                >
                  <TransactionIcon
                    transaction={transaction}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {transaction.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {transaction.date} ·{" "}
                      {transaction.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.type ===
                        "credit"
                          ? "text-emerald-400"
                          : "text-white"
                      }`}
                    >
                      {transaction.amount}
                    </p>

                    <div className="mt-1">
                      <StatusBadge
                        status={transaction.status}
                      />
                    </div>
                  </div>
                </button>
              )
            )}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                <FileText size={34} />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No Transactions Found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                No transactions match your current
                statement filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="border-t border-slate-800 bg-slate-950/30 px-6 py-5">
            <p className="text-xs leading-6 text-slate-500">
              This statement is generated from your
              account transaction records. Please contact
              customer support if you notice any
              unauthorized activity.
            </p>
          </div>
        </section>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-[#0d1915] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <p className="text-xs font-semibold tracking-widest text-emerald-400">
                  TRANSACTION DETAILS
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Statement Record
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedTransaction(null)
                }
                className="rounded-xl bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <div className="flex items-center gap-4">
                  <TransactionIcon
                    transaction={
                      selectedTransaction
                    }
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">
                      Transaction Amount
                    </p>

                    <p
                      className={`mt-1 text-2xl font-bold ${
                        selectedTransaction.type ===
                        "credit"
                          ? "text-emerald-400"
                          : "text-white"
                      }`}
                    >
                      {
                        selectedTransaction.amount
                      }
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      selectedTransaction.status
                    }
                  />
                </div>

                {/* Status Controls */}
                <div className="mt-5 border-t border-slate-800 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Change Transaction Status
                  </p>

                  <div className="grid gap-2 sm:grid-cols-3">
                    <button
                      onClick={() =>
                        updateTransactionStatus(
                          selectedTransaction.id,
                          "Completed"
                        )
                      }
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                        selectedTransaction.status ===
                        "Completed"
                          ? "border-emerald-400 bg-emerald-500 text-slate-950"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      }`}
                    >
                      <CheckCircle2 size={15} />
                      Completed
                    </button>

                    <button
                      onClick={() =>
                        updateTransactionStatus(
                          selectedTransaction.id,
                          "Pending"
                        )
                      }
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                        selectedTransaction.status ===
                        "Pending"
                          ? "border-amber-400 bg-amber-500 text-slate-950"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                      }`}
                    >
                      <Clock3 size={15} />
                      Pending
                    </button>

                    <button
                      onClick={() =>
                        updateTransactionStatus(
                          selectedTransaction.id,
                          "Failed"
                        )
                      }
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                        selectedTransaction.status ===
                        "Failed"
                          ? "border-rose-400 bg-rose-500 text-white"
                          : "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      }`}
                    >
                      <XCircle size={15} />
                      Failed
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <DetailRow
                  icon={<Hash size={17} />}
                  label="Transaction ID"
                  value={selectedTransaction.id}
                />

                <DetailRow
                  icon={<FileText size={17} />}
                  label="Transaction Name"
                  value={selectedTransaction.name}
                />

                <DetailRow
                  icon={
                    <ArrowRightLeft size={17} />
                  }
                  label="Category"
                  value={
                    selectedTransaction.category
                  }
                />

                <DetailRow
                  icon={<CreditCard size={17} />}
                  label="Payment Method"
                  value={
                    selectedTransaction.method
                  }
                />

                <DetailRow
                  icon={
                    <CalendarDays size={17} />
                  }
                  label="Date & Time"
                  value={`${selectedTransaction.date} at ${selectedTransaction.time}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({
  label,
  value,
  icon,
  type,
}) {
  const colors = {
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    rose:
      "border-rose-500/20 bg-rose-500/10 text-rose-400",
    violet:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1915] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">
          {label}
        </p>

        <div
          className={`rounded-xl border p-2.5 ${colors[type]}`}
        >
          {icon}
        </div>
      </div>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}

function StatementInfo({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function TransactionIcon({
  transaction,
}) {
  const category =
    transaction.category?.toLowerCase() || "";

  if (
    category.includes("top up") ||
    category.includes("mobile")
  ) {
    return (
      <div className="rounded-xl bg-red-500/10 p-3 text-red-400">
        <Smartphone size={20} />
      </div>
    );
  }

  if (category.includes("transfer")) {
    return (
      <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
        <ArrowRightLeft size={20} />
      </div>
    );
  }

  if (transaction.type === "credit") {
    return (
      <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
        <ArrowDownLeft size={20} />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-rose-500/10 p-3 text-rose-400">
      <ArrowUpRight size={20} />
    </div>
  );
}

function StatusBadge({
  status,
}) {
  const styles = {
    Completed:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

    Pending:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",

    Failed:
      "border-rose-500/20 bg-rose-500/10 text-rose-400",
  };

  const icons = {
    Completed: (
      <CheckCircle2 size={13} />
    ),

    Pending: (
      <Clock3 size={13} />
    ),

    Failed: (
      <XCircle size={13} />
    ),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        styles[status] || styles.Pending
      }`}
    >
      {icons[status] || (
        <Clock3 size={13} />
      )}

      {status || "Pending"}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-slate-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}