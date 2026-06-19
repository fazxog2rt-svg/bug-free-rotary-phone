"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Plus, BookMarked, Star, TrendingUp } from "lucide-react";

const hafalanData = [
  { id: "1", santri: "Ahmad Fauzi", kelas: "9A", juz: 15, target: 20, tahsin: 88, tajwid: 90, kelancaran: 85, last: "2026-06-18" },
  { id: "2", santri: "Siti Aisyah", kelas: "11A", juz: 25, target: 30, tahsin: 95, tajwid: 96, kelancaran: 94, last: "2026-06-19" },
  { id: "3", santri: "Fatimah Zahra", kelas: "12A", juz: 30, target: 30, tahsin: 98, tajwid: 99, kelancaran: 97, last: "2026-06-19" },
  { id: "4", santri: "Hasan Basri", kelas: "7B", juz: 5, target: 10, tahsin: 75, tajwid: 78, kelancaran: 72, last: "2026-06-17" },
  { id: "5", santri: "Abdurrahman", kelas: "9B", juz: 18, target: 20, tahsin: 87, tajwid: 89, kelancaran: 83, last: "2026-06-18" },
];

function ProgressCircle({ value, max, color = "#059669" }: { value: number; max: number; color?: string }) {
  const pct = (value / max) * 100;
  const r = 20;
  const circ = 2 * Math.PI * r;
  const stroke = circ * (1 - pct / 100);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={stroke}
          strokeLinecap="round" transform="rotate(-90 28 28)"
        />
      </svg>
      <span className="absolute text-xs font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

export default function TahfidzPage() {
  return (
    <DashboardLayout title="Sistem Tahfidz">
      <div className="space-y-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Hafalan Juz", value: "1,248 Juz", icon: <BookMarked className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Selesai 30 Juz", value: "12 Santri", icon: <Star className="h-5 w-5" />, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Rata-rata Tahsin", value: "88.6", icon: <TrendingUp className="h-5 w-5" />, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
            { label: "Setoran Hari Ini", value: "42 Setoran", icon: <BookMarked className="h-5 w-5" />, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Progress Hafalan Santri</h3>
          <Button leftIcon={<Plus className="h-4 w-4" />}>Catat Setoran</Button>
        </div>

        {/* Hafalan Table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Santri</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Progress Juz</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Tahsin</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Tajwid</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Kelancaran</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Terakhir Setor</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {hafalanData.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={h.santri} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{h.santri}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{h.kelas}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <ProgressCircle value={h.juz} max={h.target} />
                        <p className="text-xs text-gray-500">{h.juz}/{h.target} Juz</p>
                      </div>
                    </td>
                    {[h.tahsin, h.tajwid, h.kelancaran].map((val, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-sm font-bold ${val >= 90 ? "text-emerald-600" : val >= 75 ? "text-blue-600" : "text-orange-600"}`}>
                            {val}
                          </span>
                          <div className="h-1 w-12 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                              className={`h-full rounded-full ${val >= 90 ? "bg-emerald-500" : val >= 75 ? "bg-blue-500" : "bg-orange-500"}`}
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(h.last).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="secondary" size="sm">Detail</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
