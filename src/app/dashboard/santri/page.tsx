"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { TableSkeleton } from "@/components/ui/Skeleton";
import {
  Search, Plus, Upload, Download, Filter, MoreVertical, QrCode, Edit, Trash2,
} from "lucide-react";

const santriData = [
  { id: "1", nis: "2024001", name: "Ahmad Fauzi", kelas: "9A", tingkat: "Tsanawiyah", hafalan: "Juz 15", nilai: 88, status: "aktif" as const },
  { id: "2", nis: "2024002", name: "Siti Aisyah", kelas: "11A", tingkat: "Aliyah", hafalan: "Juz 25", nilai: 94, status: "aktif" as const },
  { id: "3", nis: "2024003", name: "Hasan Basri", kelas: "7B", tingkat: "Tsanawiyah", hafalan: "Juz 5", nilai: 76, status: "aktif" as const },
  { id: "4", nis: "2024004", name: "Fatimah Zahra", kelas: "12A", tingkat: "Aliyah", hafalan: "Juz 30", nilai: 97, status: "aktif" as const },
  { id: "5", nis: "2024005", name: "Muhammad Rizki", kelas: "8C", tingkat: "Tsanawiyah", hafalan: "Juz 10", nilai: 82, status: "aktif" as const },
  { id: "6", nis: "2024006", name: "Nurul Hidayah", kelas: "10B", tingkat: "Aliyah", hafalan: "Juz 20", nilai: 91, status: "tidak_aktif" as const },
  { id: "7", nis: "2024007", name: "Abdurrahman", kelas: "9B", tingkat: "Tsanawiyah", hafalan: "Juz 18", nilai: 85, status: "aktif" as const },
  { id: "8", nis: "2024008", name: "Khadijah Amira", kelas: "11B", tingkat: "Aliyah", hafalan: "Juz 22", nilai: 90, status: "aktif" as const },
];

export default function SantriPage() {
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [filter, setFilter] = useState<"semua" | "aktif" | "tidak_aktif">("semua");

  const filtered = santriData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
    const matchFilter = filter === "semua" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout title="Data Santri">
      <div className="space-y-5">
        {/* Actions Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Cari nama atau NIS santri..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="sm:w-80"
          />
          <div className="flex gap-2">
            {["semua", "aktif", "tidak_aktif"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`rounded-xl px-3 py-2 text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="secondary" size="md" leftIcon={<Upload className="h-4 w-4" />}>
              Import
            </Button>
            <Button variant="secondary" size="md" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Tambah Santri
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Santri", value: santriData.length },
            { label: "Santri Aktif", value: santriData.filter(s => s.status === "aktif").length },
            { label: "Tidak Aktif", value: santriData.filter(s => s.status !== "aktif").length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Santri</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">NIS</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Kelas</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Hafalan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Rata-rata Nilai</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loading ? (
                  <tr><td colSpan={7} className="p-4"><TableSkeleton /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tidak ada santri ditemukan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((santri) => (
                    <tr key={santri.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={santri.name} size="sm" />
                          <span className="font-medium text-gray-900 dark:text-white">{santri.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{santri.nis}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{santri.kelas}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{santri.tingkat}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="green">{santri.hafalan}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: `${santri.nilai}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{santri.nilai}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={santri.status === "aktif" ? "green" : "gray"}>
                          {santri.status === "aktif" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                            <QrCode className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Menampilkan {filtered.length} dari {santriData.length} santri
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`h-8 w-8 rounded-lg text-xs font-medium ${
                    p === 1
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
