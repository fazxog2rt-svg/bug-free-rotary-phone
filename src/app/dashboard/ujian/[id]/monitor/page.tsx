"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn, formatTime } from "@/lib/utils";
import {
  AlertTriangle, Eye, Clock, Users, CheckCircle, XCircle,
  Activity, Wifi, Camera, Shield, StopCircle,
} from "lucide-react";

const pesertaData = [
  { id: "1", nama: "Ahmad Fauzi", kelas: "9A", progres: 7, total: 10, sisa: 4823, pelanggaran: 0, status: "mengerjakan" as const, koneksi: "baik" as const },
  { id: "2", nama: "Siti Aisyah", kelas: "9A", progres: 9, total: 10, sisa: 4210, pelanggaran: 0, status: "mengerjakan" as const, koneksi: "baik" as const },
  { id: "3", nama: "Hasan Basri", kelas: "9B", progres: 4, total: 10, sisa: 3987, pelanggaran: 2, status: "peringatan" as const, koneksi: "lemah" as const },
  { id: "4", nama: "Fatimah Zahra", kelas: "9A", progres: 10, total: 10, sisa: 2400, pelanggaran: 0, status: "selesai" as const, koneksi: "baik" as const },
  { id: "5", nama: "Rizki Pratama", kelas: "9B", progres: 3, total: 10, sisa: 5100, pelanggaran: 4, status: "dicurigai" as const, koneksi: "baik" as const },
  { id: "6", nama: "Nurul Hidayah", kelas: "9A", progres: 6, total: 10, sisa: 4560, pelanggaran: 0, status: "mengerjakan" as const, koneksi: "baik" as const },
  { id: "7", nama: "Abdurrahman", kelas: "9B", progres: 8, total: 10, sisa: 3200, pelanggaran: 1, status: "peringatan" as const, koneksi: "baik" as const },
  { id: "8", nama: "Khadijah Amira", kelas: "9A", progres: 5, total: 10, sisa: 4890, pelanggaran: 0, status: "mengerjakan" as const, koneksi: "lemah" as const },
  { id: "9", nama: "Umar Farhan", kelas: "9B", progres: 0, total: 10, sisa: 0, pelanggaran: 0, status: "belum_masuk" as const, koneksi: "offline" as const },
];

const logAktivitas = [
  { id: 1, waktu: "08:32:14", peserta: "Hasan Basri", tipe: "Tab Berpindah", level: "warning" },
  { id: 2, waktu: "08:35:02", peserta: "Rizki Pratama", tipe: "Mencoba Copy", level: "danger" },
  { id: 3, waktu: "08:38:45", peserta: "Rizki Pratama", tipe: "Klik Kanan", level: "danger" },
  { id: 4, waktu: "08:41:20", peserta: "Hasan Basri", tipe: "Tab Berpindah", level: "warning" },
  { id: 5, waktu: "08:45:10", peserta: "Rizki Pratama", tipe: "Ctrl+C Terdeteksi", level: "danger" },
  { id: 6, waktu: "08:48:33", peserta: "Abdurrahman", tipe: "Tab Berpindah", level: "warning" },
  { id: 7, waktu: "08:50:01", peserta: "Rizki Pratama", tipe: "Mencoba Screenshot", level: "danger" },
];

const statusColor = {
  mengerjakan: "green" as const,
  selesai: "blue" as const,
  peringatan: "gold" as const,
  dicurigai: "red" as const,
  belum_masuk: "gray" as const,
};

const statusLabel = {
  mengerjakan: "Mengerjakan",
  selesai: "Selesai",
  peringatan: "Peringatan",
  dicurigai: "Dicurigai",
  belum_masuk: "Belum Masuk",
};

