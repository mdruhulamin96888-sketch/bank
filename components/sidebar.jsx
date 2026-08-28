"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  CreditCard,
  Landmark,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar({ current }) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({
      redirectUrl: "/sign-in",
    });
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      key: "dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Accounts",
      path: "/account",
      key: "accounts",
      icon: Wallet,
    },
    {
      name: "Transactions",
      path: "/transactions",
      key: "transactions",
      icon: ArrowRightLeft,
    },
    {
      name: "My Cards",
      path: "/cards",
      key: "cards",
      icon: CreditCard,
    },
    {
      name: "Loans",
      path: "/loan",
      key: "loan",
      icon: Landmark,
    },
    {
      name: "Settings",
      path: "/settings",
      key: "settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 p-4 sticky top-0 select-none">
      <div>
        {/* Brand Header / Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={22} />
          </div>
          <span className="font-bold text-lg text-white tracking-wide">
            Greenfield Bank
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path || current === item.key;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                {/* Active Left Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full" />
                )}

                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Options */}
      <div className="pt-4 border-t border-slate-800 flex flex-col gap-1">
        {/* Help & Support */}
        <Link
          href="/support"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-all duration-200 group"
        >
          <HelpCircle
            size={19}
            className="text-slate-400 group-hover:text-slate-200"
          />
          <span>Help & Support</span>
        </Link>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200 w-full text-left group"
        >
          <LogOut
            size={19}
            className="text-red-500 group-hover:text-rose-300 transition-transform group-hover:-translate-x-0.5 duration-200"
          />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}