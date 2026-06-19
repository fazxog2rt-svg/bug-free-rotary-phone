"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ActiveExams } from "@/components/dashboard/ActiveExams";
import { NilaiTrendChart, KelulusanChart } from "@/components/dashboard/NilaiChart";
import { Users, GraduationCap, ClipboardList, School, TrendingUp, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-6 rounded-3xl green-gradient p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-64 opacity-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white" />
          <div className="absolute right-20 bottom-5 h-32 w-32 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <p className="text-emerald-100 text-sm font-medium mb-1">Selamat Datang,</p>
          <h2 className="text-2xl font-bold text-white">{user?.name || "Pengguna"} 👋</h2>
          <p className="text-emerald-200 text-sm mt-1">
            {new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date())}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Santri" value={1248} icon={<Users className="h-5 w-5" />} trend={5} color="green" />
        <StatCard title="Total Guru" value={87} icon={<GraduationCap className="h-5 w-5" />} trend={2} color="blue" />
        <StatCard title="Ujian Aktif" value={3} icon={<ClipboardList className="h-5 w-5" />} color="gold" />
        <StatCard title="Total Kelas" value={24} icon={<School className="h-5 w-5" />} color="purple" />
        <StatCard title="Rata-rata Nilai" value="84.7" icon={<TrendingUp className="h-5 w-5" />} trend={3} color="green" subtitle="dari 100" />
        <StatCard title="Tingkat Lulus" value="92%" icon={<Award className="h-5 w-5" />} trend={1} color="gold" />
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <NilaiTrendChart />
        <KelulusanChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActiveExams />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
