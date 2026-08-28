"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  ShieldCheck,
  Globe,
  Moon,
  Sun,
  Monitor,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Loader2,
  X,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Languages,
  Wallet,
} from "lucide-react";

const defaultSettings = {
  fullName: "Md Siam Babu",
  email: "siam@example.com",

  transactionAlerts: true,
  securityAlerts: true,
  marketingEmails: false,

  twoFactorAuth: false,

  language: "English",
  appearance: "dark",

  paymentPreference: "Card",

  privacyMode: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);

  const [activeModal, setActiveModal] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("bankSettings");

    if (savedSettings) {
      try {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        });
      } catch (error) {
        console.error("Settings loading failed:", error);
      }
    }

    setMounted(true);
  }, []);

  const saveSettings = (updatedSettings, message) => {
    setSettings(updatedSettings);

    localStorage.setItem(
      "bankSettings",
      JSON.stringify(updatedSettings)
    );

    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const updateSetting = (key, value, message) => {
    const updatedSettings = {
      ...settings,
      [key]: value,
    };

    saveSettings(updatedSettings, message);
  };

  const toggleSetting = (key, label) => {
    const updatedValue = !settings[key];

    updateSetting(
      key,
      updatedValue,
      `${label} ${updatedValue ? "enabled" : "disabled"} successfully.`
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950" />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Success Toast */}
      {successMessage && (
        <div className="fixed right-4 top-5 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-500/30 bg-slate-900 px-5 py-4 shadow-2xl shadow-black/40">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Settings Updated
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {successMessage}
            </p>
          </div>

          <button
            onClick={() => setSuccessMessage("")}
            className="ml-2 text-slate-500 transition hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

              <span className="text-xs font-bold tracking-[0.2em] text-emerald-400">
                ACCOUNT MANAGEMENT
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage your account, security and preferences.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Account Overview */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-emerald-500/[0.03] p-6 shadow-2xl shadow-black/20">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <User size={30} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                Account Settings
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Update your personal information, banking security and
                application preferences.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 sm:self-auto">
              <CheckCircle2 size={16} />
              Account Active
            </div>
          </div>
        </section>

        {/* Settings Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <SettingCard
            icon={<User size={21} />}
            title="Personal Information"
            description="Manage your personal details and registered account information."
          >
            <SettingRow
              icon={<User size={18} />}
              title="Profile Information"
              description={settings.fullName}
              onClick={() => setActiveModal("profile")}
            />

            <SettingRow
              icon={<Mail size={18} />}
              title="Email Address"
              description={settings.email}
              onClick={() => setActiveModal("profile")}
            />
          </SettingCard>

          {/* Security */}
          <SettingCard
            icon={<ShieldCheck size={21} />}
            title="Security"
            description="Keep your banking account secure and protected."
          >
            <SettingRow
              icon={<Lock size={18} />}
              title="Password"
              description="Change your account password"
              onClick={() => setActiveModal("password")}
            />

            <SettingRow
              icon={<Smartphone size={18} />}
              title="Two-Factor Authentication"
              description={
                settings.twoFactorAuth
                  ? "Two-factor authentication is enabled"
                  : "Add an extra layer of security"
              }
              badge={
                settings.twoFactorAuth ? "Enabled" : "Recommended"
              }
              toggle
              enabled={settings.twoFactorAuth}
              onToggle={() =>
                toggleSetting(
                  "twoFactorAuth",
                  "Two-factor authentication"
                )
              }
            />
          </SettingCard>

          {/* Notifications */}
          <SettingCard
            icon={<Bell size={21} />}
            title="Notifications"
            description="Control how and when you receive account alerts."
          >
            <SettingRow
              title="Transaction Alerts"
              description="Get notified about every account transaction"
              toggle
              enabled={settings.transactionAlerts}
              onToggle={() =>
                toggleSetting(
                  "transactionAlerts",
                  "Transaction alerts"
                )
              }
            />

            <SettingRow
              title="Security Alerts"
              description="Receive important account security notifications"
              toggle
              enabled={settings.securityAlerts}
              onToggle={() =>
                toggleSetting(
                  "securityAlerts",
                  "Security alerts"
                )
              }
            />

            <SettingRow
              title="Promotional Emails"
              description="Receive banking offers and product updates"
              toggle
              enabled={settings.marketingEmails}
              onToggle={() =>
                toggleSetting(
                  "marketingEmails",
                  "Promotional emails"
                )
              }
            />
          </SettingCard>

          {/* Preferences */}
          <SettingCard
            icon={<Globe size={21} />}
            title="Preferences"
            description="Customize your banking experience and application interface."
          >
            <SettingRow
              icon={<Languages size={18} />}
              title="Language"
              description={settings.language}
              onClick={() => setActiveModal("language")}
            />

            <SettingRow
              icon={
                settings.appearance === "dark" ? (
                  <Moon size={18} />
                ) : settings.appearance === "light" ? (
                  <Sun size={18} />
                ) : (
                  <Monitor size={18} />
                )
              }
              title="Appearance"
              description={
                settings.appearance === "dark"
                  ? "Dark mode"
                  : settings.appearance === "light"
                  ? "Light mode"
                  : "System default"
              }
              onClick={() => setActiveModal("appearance")}
            />
          </SettingCard>

          {/* Payment Settings */}
          <SettingCard
            icon={<CreditCard size={21} />}
            title="Payment Settings"
            description="Manage cards and your preferred payment options."
          >
            <SettingRow
              icon={<CreditCard size={18} />}
              title="Saved Cards"
              description="Manage your linked bank cards"
              onClick={() => setActiveModal("cards")}
            />

            <SettingRow
              icon={<Wallet size={18} />}
              title="Payment Preferences"
              description={`Preferred method: ${settings.paymentPreference}`}
              onClick={() => setActiveModal("payment")}
            />
          </SettingCard>

          {/* Privacy */}
          <SettingCard
            icon={<ShieldCheck size={21} />}
            title="Privacy"
            description="Control your privacy and account data preferences."
          >
            <SettingRow
              title="Privacy Mode"
              description="Hide sensitive account information when possible"
              toggle
              enabled={settings.privacyMode}
              onToggle={() =>
                toggleSetting(
                  "privacyMode",
                  "Privacy mode"
                )
              }
            />

            <SettingRow
              title="Data & Privacy"
              description="Review how your account data is used"
              onClick={() => setActiveModal("privacy")}
            />
          </SettingCard>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </main>

      {/* Profile Modal */}
      {activeModal === "profile" && (
        <ProfileModal
          settings={settings}
          onClose={() => setActiveModal(null)}
          onSave={(fullName, email) => {
            saveSettings(
              {
                ...settings,
                fullName,
                email,
              },
              "Profile information saved successfully."
            );

            setActiveModal(null);
          }}
        />
      )}

      {/* Password Modal */}
      {activeModal === "password" && (
        <PasswordModal
          onClose={() => setActiveModal(null)}
          onSave={() => {
            setSuccessMessage(
              "Password updated successfully."
            );

            setActiveModal(null);
          }}
        />
      )}

      {/* Language Modal */}
      {activeModal === "language" && (
        <SelectionModal
          title="Choose Language"
          options={["English", "বাংলা", "العربية"]}
          selected={settings.language}
          onClose={() => setActiveModal(null)}
          onSelect={(language) => {
            updateSetting(
              "language",
              language,
              `Language changed to ${language}.`
            );

            setActiveModal(null);
          }}
        />
      )}

      {/* Appearance Modal */}
      {activeModal === "appearance" && (
        <SelectionModal
          title="Choose Appearance"
          options={["dark", "light", "system"]}
          selected={settings.appearance}
          onClose={() => setActiveModal(null)}
          onSelect={(appearance) => {
            updateSetting(
              "appearance",
              appearance,
              "Appearance preference updated."
            );

            setActiveModal(null);
          }}
        />
      )}

      {/* Payment Modal */}
      {activeModal === "payment" && (
        <SelectionModal
          title="Payment Preference"
          options={[
            "Card",
            "Bank Transfer",
            "Mobile Banking",
          ]}
          selected={settings.paymentPreference}
          onClose={() => setActiveModal(null)}
          onSelect={(paymentPreference) => {
            updateSetting(
              "paymentPreference",
              paymentPreference,
              "Payment preference updated."
            );

            setActiveModal(null);
          }}
        />
      )}

      {/* Cards Modal */}
      {activeModal === "cards" && (
        <InfoModal
          title="Saved Cards"
          message="You can manage your linked cards from the Cards page."
          actionText="Go to Cards"
          href="/dashboard/cards"
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Privacy Modal */}
      {activeModal === "privacy" && (
        <InfoModal
          title="Data & Privacy"
          message="Your banking information is protected and stored according to your selected privacy preferences."
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}

/* ---------------- Setting Card ---------------- */

function SettingCard({
  icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/10 transition hover:border-white/15">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {children}
      </div>
    </section>
  );
}

/* ---------------- Setting Row ---------------- */

function SettingRow({
  icon,
  title,
  description,
  badge,
  toggle,
  enabled,
  onToggle,
  onClick,
}) {
  return (
    <div
      className={`flex items-center gap-3 py-4 ${
        onClick
          ? "cursor-pointer transition hover:bg-white/[0.02]"
          : ""
      }`}
      onClick={onClick}
    >
      {icon && (
        <div className="text-slate-400">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-medium text-slate-200">
            {title}
          </h3>

          {badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                badge === "Enabled"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-amber-400/10 text-amber-400"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      {toggle ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className={`relative h-6 w-11 rounded-full transition ${
            enabled
              ? "bg-emerald-500"
              : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
              enabled ? "left-6" : "left-1"
            }`}
          />
        </button>
      ) : (
        <ChevronRight
          size={18}
          className="shrink-0 text-slate-500"
        />
      )}
    </div>
  );
}

/* ---------------- Profile Modal ---------------- */

function ProfileModal({
  settings,
  onClose,
  onSave,
}) {
  const [fullName, setFullName] = useState(
    settings.fullName
  );

  const [email, setEmail] = useState(settings.email);

  return (
    <Modal
      title="Edit Profile"
      onClose={onClose}
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>

          <input
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/60"
          />
        </div>

        <button
          onClick={() =>
            onSave(fullName.trim(), email.trim())
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </Modal>
  );
}

/* ---------------- Password Modal ---------------- */

function PasswordModal({
  onClose,
  onSave,
}) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    onSave();
  };

  return (
    <Modal
      title="Change Password"
      onClose={onClose}
    >
      <div className="space-y-5">
        {error && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          show={showPassword}
          onToggle={() =>
            setShowPassword(!showPassword)
          }
        />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          show={showPassword}
          onToggle={() =>
            setShowPassword(!showPassword)
          }
        />

        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          show={showPassword}
          onToggle={() =>
            setShowPassword(!showPassword)
          }
        />

        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          <Lock size={18} />
          Update Password
        </button>
      </div>
    </Modal>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none focus:border-emerald-500/60"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Selection Modal ---------------- */

function SelectionModal({
  title,
  options,
  selected,
  onClose,
  onSelect,
}) {
  return (
    <Modal
      title={title}
      onClose={onClose}
    >
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <span className="font-medium capitalize text-white">
                {option}
              </span>

              {isSelected && (
                <CheckCircle2
                  size={19}
                  className="text-emerald-400"
                />
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

/* ---------------- Information Modal ---------------- */

function InfoModal({
  title,
  message,
  actionText,
  href,
  onClose,
}) {
  return (
    <Modal
      title={title}
      onClose={onClose}
    >
      <p className="leading-7 text-slate-400">
        {message}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
        >
          Close
        </button>

        {actionText && href && (
          <Link
            href={href}
            className="flex flex-1 items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            {actionText}
          </Link>
        )}
      </div>
    </Modal>
  );
}

/* ---------------- Modal ---------------- */

function Modal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101b17] p-6 shadow-2xl shadow-black/50">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}