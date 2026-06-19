"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Search, Plus, School, Users, BookOpen, TrendingUp, Settings, ExternalLink, Globe } from "lucide-react";

const pesantrenData = [
  {
    id: "1", nama: "PP Modern Al-Fikr Jakarta", kode: "PP-ALFIKR-001",
    domain: "alfikr.pesantrenexam.id", santri: 1248, guru: 87, ujian_aktif: 3,
    paket: "Enterprise", status: "aktif" as const, admin: "Ahmad Mukhlis",
  },
  {
    id: "2", nama: "PP Darussalam Bandung", kode: "PP-DARUS-002",
    domain: "darussalam.pesantrenexam.id", santri: 890, guru: 62, ujian_aktif: 1,
    paket: "Professional", status: "aktif" as const, admin: "Ustadz Hasan",
  },
  {
    id: "3", nama: "PP Al-Amien Madura", kode: "PP-ALAMIEN-003",
    domain: "alamien.pesantrenexam.id", santri: 2150, guru: 145, ujian_aktif: 5,
    paket: "Enterprise", status: "aktif" as const, admin: "KH. Farid",
  },
  {
    id: "4", nama: "PP Nurul Huda Surabaya", kode: "PP-NURUL-004",
    domain: "nurulhuda.pesantrenexam.id", santri: 560, guru: 40, ujian_aktif: 0,
    paket: "Starter", status: "trial" as const, admin: "Ust. Ibrahim",
  },
  {
    id: "5", nama: "PP Ar-Risalah Ciamis", kode: "PP-ARRIS-005",
    domain: "arrisalah.pesantrenexam.id", santri: 380, guru: 28, ujian_aktif: 0,
    paket: "Starter", status: "suspended" as const, admin: "Ust. Yusuf",
  },
];

const paketConfig = {
  Starter: { color: "gray" as const, max_santri: 500, features: ["CBT", "Bank Soal", "Nilai"] },
  Professional: { color: "blue" as const, max_santri: 2000, features: ["CBT", "Bank Soal", "Nilai", "Tahfidz", "Rapor"] },
  Enterprise: { color: "gold" as const, max_santri: 99999, features: ["Semua Fitur", "AI Generator", "Multi-Kelas", "API Access"] },
};

const statusVariant = { aktif: "green" as const, trial: "gold" as const, suspended: "red" as const };
const statusLabel = { aktif: "Aktif", trial: "Trial", suspended: "Suspended" };

export default function MultiTenantPage() {
  const [search, setSearch] = useState("");
  const [filterPaket, setFilterPaket] = useState("semua");

  const totalSantri = pesantrenData.reduce((a, p) => a + p.santri, 0);
  const totalPesantren = pesantrenData.length;
  const pesantrenAktif = pesantrenData.filter(p => p.status === "aktif").length;

  const filtered = pesantrenData.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.kode.includes(search);
    const matchPaket = filterPaket === "semua" || p.paket === filterPaket;
    return matchSearch && matchPaket;
  });

  return (
    <DashboardLayout title="Multi Tenant — Manajemen Pesantren">
      <div className="space-y-5">
        {/* Platform Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Pesantren", value: totalPesantren, icon: <School className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Pesantren Aktif", value: pesantrenAktif, icon: <Globe className="h-5 w-5" />, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
            { label: "Total Santri", value: totalSantri.toLocaleString(), icon: <Users className="h-5 w-5" />, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20" },
            { label: "Ujian Aktif", value: pesantrenData.reduce((a, p) => a + p.ujian_aktif, 0), icon: <BookOpen className="h-5 w-5" />, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${s.color}`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3">
          <Input
            placeholder="Cari nama atau kode pesantren..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-80"
          />
          <div className="flex gap-2">
            {["semua", "Enterprise", "Professional", "Starter"].map(f => (
              <button
                key={f}
                onClick={() => setFilterPaket(f)}
                className={`rounded-xl px-3 py-2 text-xs font-medium capitalize transition-colors ${
                  filterPaket === f
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Daftarkan Pesantren</Button>
          </div>
        </div>

        {/* Pesantren Table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Pesantren</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Domain</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Santri</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Guru</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Ujian Aktif</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Paket</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(pp => {
                  const paket = paketConfig[pp.paket as keyof typeof paketConfig];
                  return (
                    <tr key={pp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl green-gradient">
                            <School className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{pp.nama}</p>
                            <p className="text-xs font-mono text-gray-500">{pp.kode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:text-emerald-600 flex items-center gap-1">
                          {pp.domain}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">{pp.santri.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{pp.guru}</td>
                      <td className="px-4 py-3 text-center">
                        {pp.ujian_aktif > 0 ? (
                          <span className="flex items-center justify-center gap-1 font-medium text-red-500">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            {pp.ujian_aktif}
                          </span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={paket.color}>{pp.paket}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={statusVariant[pp.status]}>{statusLabel[pp.status]}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="secondary" size="sm" leftIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                            Masuk
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Cards */}
        <div>
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Paket Berlangganan</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(paketConfig).map(([nama, config]) => (
              <div key={nama} className={`rounded-2xl border-2 p-5 ${nama === "Enterprise" ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"}`}>
                <Badge variant={config.color} className="mb-3">{nama}</Badge>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Maks. {config.max_santri === 99999 ? "Unlimited" : config.max_santri.toLocaleString()} santri
                </p>
                <ul className="space-y-1">
                  {config.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
