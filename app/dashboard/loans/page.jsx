"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  X,
  Clock3,
  CheckCircle2,
  XCircle,
  FileText,
  CalendarDays,
  Banknote,
  User,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Car,
  Home,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Load loans
  const loadLoans = () => {
    try {
      const saved = localStorage.getItem("loanApplications");

      if (!saved) {
        setLoans([]);
        return;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setLoans(parsed);
      } else {
        setLoans([]);
      }
    } catch (error) {
      console.error("Failed to load loan applications:", error);
      setLoans([]);
    }
  };

  useEffect(() => {
    loadLoans();

    const handleStorage = () => {
      loadLoans();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Normalize different loan form structures
  const normalizeLoan = (loan) => {
    const applicant = loan?.applicant || {};
    const property = loan?.property || {};
    const loanInfo = loan?.loan || {};

    const loanType =
      loan.loanType ||
      loan.type ||
      loan.loan?.type ||
      "Loan Application";

    const name =
      loan.name ||
      loan.fullName ||
      applicant.fullName ||
      loan.userName ||
      "Unknown Applicant";

    const email =
      loan.email ||
      applicant.email ||
      "";

    const phone =
      loan.phone ||
      applicant.phone ||
      "";

    const amount =
      loan.amount ??
      loan.loanAmount ??
      loanInfo.amount ??
      0;

    const duration =
      loan.duration ||
      loan.tenure ||
      loan.loanTerm ||
      loan.loanTenure ||
      loanInfo.tenure ||
      "—";

    const purpose =
      loan.purpose ||
      loanInfo.purpose ||
      "Not provided";

    const appliedAt =
      loan.appliedAt ||
      loan.createdAt ||
      loan.submittedAt ||
      loan.appliedAtTime;

    return {
      ...loan,
      loanType,
      name,
      email,
      phone,
      amount,
      duration,
      purpose,
      appliedAt,
      property,
      applicant,
      loanInfo,
    };
  };

  const normalizedLoans = useMemo(() => {
    return loans.map(normalizeLoan);
  }, [loans]);

  // Search + filter
  const filteredLoans = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return normalizedLoans.filter((loan) => {
      const matchesSearch =
        !keyword ||
        String(loan.id || "").toLowerCase().includes(keyword) ||
        loan.loanType.toLowerCase().includes(keyword) ||
        loan.name.toLowerCase().includes(keyword) ||
        loan.email.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        String(loan.status || "Pending").toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [normalizedLoans, search, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: normalizedLoans.length,

      pending: normalizedLoans.filter(
        (loan) =>
          String(loan.status || "Pending").toLowerCase() === "pending"
      ).length,

      approved: normalizedLoans.filter(
        (loan) =>
          String(loan.status || "").toLowerCase() === "approved"
      ).length,

      rejected: normalizedLoans.filter(
        (loan) =>
          String(loan.status || "").toLowerCase() === "rejected"
      ).length,
    };
  }, [normalizedLoans]);

  // Format amount
  const formatAmount = (amount) => {
    if (!amount) return "৳0";

    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return String(date);
      }

      return parsedDate.toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  // Status UI
  const getStatus = (status) => {
    switch (String(status || "Pending").toLowerCase()) {
      case "approved":
        return {
          className:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
          icon: <CheckCircle2 size={14} />,
          label: "Approved",
        };

      case "rejected":
        return {
          className: "border-red-500/20 bg-red-500/10 text-red-400",
          icon: <XCircle size={14} />,
          label: "Rejected",
        };

      default:
        return {
          className:
            "border-amber-500/20 bg-amber-500/10 text-amber-400",
          icon: <Clock3 size={14} />,
          label: "Pending",
        };
    }
  };

  // Loan icon
  const getLoanIcon = (type) => {
    const value = String(type || "").toLowerCase();

    if (value.includes("home")) {
      return <Home size={18} />;
    }

    if (value.includes("car") || value.includes("auto")) {
      return <Car size={18} />;
    }

    if (value.includes("business")) {
      return <Building2 size={18} />;
    }

    return <BriefcaseBusiness size={18} />;
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30" />

              <span className="text-sm font-medium text-emerald-400">
                Loan Center
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              My Loan Applications
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Track all your submitted loan applications and their current
              status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            {/* Refresh */}
            <button
              onClick={loadLoans}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-700 hover:bg-slate-800"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            {/* Loan Management */}
            <Link
              href="/loan-management"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition hover:border-purple-400/40 hover:bg-purple-500/20"
            >
              <ShieldCheck size={17} />
              Loan Management
            </Link>

            {/* Apply */}
            <Link
              href="/loan/personal"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Apply for Loan
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Total"
            value={stats.total}
            icon={<FileText size={20} />}
            iconClass="bg-blue-500/10 text-blue-400"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock3 size={20} />}
            iconClass="bg-amber-500/10 text-amber-400"
          />

          <StatCard
            title="Approved"
            value={stats.approved}
            icon={<CheckCircle2 size={20} />}
            iconClass="bg-emerald-500/10 text-emerald-400"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={<XCircle size={20} />}
            iconClass="bg-red-500/10 text-red-400"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search application, applicant, email..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-10 text-sm text-slate-200 outline-none focus:border-emerald-500 lg:w-48"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications */}
        {filteredLoans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
              <FileText size={28} className="text-slate-500" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {loans.length === 0
                ? "No loan applications"
                : "No matching applications"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {loans.length === 0
                ? "You haven't submitted any loan application yet."
                : "Try changing your search or status filter."}
            </p>

            {loans.length === 0 && (
              <Link
                href="/loan/personal"
                className="mt-6 inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Start Application
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">

                <thead className="border-b border-slate-800 bg-slate-950/70">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Loan
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Applied
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {filteredLoans.map((loan) => {
                    const status = getStatus(loan.status);

                    return (
                      <tr
                        key={loan.id}
                        className="transition hover:bg-slate-800/30"
                      >

                        {/* Loan */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                              {getLoanIcon(loan.loanType)}
                            </div>

                            <div>
                              <p className="font-semibold text-white">
                                {loan.loanType}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {loan.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Applicant */}
                        <td className="px-6 py-5">
                          <p className="font-medium text-slate-200">
                            {loan.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {loan.email || "No email"}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-5 font-semibold text-slate-100">
                          {formatAmount(loan.amount)}
                        </td>

                        {/* Duration */}
                        <td className="px-6 py-5 text-sm text-slate-400">
                          {loan.duration}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                          >
                            {status.icon}
                            {status.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-slate-400">
                          {formatDate(loan.appliedAt)}
                        </td>

                        {/* Details */}
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => setSelectedLoan(loan)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
                          >
                            <Eye size={15} />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedLoan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLoan(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    {getLoanIcon(selectedLoan.loanType)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-emerald-400">
                      Loan Application
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {selectedLoan.loanType}
                    </h2>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Application ID: {selectedLoan.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedLoan(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Details */}
            <div className="grid gap-4 p-6 sm:grid-cols-2">

              <Detail
                icon={<User size={16} />}
                label="Name"
                value={selectedLoan.name}
              />

              <Detail
                icon={<Mail size={16} />}
                label="Email"
                value={selectedLoan.email}
              />

              <Detail
                icon={<Phone size={16} />}
                label="Phone"
                value={selectedLoan.phone}
              />

              <Detail
                icon={<Banknote size={16} />}
                label="Loan Amount"
                value={formatAmount(selectedLoan.amount)}
              />

              <Detail
                icon={<CalendarDays size={16} />}
                label="Duration"
                value={selectedLoan.duration}
              />

              <Detail
                icon={<Clock3 size={16} />}
                label="Status"
                value={selectedLoan.status || "Pending"}
              />

              <Detail
                icon={<CalendarDays size={16} />}
                label="Applied Date"
                value={formatDate(selectedLoan.appliedAt)}
              />

              <div className="sm:col-span-2">
                <Detail
                  icon={<FileText size={16} />}
                  label="Purpose"
                  value={selectedLoan.purpose}
                />
              </div>

              {/* Home Loan Property */}
              {selectedLoan.property?.location && (
                <Detail
                  icon={<Home size={16} />}
                  label="Property Location"
                  value={selectedLoan.property.location}
                />
              )}

              {selectedLoan.property?.propertyType && (
                <Detail
                  icon={<Home size={16} />}
                  label="Property Type"
                  value={selectedLoan.property.propertyType}
                />
              )}

              {/* Home Loan Employment */}
              {selectedLoan.applicant?.employmentType && (
                <Detail
                  icon={<BriefcaseBusiness size={16} />}
                  label="Employment Type"
                  value={selectedLoan.applicant.employmentType}
                />
              )}

              {/* Business fields */}
              {selectedLoan.businessName && (
                <Detail
                  icon={<Building2 size={16} />}
                  label="Business Name"
                  value={selectedLoan.businessName}
                />
              )}

              {selectedLoan.businessType && (
                <Detail
                  icon={<BriefcaseBusiness size={16} />}
                  label="Business Type"
                  value={selectedLoan.businessType}
                />
              )}

              {selectedLoan.businessLocation && (
                <Detail
                  icon={<Building2 size={16} />}
                  label="Business Location"
                  value={selectedLoan.businessLocation}
                />
              )}

              {selectedLoan.annualRevenue && (
                <Detail
                  icon={<Banknote size={16} />}
                  label="Annual Revenue"
                  value={formatAmount(selectedLoan.annualRevenue)}
                />
              )}

              {selectedLoan.yearsInBusiness !== undefined && (
                <Detail
                  icon={<CalendarDays size={16} />}
                  label="Years in Business"
                  value={`${selectedLoan.yearsInBusiness} years`}
                />
              )}

              {/* Other fields */}
              {selectedLoan.address && (
                <div className="sm:col-span-2">
                  <Detail
                    icon={<FileText size={16} />}
                    label="Address"
                    value={selectedLoan.address}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 p-6">
              <button
                onClick={() => setSelectedLoan(null)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   Stat Card
========================================================= */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Detail
========================================================= */

function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        {icon}
        {label}
      </div>

      <p className="mt-2 break-words text-sm font-medium text-slate-200">
        {value || "—"}
      </p>
    </div>
  );
}