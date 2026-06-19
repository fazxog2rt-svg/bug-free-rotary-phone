"use client";

import { Badge } from "@/components/ui/Badge";
import { Clock, Users, BookOpen } from "lucide-react";

const activeExams = [
  {
    id: "1",
    judul: "UTS Matematika Kelas 9",
    mapel: "Matematika",
    peserta: 42,
    total: 45,
    waktu_sisa: "01:23:15",
    status: "berlangsung",
  },
  {
    id: "2",
    judul: "Ujian Harian Fiqh",
    mapel: "Fiqh",
    peserta: 28,
    total: 30,
    waktu_sisa: "00:45:00",
    status: "berlangsung",
  },
  {
    id: "3",
    judul: "UAS Bahasa Arab Kelas 11",
    mapel: "Bahasa Arab",
    peserta: 0,
    total: 38,
    waktu_sisa: "Besok 08:00",
    status: "terjadwal",
  },
];

export function ActiveExams() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Ujian Aktif</h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
          {activeExams.filter(e => e.status === "berlangsung").length}
        </span>
      </div>
      <div className="space-y-3">
        {activeExams.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-700"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{exam.judul}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {exam.peserta}/{exam.total}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {exam.waktu_sisa}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(exam.peserta / exam.total) * 100}%` }}
                />
              </div>
            </div>
            <Badge variant={exam.status === "berlangsung" ? "green" : "blue"}>
              {exam.status === "berlangsung" ? "Live" : "Terjadwal"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
