import Link from "next/link";
import { Bell, LayoutDashboard, CreditCard, ArrowLeftRight, Landmark, Settings } from "lucide-react";

export default function Topbar({ user }) {
  return (
    <header className="topbar">
      {/* Brand / Logo */}
      <Link href="/dashboard" className="brand">
        <div className="brand-icon"><Landmark size={23} /></div>
        <div>
          <div className="brand-title">Greenfield Bank</div>
          <div className="brand-subtitle">Your Trust, Our Priority</div>
        </div>
      </Link>

      {/* Navigation Links (Dashboard-এর ভেতরের রাউট অনুযায়ী আপডেট করা) */}
      <nav className="topnav">
        <Link className="active" href="/dashboard">
          <LayoutDashboard size={16}/>Dashboard
        </Link>
        <Link href="/dashboard/account">
          <CreditCard size={16}/>Accounts
        </Link>
        <Link href="/dashboard/transactions">
          <ArrowLeftRight size={16}/>Transactions
        </Link>
        <Link href="/dashboard/loans">
          <Landmark size={16}/>Loans
        </Link>
        <Link href="/dashboard/cards">
          <CreditCard size={16}/>Cards
        </Link>
        <Link href="/dashboard/settings">
          <Settings size={16}/>Settings
        </Link>
      </nav>

      {/* Search Input */}
      <input className="topbar-search" placeholder="⌕ Search..." />

      {/* Profile Section */}
      <div className="profile-mini">
        <Bell size={21} />
        <div className="avatar">{user?.name?.slice(0, 1) || "S"}</div>
        <div>
          <div className="profile-name">{user?.name || "Bank Customer"}</div>
          <div className="profile-role">Bank Customer</div>
        </div>
      </div>
    </header>
  );
}