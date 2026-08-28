"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Landmark,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    href: "/dashboard/accounts",
    icon: CreditCard,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Loans",
    href: "/dashboard/loans",
    icon: Landmark,
  },
  {
    name: "Cards",
    href: "/dashboard/cards",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-slate-800 bg-[#0b1838]">
      <nav className="flex items-center gap-1 overflow-x-auto px-4 py-3 md:px-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}