"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Plus,
  User,
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Car,
  Home,
  BriefcaseBusiness,
  X,
  WalletCards,
  TrendingUp,
  FileCheck2,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [showLoanTypes, setShowLoanTypes] = useState(false);

  // ==============================
  // Load saved loans
  // ==============================
  const loadLoans = () => {
    try {
      const savedLoans = JSON.parse(
        localStorage.getItem("loanApplications") || "[]"
      );

      setLoans(Array.isArray(savedLoans) ? savedLoans : []);
    } catch (error) {
      console.error("Failed to load loan applications:", error);
      setLoans([]);
    }
  };

  useEffect(() => {
    loadLoans();

    const handleStorage = (event) => {
      if (event.key === "loanApplications") {
        loadLoans();
      }
    };

    const handleFocus = () => {
      loadLoans();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowLoanTypes(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ==============================
  // Statistics
  // ==============================
  const statistics = useMemo(() => {
    const total = loans.length;

    const pending = loans.filter(
      (loan) => loan.status === "Pending"
    ).length;

    const approved = loans.filter(
      (loan) => loan.status === "Approved"
    ).length;

    const rejected = loans.filter(
      (loan) => loan.status === "Rejected"
    ).length;

    const totalRequested = loans.reduce(
      (sum, loan) => sum + Number(loan.amount || 0),
      0
    );

    return {
      total,
      pending,
      approved,
      rejected,
      totalRequested,
    };
  }, [loans]);

  // ==============================
  // Status Style
  // ==============================
  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return {
        wrapper:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        icon: <CheckCircle2 size={15} />,
      };
    }

    if (status === "Rejected") {
      return {
        wrapper: "border-red-500/20 bg-red-500/10 text-red-400",
        icon: <XCircle size={15} />,
      };
    }

    return {
      wrapper: "border-amber-500/20 bg-amber-500/10 text-amber-400",
      icon: <Clock3 size={15} />,
    };
  };

  // ==============================
  // Loan Icon
  // ==============================
  const getLoanIcon = (type) => {
    const loanType = String(type || "").toLowerCase();

    if (loanType.includes("car")) {
      return <Car size={23} className="text-blue-400" />;
    }

    if (loanType.includes("home")) {
      return <Home size={23} className="text-emerald-400" />;
    }

    if (loanType.includes("business")) {
      return (
        <BriefcaseBusiness
          size={23}
          className="text-orange-400"
        />
      );
    }

    return <User size={23} className="text-purple-400" />;
  };

  const getLoanIconBackground = (type) => {
    const loanType = String(type || "").toLowerCase();

    if (loanType.includes("car")) {
      return "bg-blue-500/10";
    }

    if (loanType.includes("home")) {
      return "bg-emerald-500/10";
    }

    if (loanType.includes("business")) {
      return "bg-orange-500/10";
    }

    return "bg-purple-500/10";
  };

  // ==============================
  // Loan Types
  // ==============================
  const loanTypes = [
    {
      title: "Personal Loan",
      description:
        "Flexible financing for personal expenses, education, travel and more.",
      href: "/loan/personal",
      icon: User,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
      hover:
        "hover:border-purple-500/40 hover:bg-purple-500/[0.04]",
    },
    {
      title: "Car Loan",
      description:
        "Finance your new or used vehicle with flexible repayment options.",
      href: "/loan/car",
      icon: Car,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
      hover:
        "hover:border-blue-500/40 hover:bg-blue-500/[0.04]",
    },
    {
      title: "Home Loan",
      description:
        "Finance your dream home, apartment, construction or renovation.",
      href: "/loan/home",
      icon: Home,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      hover:
        "hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]",
    },
    {
      title: "Business Loan",
      description:
        "Grow your business with financing designed around your needs.",
      href: "/loan/business",
      icon: BriefcaseBusiness,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
      hover:
        "hover:border-orange-500/40 hover:bg-orange-500/[0.04]",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* =========================================
          Background
      ========================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =========================================
            Header
        ========================================== */}
        <header className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <Link
                href="/dashboard"
                className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </Link>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                  <WalletCards
                    size={27}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      My Loans
                    </h1>

                    <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
                      {loans.length}{" "}
                      {loans.length === 1
                        ? "Application"
                        : "Applications"}
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                    Track your loan applications, review requested
                    amounts and monitor your application status.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowLoanTypes(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400 hover:shadow-emerald-500/20"
            >
              <Plus size={19} />
              Apply for a Loan
            </button>
          </div>
        </header>

        {/* =========================================
            Statistics
        ========================================== */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Applications
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {statistics.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <FileCheck2
                  size={21}
                  className="text-blue-400"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
              <TrendingUp size={14} />
              All submitted applications
            </div>
          </div>

          {/* Pending */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-400">
                  {statistics.pending}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock3
                  size={21}
                  className="text-amber-400"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Waiting for review
            </p>
          </div>

          {/* Approved */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Approved
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-400">
                  {statistics.approved}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2
                  size={21}
                  className="text-emerald-400"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Successfully approved
            </p>
          </div>

          {/* Requested */}
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Requested
                </p>

                <p className="mt-2 truncate text-2xl font-bold text-white">
                  ৳{statistics.totalRequested.toLocaleString()}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
                <WalletCards
                  size={21}
                  className="text-purple-400"
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Across all applications
            </p>
          </div>
        </section>

        {/* =========================================
            Empty State
        ========================================== */}
        {loans.length === 0 ? (
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
            <div className="relative px-6 py-20 text-center sm:px-10">

              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10">
                <WalletCards
                  size={35}
                  className="text-emerald-400"
                />
              </div>

              <h2 className="relative text-2xl font-bold">
                No loan applications yet
              </h2>

              <p className="relative mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
                You haven't submitted any loan applications.
                Choose a loan type and complete the application to
                start your journey.
              </p>

              <button
                type="button"
                onClick={() => setShowLoanTypes(true)}
                className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                <Plus size={18} />
                Start New Application
              </button>
            </div>

            <div className="grid border-t border-slate-800 sm:grid-cols-3">
              <div className="border-b border-slate-800 px-6 py-5 text-center sm:border-b-0 sm:border-r">
                <ShieldCheck
                  className="mx-auto mb-2 text-emerald-400"
                  size={20}
                />
                <p className="text-xs text-slate-400">
                  Secure Application
                </p>
              </div>

              <div className="border-b border-slate-800 px-6 py-5 text-center sm:border-b-0 sm:border-r">
                <Clock3
                  className="mx-auto mb-2 text-blue-400"
                  size={20}
                />
                <p className="text-xs text-slate-400">
                  Fast Processing
                </p>
              </div>

              <div className="px-6 py-5 text-center">
                <TrendingUp
                  className="mx-auto mb-2 text-purple-400"
                  size={20}
                />
                <p className="text-xs text-slate-400">
                  Flexible Options
                </p>
              </div>
            </div>
          </section>
        ) : (

          /* =========================================
             Loan Applications
          ========================================== */
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Your Applications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recent loan application activity
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLoanTypes(true)}
                className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400 sm:inline-flex"
              >
                <Plus size={16} />
                New Application
              </button>
            </div>

            <div className="space-y-5">
              {loans.map((loan) => {
                const status = getStatusStyle(
                  loan.status
                );

                return (
                  <article
                    key={loan.id}
                    className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-2xl"
                  >

                    {/* Card Top */}
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Left */}
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${getLoanIconBackground(
                              loan.type
                            )}`}
                          >
                            {getLoanIcon(loan.type)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="text-lg font-bold text-white">
                                {loan.type || "Loan Application"}
                              </h3>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.wrapper}`}
                              >
                                {status.icon}
                                {loan.status || "Pending"}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                              <span>
                                Application ID:{" "}
                                <span className="font-mono text-slate-400">
                                  #{loan.id}
                                </span>
                              </span>

                              <span className="hidden text-slate-700 sm:inline">
                                •
                              </span>

                              <span>
                                Submitted application
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-4 lg:min-w-[190px] lg:text-right">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Requested Amount
                          </p>

                          <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                            ৳
                            {Number(
                              loan.amount || 0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-6 h-px bg-slate-800" />

                      {/* Details */}
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                            <CalendarDays
                              size={17}
                              className="text-slate-400"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Tenure
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {loan.tenure || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                            <WalletCards
                              size={17}
                              className="text-slate-400"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Monthly Income
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              ৳
                              {Number(
                                loan.income || 0
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                            <BriefcaseBusiness
                              size={17}
                              className="text-slate-400"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Employment
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {loan.employment || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                            <CalendarDays
                              size={17}
                              className="text-slate-400"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Applied Date
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {loan.appliedAt || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Purpose */}
                      {loan.purpose && (
                        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                              Loan Purpose
                            </p>

                            <FileCheck2
                              size={16}
                              className="text-slate-600"
                            />
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {loan.purpose}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-950/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck
                          size={15}
                          className="text-emerald-400"
                        />
                        Application information is securely handled.
                      </div>

                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        Status:
                        <span
                          className={
                            loan.status === "Approved"
                              ? "text-emerald-400"
                              : loan.status === "Rejected"
                              ? "text-red-400"
                              : "text-amber-400"
                          }
                        >
                          {loan.status || "Pending"}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="ml-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* =========================================
          Loan Selection Modal
      ========================================== */}
      {showLoanTypes && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLoanTypes(false);
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 px-6 py-6 backdrop-blur-xl sm:px-8">
              <button
                type="button"
                onClick={() => setShowLoanTypes(false)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 text-slate-400 transition hover:border-slate-600 hover:bg-slate-700 hover:text-white"
                aria-label="Close"
              >
                <X size={19} />
              </button>

              <div className="pr-12">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                  <WalletCards size={14} />
                  Loan Services
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Choose Your Loan
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Select the loan product that best matches your
                  financial needs and start your application.
                </p>
              </div>
            </div>

            {/* Loan Cards */}
            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {loanTypes.map((loanType) => {
                const Icon = loanType.icon;

                return (
                  <Link
                    key={loanType.title}
                    href={loanType.href}
                    onClick={() => setShowLoanTypes(false)}
                    className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-1 ${loanType.hover}`}
                  >
                    <div className="flex items-start gap-4">

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${loanType.iconBg}`}
                      >
                        <Icon
                          size={23}
                          className={loanType.iconColor}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-bold text-white">
                            {loanType.title}
                          </h3>

                          <ChevronRight
                            size={17}
                            className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-slate-300"
                          />
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {loanType.description}
                        </p>

                        <div
                          className={`mt-4 text-xs font-semibold ${loanType.iconColor}`}
                        >
                          Start Application →
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck
                  size={15}
                  className="text-emerald-400"
                />
                Your application details are securely handled.
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}