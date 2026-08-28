"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search, CheckCircle2, XCircle, Clock3, Eye, X, RefreshCw,
  User, Mail, Phone, CalendarDays, Banknote, FileText, AlertCircle
} from "lucide-react";

export default function LoanManagementPage() {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => { loadLoans(); }, []);

  const loadLoans = () => {
    try {
      const saved = localStorage.getItem("loanApplications");
      const parsed = saved ? JSON.parse(saved) : [];
      setLoans(Array.isArray(parsed) ? parsed : []);
    } catch {
      setLoans([]);
    }
  };

  const updateLoanStatus = async (loan, newStatus) => {
    if (!loan?.id) return;
    if (!window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this loan?`)) return;

    const loanId = String(loan.id);
    const updatedAt = new Date().toISOString();
    setLoadingId(loanId);

    try {
      await fetch(`/api/loans/${encodeURIComponent(loanId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn("API unavailable:", e);
    }

    const updatedLoans = loans.map((item) =>
      String(item?.id) === loanId ? { ...item, status: newStatus, updatedAt } : item
    );

    localStorage.setItem("loanApplications", JSON.stringify(updatedLoans));
    setLoans(updatedLoans);

    if (selectedLoan && String(selectedLoan.id) === loanId) {
      setSelectedLoan((prev) => ({ ...prev, status: newStatus, updatedAt }));
    }

    setLoadingId(null);
  };

  const filteredLoans = useMemo(() => {
    const q = search.toLowerCase().trim();
    return loans.filter((l) => {
      const matchSearch = ["name", "email", "loanType", "id"].some((key) =>
        String(l?.[key] ?? "").toLowerCase().includes(q)
      );
      const matchStatus = statusFilter === "All" || String(l?.status ?? "Pending").toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [loans, search, statusFilter]);

  const statistics = useMemo(() => {
    const count = (status) => loans.filter((l) => String(l?.status ?? "Pending").toLowerCase() === status).length;
    return { total: loans.length, pending: count("pending"), approved: count("approved"), rejected: count("rejected") };
  }, [loans]);

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatAmount = (amt) => {
    const num = Number(amt);
    return isNaN(num) || !amt ? "৳0" : new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(num);
  };

  const getStatusConfig = (status) => {
    switch (String(status ?? "Pending").toLowerCase()) {
      case "approved": return { style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: <CheckCircle2 size={14} /> };
      case "rejected": return { style: "bg-red-500/10 text-red-400 border-red-500/20", icon: <XCircle size={14} /> };
      default: return { style: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: <Clock3 size={14} /> };
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Loan Management</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Loan Applications</h1>
            <p className="mt-2 text-sm text-slate-400">Review, approve, or reject customer loan applications.</p>
          </div>
          <button onClick={loadLoans} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
            <RefreshCw size={17} /> Refresh
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Applications" value={statistics.total} icon={<FileText size={20} />} iconClass="bg-blue-500/10 text-blue-400" />
          <StatCard title="Pending" value={statistics.pending} icon={<Clock3 size={20} />} iconClass="bg-amber-500/10 text-amber-400" />
          <StatCard title="Approved" value={statistics.approved} icon={<CheckCircle2 size={20} />} iconClass="bg-emerald-500/10 text-emerald-400" />
          <StatCard title="Rejected" value={statistics.rejected} icon={<XCircle size={20} />} iconClass="bg-red-500/10 text-red-400" />
        </div>

        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search by name, email, loan type or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-emerald-500" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-emerald-500">
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="border-b border-slate-800 bg-slate-950/70">
                <tr>
                  {["Application", "Applicant", "Amount", "Duration", "Status", "Date", "Actions"].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${i === 6 ? "text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
                        <AlertCircle size={25} className="text-slate-500" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-200">No loan applications found</h3>
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan, index) => {
                    const loanId = String(loan?.id ?? `loan-${index}`);
                    const statusConfig = getStatusConfig(loan?.status);
                    const isPending = loadingId === loanId;
                    const normalizedStatus = String(loan?.status ?? "Pending").toLowerCase();

                    return (
                      <tr key={loanId} className="transition hover:bg-slate-800/30">
                        <td className="px-6 py-5">
                          <p className="font-semibold text-white">{loan?.loanType || "Loan"}</p>
                          <p className="mt-1 text-xs text-slate-500">ID: {loanId}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-medium text-slate-200">{loan?.name || "Unknown"}</p>
                          <p className="mt-1 text-xs text-slate-500">{loan?.email || "No email"}</p>
                        </td>
                        <td className="px-6 py-5 font-semibold text-slate-100">{formatAmount(loan?.amount)}</td>
                        <td className="px-6 py-5 text-sm text-slate-300">{loan?.duration || "—"}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusConfig.style}`}>
                            {statusConfig.icon} {loan?.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-400">{formatDate(loan?.appliedAt || loan?.createdAt)}</td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setSelectedLoan(loan)} title="View Details" className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400">
                              <Eye size={17} />
                            </button>
                            <button onClick={() => updateLoanStatus(loan, "Approved")} disabled={isPending || normalizedStatus === "approved"} title="Approve" className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40">
                              <CheckCircle2 size={17} />
                            </button>
                            <button onClick={() => updateLoanStatus(loan, "Rejected")} disabled={isPending || normalizedStatus === "rejected"} title="Reject" className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40">
                              <XCircle size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && setSelectedLoan(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <p className="text-sm text-emerald-400">Loan Application</p>
                <h2 className="mt-1 text-2xl font-bold text-white">{selectedLoan?.loanType || "Loan"}</h2>
                <p className="mt-1 text-xs text-slate-500">Application ID: {String(selectedLoan?.id ?? "—")}</p>
              </div>
              <button onClick={() => setSelectedLoan(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <DetailItem icon={<User size={17} />} label="Applicant Name" value={selectedLoan?.name} />
              <DetailItem icon={<Mail size={17} />} label="Email" value={selectedLoan?.email} />
              <DetailItem icon={<Phone size={17} />} label="Phone" value={selectedLoan?.phone} />
              <DetailItem icon={<Banknote size={17} />} label="Loan Amount" value={formatAmount(selectedLoan?.amount)} />
              <DetailItem icon={<CalendarDays size={17} />} label="Duration" value={selectedLoan?.duration} />
              <DetailItem icon={<Clock3 size={17} />} label="Applied Date" value={formatDate(selectedLoan?.appliedAt || selectedLoan?.createdAt)} />
              <div className="sm:col-span-2">
                <DetailItem icon={<FileText size={17} />} label="Purpose" value={selectedLoan?.purpose || "Not provided"} />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-800 p-6 sm:flex-row sm:justify-end">
              <button onClick={() => updateLoanStatus(selectedLoan, "Rejected")} disabled={loadingId === String(selectedLoan?.id) || String(selectedLoan?.status).toLowerCase() === "rejected"} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40">
                <XCircle size={18} /> Reject Application
              </button>
              <button onClick={() => updateLoanStatus(selectedLoan, "Approved")} disabled={loadingId === String(selectedLoan?.id) || String(selectedLoan?.status).toLowerCase() === "approved"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40">
                <CheckCircle2 size={18} /> Approve Application
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>{icon}</div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="flex items-center gap-2 text-xs text-slate-500">{icon} {label}</div>
      <p className="mt-2 break-words text-sm font-medium text-slate-200">{value || "—"}</p>
    </div>
  );
}