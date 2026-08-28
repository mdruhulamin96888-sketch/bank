"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Plus,
  X,
  Pencil,
  RotateCcw,
  Check,
  Database,
} from "lucide-react";

const STORAGE_KEY = "bank_transactions";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export default function TransactionsClient({
  initialTransactions = [],
}) {
  const [transactions, setTransactions] = useState(
    initialTransactions
  );

  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    date: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    type: "debit",
    status: "Completed",
    method: "Bank Transfer",
    date: getToday(),
  });

  // =================================
  // Load Transactions From localStorage
  // =================================

  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem(
        STORAGE_KEY
      );

      if (savedTransactions) {
        const parsedTransactions = JSON.parse(
          savedTransactions
        );

        if (
          Array.isArray(parsedTransactions) &&
          parsedTransactions.length > 0
        ) {
          setTransactions(parsedTransactions);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load transactions:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // =================================
  // Save Transactions Automatically
  // =================================

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error(
        "Failed to save transactions:",
        error
      );
    }
  }, [transactions, isLoaded]);

  // =================================
  // Success Message
  // =================================

  const showSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // =================================
  // Safe Date Formatter
  // =================================

  const getTransactionDate = (transaction) => {
    if (transaction.rawDate) {
      const parsedDate = new Date(
        transaction.rawDate
      );

      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate
          .toISOString()
          .split("T")[0];
      }
    }

    if (transaction.date) {
      const parsedDate = new Date(transaction.date);

      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate
          .toISOString()
          .split("T")[0];
      }
    }

    return "";
  };

  // =================================
  // Transaction Filtering
  // =================================

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchValue =
        `${transaction.name || ""} ${
          transaction.category || ""
        } ${transaction.id || ""} ${
          transaction.method || ""
        }`.toLowerCase();

      const matchesSearch = searchValue.includes(
        searchTerm.toLowerCase()
      );

      const matchesType =
        filters.type === "all" ||
        transaction.type === filters.type;

      const matchesStatus =
        filters.status === "all" ||
        transaction.status === filters.status;

      const transactionDate =
        getTransactionDate(transaction);

      const matchesDate =
        !filters.date ||
        transactionDate === filters.date;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    transactions,
    searchTerm,
    filters,
  ]);

  // =================================
  // Form Change
  // =================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =================================
  // Reset Form
  // =================================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      amount: "",
      type: "debit",
      status: "Completed",
      method: "Bank Transfer",
      date: getToday(),
    });
  };

  // =================================
  // Create Transaction Object
  // =================================

  const createTransactionData = (
    existingTransaction = null
  ) => {
    const now = new Date();

    const selectedDate = new Date(
      `${formData.date}T${now
        .toTimeString()
        .slice(0, 8)}`
    );

    const formattedAmount =
      Number(formData.amount).toLocaleString(
        "en-BD"
      );

    return {
      id:
        existingTransaction?.id ||
        `TXN-${Date.now()}`,

      name: formData.name.trim(),

      category: formData.category.trim(),

      date: selectedDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),

      rawDate: selectedDate.toISOString(),

      time:
        existingTransaction?.time ||
        selectedDate.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

      amount:
        formData.type === "credit"
          ? `+৳${formattedAmount}`
          : `-৳${formattedAmount}`,

      type: formData.type,

      status: formData.status,

      method: formData.method,
    };
  };

  // =================================
  // Add Transaction
  // =================================

  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.amount ||
      !formData.date
    ) {
      alert(
        "Please fill in all required fields."
      );
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert(
        "Transaction amount must be greater than 0."
      );
      return;
    }

    const newTransaction =
      createTransactionData();

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    resetForm();

    setShowModal(false);

    showSuccess(
      "Transaction added successfully"
    );
  };

  // =================================
  // Edit Transaction
  // =================================

  const handleEditTransaction = (
    transaction
  ) => {
    setEditingId(transaction.id);

    const numericAmount = String(
      transaction.amount || ""
    ).replace(/[^\d]/g, "");

    setFormData({
      name: transaction.name || "",

      category: transaction.category || "",

      amount: numericAmount,

      type: transaction.type || "debit",

      status:
        transaction.status || "Completed",

      method:
        transaction.method || "Bank Transfer",

      date:
        getTransactionDate(transaction) ||
        getToday(),
    });

    setShowModal(true);
  };

  // =================================
  // Update Transaction
  // =================================

  const handleUpdateTransaction = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.amount ||
      !formData.date
    ) {
      alert(
        "Please fill in all required fields."
      );
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert(
        "Transaction amount must be greater than 0."
      );
      return;
    }

    setTransactions((prev) =>
      prev.map((transaction) => {
        if (transaction.id === editingId) {
          return createTransactionData(
            transaction
          );
        }

        return transaction;
      })
    );

    resetForm();

    setEditingId(null);

    setShowModal(false);

    showSuccess(
      "Transaction updated successfully"
    );
  };

  // =================================
  // Open Add Modal
  // =================================

  const openAddModal = () => {
    setEditingId(null);

    resetForm();

    setShowModal(true);
  };

  // =================================
  // Close Modal
  // =================================

  const closeModal = () => {
    setShowModal(false);

    setEditingId(null);

    resetForm();
  };

  // =================================
  // Submit Form
  // =================================

  const handleSubmit = (e) => {
    if (editingId) {
      handleUpdateTransaction(e);
    } else {
      handleAddTransaction(e);
    }
  };

  // =================================
  // Clear Filters
  // =================================

  const clearFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      date: "",
    });

    setSearchTerm("");
  };

  return (
    <>
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed right-5 top-5 z-[70] flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#10261b] px-5 py-4 shadow-2xl shadow-black/30">
          <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-400">
            <Check size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              Success
            </p>

            <p className="text-xs text-slate-400">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1915] shadow-2xl shadow-black/20">

        {/* Toolbar */}
        <div className="border-b border-slate-800 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-[#09130f] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>

            <div className="flex flex-wrap gap-3">

              {/* Add Transaction */}
              <button
                type="button"
                onClick={openAddModal}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-[#04110b] shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                <Plus size={17} />
                Add Transaction
              </button>

              {/* Filter */}
              <button
                type="button"
                onClick={() =>
                  setShowFilter((prev) => !prev)
                }
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-slate-800"
              >
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-5 rounded-2xl border border-slate-700/80 bg-[#09130f] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    Filter Transactions
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Find transactions by type,
                    status or date.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-xs font-semibold text-rose-400 transition hover:text-rose-300"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Type */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Transaction Type
                  </label>

                  <select
                    value={filters.type}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-[#0d1915] px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                  >
                    <option value="all">
                      All Transactions
                    </option>

                    <option value="credit">
                      Money In
                    </option>

                    <option value="debit">
                      Money Out
                    </option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Status
                  </label>

                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-[#0d1915] px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                  >
                    <option value="all">
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

                {/* Date */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-400">
                    Filter by Date
                  </label>

                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-[#0d1915] px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Transaction
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Method
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(
                  (transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-800/70 transition hover:bg-emerald-500/[0.025]"
                    >
                      {/* Transaction */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              transaction.type ===
                              "credit"
                                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                : "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                            }`}
                          >
                            {transaction.type ===
                            "credit" ? (
                              <ArrowDownLeft
                                size={19}
                              />
                            ) : (
                              <ArrowUpRight
                                size={19}
                              />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {transaction.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {transaction.id} •{" "}
                              {transaction.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5">
                        <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
                          <CalendarDays
                            size={14}
                            className="text-emerald-400"
                          />

                          {transaction.date}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {transaction.time}
                        </p>
                      </td>

                      {/* Method */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-400">
                          {transaction.method}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        {transaction.status ===
                          "Completed" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                            <CheckCircle2
                              size={14}
                            />
                            Completed
                          </span>
                        )}

                        {transaction.status ===
                          "Pending" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400">
                            <Clock3 size={14} />
                            Pending
                          </span>
                        )}

                        {transaction.status ===
                          "Failed" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400">
                            <XCircle size={14} />
                            Failed
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-5 text-right">
                        <span
                          className={`text-sm font-bold ${
                            transaction.type ===
                            "credit"
                              ? "text-emerald-400"
                              : "text-white"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleEditTransaction(
                              transaction
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-14 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-500">
                        <Database size={24} />
                      </div>

                      <p className="font-semibold text-slate-300">
                        No transactions found
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        Try changing your search or
                        filter settings.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                      >
                        Clear search and filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 px-6 py-5 sm:flex-row">
          <div>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-300">
                {filteredTransactions.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-300">
                {transactions.length}
              </span>{" "}
              transactions
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Your changes are automatically saved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            Auto saved
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#0d1915] p-6 shadow-2xl shadow-black/50">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wide text-emerald-400">
                  BANKING ACTIVITY
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  {editingId
                    ? "Edit Transaction"
                    : "Add Transaction"}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {editingId
                    ? "Update the transaction details below."
                    : "Add a new transaction to your account."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Salary Deposit"
                  className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Example: Income"
                  className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                />
              </div>

              {/* Amount and Type */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Transaction Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="debit">
                      Money Out
                    </option>

                    <option value="credit">
                      Money In
                    </option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                />
              </div>

              {/* Method */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Payment Method
                </label>

                <select
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                  <option value="Debit Card">
                    Debit Card
                  </option>

                  <option value="Credit Card">
                    Credit Card
                  </option>

                  <option value="Online Payment">
                    Online Payment
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="ATM">
                    ATM
                  </option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Transaction Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#09130f] px-4 py-3 text-white outline-none focus:border-emerald-500"
                >
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

              {/* Buttons */}
              <div className="flex gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-bold text-[#04110b] shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
                >
                  <Check size={17} />

                  {editingId
                    ? "Update Transaction"
                    : "Save Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}