export default function MonitorPage() {
  const [sisaWaktu, setSisaWaktu] = useState(5400);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("semua");

  useEffect(() => {
    const t = setInterval(() => setSisaWaktu((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = pesertaData.filter(
    (p) => filterStatus === "semua" || p.status === filterStatus
  );

  const stats = {
    total: pesertaData.length,
    aktif: pesertaData.filter((p) => p.status === "mengerjakan").length,
    selesai: pesertaData.filter((p) => p.status === "selesai").length,
    pelanggaran: pesertaData.reduce((a, p) => a + p.pelanggaran, 0),
  };

  return (
    <DashboardLayout title="Monitor Ujian Live">
      <div className="space-y-4">
        {/* Header Banner */}
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10 p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <Activity className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-red-800 dark:text-red-300">UJIAN BERLANGSUNG — UTS Matematika Kelas 9</p>
            <p className="text-sm text-red-600 dark:text-red-400">Token: MTK9001 · Sisa waktu: {formatTime(sisaWaktu)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" leftIcon={<Eye className="h-4 w-4" />}>Lihat Soal</Button>
            <Button variant="danger" size="sm" leftIcon={<StopCircle className="h-4 w-4" />}>Hentikan Ujian</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Peserta", value: stats.total, icon: <Users className="h-5 w-5" />, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" },
            { label: "Sedang Mengerjakan", value: stats.aktif, icon: <Clock className="h-5 w-5" />, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" },
            { label: "Selesai", value: stats.selesai, icon: <CheckCircle className="h-5 w-5" />, color: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
            { label: "Total Pelanggaran", value: stats.pelanggaran, icon: <AlertTriangle className="h-5 w-5" />, color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
              <div className={cn("mb-2 flex h-9 w-9 items-center justify-center rounded-xl", s.color)}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Peserta Grid */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              {["semua", "mengerjakan", "peringatan", "dicurigai", "selesai"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    filterStatus === f
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "rounded-2xl border p-4 transition-all",
                    p.pelanggaran >= 3
                      ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/10"
                      : p.pelanggaran > 0
                      ? "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10"
                      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  )}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <Avatar name={p.nama} size="sm" />
                      <span className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800",
                        p.koneksi === "baik" ? "bg-emerald-500" : p.koneksi === "lemah" ? "bg-yellow-500" : "bg-gray-400"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.nama}</p>
                      <p className="text-xs text-gray-500">{p.kelas}</p>
                    </div>
                    <Badge variant={statusColor[p.status]}>{statusLabel[p.status]}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-gray-500">
                        <span>Progres</span>
                        <span>{p.progres}/{p.total} soal</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className={cn("h-full rounded-full transition-all", p.status === "selesai" ? "bg-blue-500" : "bg-emerald-500")}
                          style={{ width: `${(p.progres / p.total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {p.sisa > 0 ? formatTime(p.sisa) : "Selesai"}
                      </span>
                      {p.pelanggaran > 0 && (
                        <span className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
                          <AlertTriangle className="h-3 w-3" />
                          {p.pelanggaran}x pelanggaran
                        </span>
                      )}
                    </div>
                  </div>

                  {p.status === "dicurigai" && (
                    <div className="mt-2 flex gap-2">
                      <Button variant="danger" size="sm" className="flex-1 text-xs">Paksa Submit</Button>
                      <Button variant="secondary" size="sm" className="flex-1 text-xs">Peringatkan</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Log Aktivitas */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <Shield className="h-4 w-4 text-red-500" />
              Log Pelanggaran Real-time
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto">
              {logAktivitas.map((log) => (
                <div
                  key={log.id}
                  className={cn(
                    "flex items-start gap-2 rounded-xl p-3 text-xs",
                    log.level === "danger"
                      ? "bg-red-50 dark:bg-red-900/10"
                      : "bg-yellow-50 dark:bg-yellow-900/10"
                  )}
                >
                  <AlertTriangle className={cn(
                    "h-3.5 w-3.5 flex-shrink-0 mt-0.5",
                    log.level === "danger" ? "text-red-500" : "text-yellow-500"
                  )} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{log.peserta}</p>
                    <p className={log.level === "danger" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}>
                      {log.tipe}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 mt-0.5">{log.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
