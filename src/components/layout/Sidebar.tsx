"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  GraduationCap,
  BookMarked,
  Star,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
  School,
  QrCode,
  Trophy,
  Globe,
  FileCheck,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "mudir", "admin_akademik", "guru", "musyrif", "santri", "orang_tua"],
  },
  {
    label: "Santri",
    href: "/dashboard/santri",
    icon: Users,
    roles: ["super_admin", "mudir", "admin_akademik"],
  },
  {
    label: "Guru",
    href: "/dashboard/guru",
    icon: GraduationCap,
    roles: ["super_admin", "mudir", "admin_akademik"],
  },
  {
    label: "Kelas",
    href: "/dashboard/kelas",
    icon: School,
    roles: ["super_admin", "mudir", "admin_akademik"],
  },
  {
    label: "Bank Soal",
    href: "/dashboard/bank-soal",
    icon: BookOpen,
    roles: ["super_admin", "admin_akademik", "guru"],
  },
  {
    label: "Ujian",
    href: "/dashboard/ujian",
    icon: ClipboardList,
    roles: ["super_admin", "admin_akademik", "guru", "santri"],
  },
  {
    label: "Tahfidz",
    href: "/dashboard/tahfidz",
    icon: BookMarked,
    roles: ["super_admin", "mudir", "musyrif", "santri", "orang_tua"],
  },
  {
    label: "Nilai & Rapor",
    href: "/dashboard/nilai",
    icon: Star,
    roles: ["super_admin", "mudir", "admin_akademik", "guru", "santri", "orang_tua"],
  },
  {
    label: "Laporan",
    href: "/dashboard/laporan",
    icon: BarChart3,
    roles: ["super_admin", "mudir", "admin_akademik"],
  },
  {
    label: "Notifikasi",
    href: "/dashboard/notifikasi",
    icon: Bell,
    roles: ["super_admin", "mudir", "admin_akademik", "guru", "musyrif", "santri", "orang_tua"],
  },
  {
    label: "Hasil Ujian",
    href: "/dashboard/hasil-ujian",
    icon: Trophy,
    roles: ["super_admin", "admin_akademik", "guru", "santri"],
  },
  {
    label: "QR Card",
    href: "/dashboard/qr-card",
    icon: QrCode,
    roles: ["super_admin", "admin_akademik"],
  },
  {
    label: "Rapor Digital",
    href: "/dashboard/rapor",
    icon: FileCheck,
    roles: ["super_admin", "mudir", "admin_akademik"],
  },
  {
    label: "Multi Tenant",
    href: "/dashboard/multi-tenant",
    icon: Globe,
    roles: ["super_admin"],
  },
  {
    label: "Pengaturan",
    href: "/dashboard/pengaturan",
    icon: Settings,
    roles: ["super_admin", "mudir"],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const filtered = navItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl green-gradient">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              Pesantren
            </p>
            <p className="text-xs font-semibold text-emerald-600">Exam Pro</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {filtered.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-emerald-600 dark:text-emerald-400")} />
              {!collapsed && item.label}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {user && !collapsed && (
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} src={user.avatar} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.replace("_", " ")}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
