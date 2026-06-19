"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Bell, CheckCircle, AlertCircle, Info, Star } from "lucide-react";

const notifikasi = [
  { id: 1, judul: "Ujian UTS Matematika Dimulai", isi: "Ujian UTS Matematika kelas 9 akan dimulai dalam 30 menit.", tipe: "ujian", waktu: "5 menit lalu", baca: false },
  { id: 2, judul: "Nilai Telah Diinput", isi: "Ustadz Rahman telah menginput nilai ujian Fiqh kelas 9A.", tipe: "nilai", waktu: "1 jam lalu", baca: false },
  { id: 3, judul: "Setoran Hafalan Diterima", isi: "Setoran hafalan Juz 25 Ahmad Fauzi telah diterima oleh Musyrif Ibrahim.", tipe: "tahfidz", waktu: "2 jam lalu", baca: true },
  { id: 4, judul: "Peringatan Anti-Kecurangan", isi: "Santri Hasan Basri terdeteksi berpindah tab saat ujian IPA.", tipe: "peringatan", waktu: "3 jam lalu", baca: false },
  { id: 5, judul: "Ujian UAS Dijadwalkan", isi: "UAS Bahasa Arab Kelas 11 dijadwalkan pada 25 Juni 2026.", tipe: "ujian", waktu: "1 hari lalu", baca: true },
  { id: 6, judul: "Rapor Semester Siap", isi: "Rapor digital semester 1 sudah dapat diunduh oleh orang tua.", tipe: "rapor", waktu: "2 hari lalu", baca: true },
];

const tipeIcon: Record<string, React.ReactNode> = {
  ujian: <Bell className="h-4 w-4" />,
  nilai: <Star className="h-4 w-4" />,
  tahfidz: <CheckCircle className="h-4 w-4" />,
  peringatan: <AlertCircle className="h-4 w-4" />,
  rapor: <Info className="h-4 w-4" />,
};

const tipeBg: Record<string, string> = {
  ujian: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  nilai: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  tahfidz: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  peringatan: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  rapor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function NotifikasiPage() {
  const belum = notifikasi.filter(n => !n.baca).length;

  return (
    <DashboardLayout title="Notifikasi">
      <div className="max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {belum} notifikasi belum dibaca
          </p>
          <button className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
            Tandai semua sudah dibaca
          </button>
        </div>

        <div className="space-y-2">
          {notifikasi.map((n) => (
            <div
              key={n.id}
              className={`flex gap-3 rounded-2xl border p-4 transition-colors ${
                !n.baca
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/10"
                  : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
              }`}
            >
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${tipeBg[n.tipe]}`}>
                {tipeIcon[n.tipe]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.judul}</p>
                  {!n.baca && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500 mt-1" />}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{n.isi}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.waktu}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
