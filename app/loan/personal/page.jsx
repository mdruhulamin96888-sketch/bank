"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function PersonalLoanPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    duration: "",
    purpose: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);

    const existingLoans = JSON.parse(
      localStorage.getItem("loanApplications") || "[]"
    );

    const now = new Date().toISOString();

    const newLoan = {
      id: `LN-${Date.now()}`,
      loanType: "Personal Loan",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: Number(formData.amount),
      duration: formData.duration,
      purpose: formData.purpose,
      address: formData.address,
      status: "Pending",
      appliedAt: now,
      createdAt: now,
    };

    localStorage.setItem(
      "loanApplications",
      JSON.stringify([newLoan, ...existingLoans])
    );

    router.push("/dashboard/loans");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

          <div className="mb-8">
            <p className="text-sm font-medium text-emerald-400">
              Loan Application
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Personal Loan
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Complete the form below to submit your personal loan
              application.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >

            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Input
              label="Loan Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <Select
              label="Loan Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              options={[
                "1 Year",
                "2 Years",
                "3 Years",
                "5 Years",
                "7 Years",
              ]}
              required
            />

            <Input
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle2 size={18} />

                {submitting
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
      >
        <option value="">Select duration</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}