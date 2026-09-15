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

  // Logout handler
  const handleSignOut = async () => {
    try {
      await signOut({
        redirectUrl: "/sign-in",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
    <aside className="sticky top-0 flex h-screen w-64 select-none flex-col justify-between border-r border-slate-800 bg-slate-900 p-4 text-slate-300">
      
      {/* ================= HEADER ================= */}
      <div>
        <div className="mb-6 flex items-center gap-3 border-b border-slate-800 px-3 py-4">
          <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={22} />
          </div>

          <span className="text-lg font-bold tracking-wide text-white">
            Greenfield Bank
          </span>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.path || current === item.key;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600/10 font-semibold text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-indigo-500" />
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

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col gap-1 border-t border-slate-800 pt-4">
        
        {/* Help & Support */}
        <Link
          href="/support"
          className="group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-800/60 hover:text-slate-200"
        >
          <HelpCircle
            size={19}
            className="text-slate-400 transition-colors group-hover:text-slate-200"
          />

          <span>Help & Support</span>
        </Link>

        {/* Logout */}
        <Link href="/sign-in">
        <button
          type="button"
          onClick={handleSignOut}
          className="group flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-rose-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300"
        >
          <LogOut
            size={19}
            className="text-red-500 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-rose-300"
          />

          <span>Log out</span>
        </button>
        </Link>
      </div>
    </aside>
  );
}