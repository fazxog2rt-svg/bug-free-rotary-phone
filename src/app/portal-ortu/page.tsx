"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { gradeColor } from "@/lib/utils";
import {
  BookOpen, Star, Calendar, Bell, Sun, Moon, TrendingUp, Award,
  BookMarked, Clock, CheckCircle, ChevronRight, Home,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const anak = {
  nama: "Ahmad Fauzi",
  kelas: "9A",
  nis: "2024001",
  tingkat: "Tsanawiyah",
  avatar: undefined as string | undefined,
};

const nilaiTrend = [
  { bulan: "Jan", nilai: 80 },
  { bulan: "Feb", nilai: 82 },
  { bulan: "Mar", nilai: 79 },
  { bulan: "Apr", nilai: 85 },
  { bulan: "Mei", nilai: 87 },
  { bulan: "Jun", nilai: 88 },
];

const nilaiMapel = [
  { mapel: "Matematika", nilai: 88, label: "B+" },
  { mapel: "Bahasa Arab", nilai: 85, label: "B" },
  { mapel: "Fiqh", nilai: 90, label: "A-" },
  { mapel: "IPA", nilai: 82, label: "B" },
  { mapel: "Bahasa Inggris", nilai: 87, label: "B+" },
  { mapel: "Tahfidz", nilai: 92, label: "A" },
];

const jadwalUjian = [
  { id: 1, mapel: "Matematika", jenis: "UAS", tanggal: "25 Jun 2026", waktu: "08:00", status: "akan_datang" },
  { id: 2, mapel: "Bahasa Arab", jenis: "UAS", tanggal: "27 Jun 2026", waktu: "08:00", status: "akan_datang" },
  { id: 3, mapel: "Fiqh", jenis: "UTS", tanggal: "10 Jun 2026", waktu: "10:00", status: "selesai" },
];

const hafalanProgress = [
  { juz: "Juz 28", status: "selesai", nilai: 92 },
  { juz: "Juz 29", status: "selesai", nilai: 89 },
  { juz: "Juz 30", status: "proses", nilai: null },
];

const notifikasi = [
  { id: 1, isi: "Nilai UTS Matematika telah keluar: 88", waktu: "2 jam lalu", baca: false },
  { id: 2, isi: "UAS Bahasa Arab dijadwalkan 27 Juni 2026", waktu: "1 hari lalu", baca: false },
  { id: 3, isi: "Ahmad Fauzi menyetor hafalan Juz 29 dengan nilai 89", waktu: "3 hari lalu", baca: true },
];

const tabs = [
  { id: "nilai", label: "Nilai", icon: Star },
  { id: "jadwal", label: "Jadwal", icon: Calendar },
  { id: "hafalan", label: "Hafalan", icon: BookMarked },
  { id: "notif", label: "Notifikasi", icon: Bell },
];

export default function PortalOrtuPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("nilai");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 px-4 py-3">
        <div className="mx-auto max-w-lg flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl green-gradient">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Portal Orang Tua</p>
            <p className="text-xs text-gray-500">Pesantren Exam Pro</p>
          </div>
          <button onClick={toggleTheme} className="ml-auto rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-5 space-y-5 pb-24">
        {/* Profil Anak */}
        <div className="rounded-3xl green-gradient p-5 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute right-10 bottom-0 h-20 w-20 rounded-full bg-white/10" />
          <div className="relative z-10 flex items-center gap-4">
            <Avatar name={anak.nama} size="xl" />
            <div>
              <p className="text-xl font-bold text-white">{anak.nama}</p>
              <p className="text-emerald-200 text-sm">{anak.kelas} · {anak.tingkat}</p>
              <p className="text-emerald-300 text-xs mt-1 font-mono">NIS: {anak.nis}</p>
            </div>
          </div>
          <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Rata-rata", value: "87.3" },
              { label: "Ranking", value: "#3" },
              { label: "Hafalan", value: "15 Juz" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/15 p-3 text-center">
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-xs text-emerald-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-emerald-700 shadow dark:bg-gray-700 dark:text-emerald-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab: Nilai */}
        {activeTab === "nilai" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Tren Nilai 6 Bulan</h3>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={nilaiTrend}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[60, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="nilai" stroke="#059669" fill="url(#g)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {nilaiMapel.map((n) => (
                <div key={n.mapel} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{n.mapel}</p>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                      <div className={`h-full rounded-full ${n.nilai >= 90 ? "bg-emerald-500" : n.nilai >= 75 ? "bg-blue-500" : "bg-orange-500"}`}
                        style={{ width: `${n.nilai}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${gradeColor(n.nilai)}`}>{n.nilai}</p>
                    <p className="text-xs text-gray-500">{n.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Jadwal */}
        {activeTab === "jadwal" && (
          <div className="space-y-3">
            {jadwalUjian.map((j) => (
              <div key={j.id} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                  j.status === "selesai" ? "bg-gray-100 dark:bg-gray-700" : "bg-emerald-50 dark:bg-emerald-900/20"
                }`}>
                  {j.status === "selesai"
                    ? <CheckCircle className="h-5 w-5 text-gray-400" />
                    : <Calendar className="h-5 w-5 text-emerald-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{j.jenis} {j.mapel}</p>
                  <p className="text-xs text-gray-500">{j.tanggal} · {j.waktu}</p>
                </div>
                <Badge variant={j.status === "selesai" ? "gray" : "green"}>
                  {j.status === "selesai" ? "Selesai" : "Akan Datang"}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Hafalan */}
        {activeTab === "hafalan" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Progress Hafalan</h3>
                <span className="text-xs font-medium text-emerald-600">15 / 30 Juz</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "50%" }} />
              </div>
              <p className="text-xs text-gray-500 text-center">50% Target Selesai</p>
            </div>

            <div className="space-y-2">
              {hafalanProgress.map((h) => (
                <div key={h.juz} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                    h.status === "selesai" ? "bg-emerald-100 dark:bg-emerald-900/20" : "bg-yellow-100 dark:bg-yellow-900/20"
                  }`}>
                    <BookMarked className={`h-5 w-5 ${h.status === "selesai" ? "text-emerald-600" : "text-yellow-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{h.juz}</p>
                    {h.nilai && <p className="text-xs text-gray-500">Nilai: <span className="font-medium text-emerald-600">{h.nilai}</span></p>}
                  </div>
                  <Badge variant={h.status === "selesai" ? "green" : "gold"}>
                    {h.status === "selesai" ? "Selesai" : "Dalam Proses"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Notifikasi */}
        {activeTab === "notif" && (
          <div className="space-y-2">
            {notifikasi.map((n) => (
              <div key={n.id} className={`rounded-2xl border p-4 ${
                !n.baca ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/10" : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}>
                <div className="flex items-start gap-3">
                  <Bell className={`h-4 w-4 mt-0.5 flex-shrink-0 ${!n.baca ? "text-emerald-600" : "text-gray-400"}`} />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{n.isi}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.waktu}</p>
                  </div>
                  {!n.baca && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 px-4 py-2">
        <div className="mx-auto max-w-lg flex justify-around">
          {[
            { icon: Home, label: "Beranda" },
            { icon: Star, label: "Nilai" },
            { icon: BookMarked, label: "Hafalan" },
            { icon: Bell, label: "Notifikasi" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex flex-col items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
