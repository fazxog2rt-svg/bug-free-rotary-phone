"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Plus, Search, Clock, Users, BookOpen, Play, Eye, Copy, Trash2, Calendar,
} from "lucide-react";

const ujianData = [
  {
    id: "1", judul: "UTS Matematika Kelas 9", mapel: "Matematika", kelas: "9A, 9B, 9C",
    tanggal: "2026-06-20", durasi: 90, total_soal: 50, peserta: 45,
    status: "aktif" as const, jenis: "uts" as const, token: "MTK9001",
  },
  {
    id: "2", judul: "Ujian Harian Fiqh", mapel: "Fiqh", kelas: "8A",
    tanggal: "2026-06-19", durasi: 60, total_soal: 30, peserta: 30,
    status: "aktif" as const, jenis: "harian" as const, token: "FQH8001",
  },
  {
    id: "3", judul: "UAS Bahasa Arab Kelas 11", mapel: "Bahasa Arab", kelas: "11A, 11B",
    tanggal: "2026-06-25", durasi: 120, total_soal: 60, peserta: 0,
    status: "draft" as const, jenis: "uas" as const, token: "ARB1101",
  },
  {
    id: "4", judul: "Imtihan Nihayah Kelas 12", mapel: "Semua Mapel", kelas: "12A, 12B, 12C",
    tanggal: "2026-07-01", durasi: 180, total_soal: 100, peserta: 0,
    status: "draft" as const, jenis: "imtihan" as const, token: "IMT1201",
  },
  {
    id: "5", judul: "Ujian Tahfidz Juz 30", mapel: "Tahfidz", kelas: "Semua Kelas",
    tanggal: "2026-06-15", durasi: 45, total_soal: 20, peserta: 120,
    status: "selesai" as const, jenis: "tahfidz" as const, token: "THF0001",
  },
];

const statusVariant = { aktif: "green" as const, draft: "gray" as const, selesai: "blue" as const };
const statusLabel = { aktif: "Berlangsung", draft: "Draft", selesai: "Selesai" };
const jenisLabel = {
  harian: "Ujian Harian", uts: "UTS", uas: "UAS", imtihan: "Imtihan", tahfidz: "Tahfidz",
};

export default function UjianPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("semua");

  const filtered = ujianData.filter((u) => {
    const matchSearch = u.judul.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "semua" || u.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout title="Manajemen Ujian">
      <div className="space-y-5">
        {/* Action Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Cari ujian..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="sm:w-80"
          />
          <div className="flex gap-2">
            {["semua", "aktif", "draft", "selesai"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-xl px-3 py-2 text-xs font-medium capitalize transition-colors ${
                  activeFilter === f
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Buat Ujian</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((ujian) => (
            <div
              key={ujian.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 card-hover dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                  <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <Badge variant={statusVariant[ujian.status]}>{statusLabel[ujian.status]}</Badge>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{ujian.judul}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{ujian.kelas}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2 text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ujian.total_soal}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Soal</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2 text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ujian.durasi}m</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Durasi</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2 text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ujian.peserta}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Peserta</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(ujian.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>

              {ujian.token && (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-700/50 px-3 py-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Token:</span>
                  <code className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{ujian.token}</code>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                {ujian.status === "aktif" && (
                  <Button variant="primary" size="sm" className="flex-1" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                    Monitor
                  </Button>
                )}
                {ujian.status === "draft" && (
                  <Button variant="primary" size="sm" className="flex-1" leftIcon={<Play className="h-3.5 w-3.5" />}>
                    Mulai
                  </Button>
                )}
                {ujian.status === "selesai" && (
                  <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                    Hasil
                  </Button>
                )}
                <button className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <Copy className="h-4 w-4" />
                </button>
                <button className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 dark:border-gray-700 dark:hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 py-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tidak ada ujian ditemukan</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
