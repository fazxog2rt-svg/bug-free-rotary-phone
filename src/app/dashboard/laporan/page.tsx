"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { NilaiTrendChart, KelulusanChart } from "@/components/dashboard/NilaiChart";
import { Button } from "@/components/ui/Button";
import { Download, BarChart3, TrendingUp, Award, Users } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const radarData = [
  { mapel: "Matematika", nilai: 82 },
  { mapel: "B.Arab", nilai: 89 },
  { mapel: "Fiqh", nilai: 93 },
  { mapel: "IPA", nilai: 78 },
  { mapel: "B.Inggris", nilai: 84 },
  { mapel: "Tahfidz", nilai: 91 },
];

const pieData = [
  { name: "Sangat Baik (90-100)", value: 28, color: "#059669" },
  { name: "Baik (75-89)", value: 45, color: "#3b82f6" },
  { name: "Cukup (60-74)", value: 18, color: "#f59e0b" },
  { name: "Kurang (<60)", value: 9, color: "#ef4444" },
];

export default function LaporanPage() {
  return (
    <DashboardLayout title="Laporan & Analitik">
      <div className="space-y-5">
        {/* Export Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["Bulanan", "Semester", "Tahunan"].map((t, i) => (
              <button key={t} className={`rounded-xl px-3 py-2 text-xs font-medium ${i === 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                {t}
              </button>
            ))}
          </div>
          <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>
            Unduh Laporan PDF
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Ujian Dilaksanakan", value: "248", icon: <BarChart3 className="h-5 w-5" />, trend: "+12%", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Rata-rata Kehadiran", value: "96.4%", icon: <Users className="h-5 w-5" />, trend: "+2%", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
            { label: "Indeks Kelulusan", value: "92.1%", icon: <Award className="h-5 w-5" />, trend: "+3%", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Peningkatan Nilai", value: "+8.4%", icon: <TrendingUp className="h-5 w-5" />, trend: "vs semester lalu", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${kpi.color}`}>
                {kpi.icon}
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{kpi.label}</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">{kpi.trend}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-5 lg:grid-cols-2">
          <NilaiTrendChart />
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Distribusi Nilai</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-5 lg:grid-cols-2">
          <KelulusanChart />
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Radar Nilai per Mapel</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="mapel" tick={{ fontSize: 11 }} />
                <Radar name="Nilai" dataKey="nilai" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
