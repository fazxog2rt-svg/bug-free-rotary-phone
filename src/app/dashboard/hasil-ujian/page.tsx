"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { gradeColor } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Download, TrendingUp, Users, Award, AlertCircle, ChevronDown } from "lucide-react";

const hasilData = [
  { santri: "Fatimah Zahra", kelas: "9A", nilai: 97, benar: 48, salah: 2, durasi: "42 menit", pelanggaran: 0, status: "lulus" as const },
  { santri: "Siti Aisyah", kelas: "9A", nilai: 92, benar: 46, salah: 4, durasi: "55 menit", pelanggaran: 0, status: "lulus" as const },
  { santri: "Ahmad Fauzi", kelas: "9A", nilai: 88, benar: 44, salah: 6, durasi: "67 menit", pelanggaran: 0, status: "lulus" as const },
  { santri: "Abdurrahman", kelas: "9B", nilai: 84, benar: 42, salah: 8, durasi: "71 menit", pelanggaran: 1, status: "lulus" as const },
  { santri: "Nurul Hidayah", kelas: "9A", nilai: 78, benar: 39, salah: 11, durasi: "80 menit", pelanggaran: 0, status: "lulus" as const },
  { santri: "Khadijah Amira", kelas: "9B", nilai: 74, benar: 37, salah: 13, durasi: "85 menit", pelanggaran: 0, status: "tidak_lulus" as const },
  { santri: "Hasan Basri", kelas: "9B", nilai: 66, benar: 33, salah: 17, durasi: "89 menit", pelanggaran: 2, status: "tidak_lulus" as const },
  { santri: "Rizki Pratama", kelas: "9B", nilai: 42, benar: 21, salah: 29, durasi: "90 menit", pelanggaran: 4, status: "tidak_lulus" as const },
];

const distribusiData = [
  { range: "0-49", jumlah: 1 },
  { range: "50-59", jumlah: 0 },
  { range: "60-69", jumlah: 1 },
  { range: "70-79", jumlah: 2 },
  { range: "80-89", jumlah: 2 },
  { range: "90-100", jumlah: 2 },
];

const analisisButir = [
  { soal: "S1", benar: 87, tingkat: "Mudah" },
  { soal: "S2", benar: 74, tingkat: "Mudah" },
  { soal: "S3", benar: 62, tingkat: "Sedang" },
  { soal: "S4", benar: 56, tingkat: "Sedang" },
  { soal: "S5", benar: 81, tingkat: "Mudah" },
  { soal: "S6", benar: 45, tingkat: "Sulit" },
  { soal: "S7", benar: 93, tingkat: "Mudah" },
  { soal: "S8", benar: 38, tingkat: "Sulit" },
  { soal: "S9", benar: 68, tingkat: "Sedang" },
  { soal: "S10", benar: 79, tingkat: "Mudah" },
];

export default function HasilUjianPage() {
  const [selectedSantri, setSelectedSantri] = useState<string | null>(null);
  const rataRata = Math.round(hasilData.reduce((a, h) => a + h.nilai, 0) / hasilData.length);
  const lulus = hasilData.filter(h => h.status === "lulus").length;

  return (
    <DashboardLayout title="Hasil & Analisis Ujian">
      <div className="space-y-5">
        {/* Ujian Selector */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            UTS Matematika Kelas 9
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export PDF</Button>
          <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export Excel</Button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Rata-rata Nilai", value: rataRata, icon: <TrendingUp className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Peserta Ujian", value: hasilData.length, icon: <Users className="h-5 w-5" />, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
            { label: "Lulus", value: `${lulus}/${hasilData.length}`, icon: <Award className="h-5 w-5" />, color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
            { label: "Tingkat Kelulusan", value: `${Math.round((lulus / hasilData.length) * 100)}%`, icon: <Award className="h-5 w-5" />, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${kpi.color}`}>{kpi.icon}</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Distribusi Nilai</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={distribusiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#059669" radius={[4, 4, 0, 0]} name="Jumlah Santri" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Analisis Butir Soal (% Benar)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analisisButir}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="soal" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip formatter={(v) => [`${v}%`, "Benar"]} />
                <Bar dataKey="benar" radius={[4, 4, 0, 0]}
                  fill="#059669"
                  label={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hasil Per Santri */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Hasil Per Santri</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Ranking</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Santri</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Nilai</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Benar/Salah</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Durasi</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Pelanggaran</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {hasilData.map((h, i) => (
                  <tr key={h.santri} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
                        i === 0 ? "gold-gradient" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-200 !text-gray-600"
                      }`}>
                        {i + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={h.santri} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{h.santri}</p>
                          <p className="text-xs text-gray-500">{h.kelas}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-lg font-bold ${gradeColor(h.nilai)}`}>{h.nilai}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      <span className="text-emerald-600 font-medium">{h.benar} ✓</span>
                      {" / "}
                      <span className="text-red-500 font-medium">{h.salah} ✗</span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{h.durasi}</td>
                    <td className="px-4 py-3 text-center">
                      {h.pelanggaran > 0 ? (
                        <span className="flex items-center justify-center gap-1 text-xs text-red-600 font-medium">
                          <AlertCircle className="h-3 w-3" />
                          {h.pelanggaran}x
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={h.status === "lulus" ? "green" : "red"}>
                        {h.status === "lulus" ? "Lulus" : "Tidak Lulus"}
                      </Badge>
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
