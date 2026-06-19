"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { gradeColor } from "@/lib/utils";
import { Download, FileText, Star } from "lucide-react";

const nilaiData = [
  { santri: "Fatimah Zahra", kelas: "12A", matematika: 97, bahasa_arab: 95, fiqh: 98, ipa: 92, bahasa_inggris: 94, tahfidz: 99, rata_rata: 95.8 },
  { santri: "Siti Aisyah", kelas: "11A", matematika: 91, bahasa_arab: 96, fiqh: 93, ipa: 88, bahasa_inggris: 90, tahfidz: 97, rata_rata: 92.5 },
  { santri: "Ahmad Fauzi", kelas: "9A", matematika: 88, bahasa_arab: 85, fiqh: 90, ipa: 82, bahasa_inggris: 87, tahfidz: 92, rata_rata: 87.3 },
  { santri: "Abdurrahman", kelas: "9B", matematika: 85, bahasa_arab: 88, fiqh: 87, ipa: 79, bahasa_inggris: 84, tahfidz: 90, rata_rata: 85.5 },
  { santri: "Hasan Basri", kelas: "7B", matematika: 76, bahasa_arab: 80, fiqh: 82, ipa: 72, bahasa_inggris: 75, tahfidz: 78, rata_rata: 77.2 },
];

const mapelList = ["matematika", "bahasa_arab", "fiqh", "ipa", "bahasa_inggris", "tahfidz"];
const mapelLabel: Record<string, string> = {
  matematika: "MTK", bahasa_arab: "B.Arab", fiqh: "Fiqh", ipa: "IPA", bahasa_inggris: "B.Ing", tahfidz: "Tahfidz",
};

export default function NilaiPage() {
  return (
    <DashboardLayout title="Nilai & Rapor Digital">
      <div className="space-y-5">
        {/* Action */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {["UTS", "UAS", "Harian", "Tahfidz"].map((t) => (
              <button
                key={t}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                  t === "UTS"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export Excel</Button>
            <Button leftIcon={<FileText className="h-4 w-4" />}>Cetak Rapor</Button>
          </div>
        </div>

        {/* Ranking Podium */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Ranking Kelas
          </h3>
          <div className="flex items-end justify-center gap-4 mb-4">
            {[nilaiData[1], nilaiData[0], nilaiData[2]].map((s, i) => {
              const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
              const heights = ["h-24", "h-32", "h-20"];
              const heights2 = [heights[1], heights[0], heights[2]];
              return (
                <div key={s.santri} className="flex flex-col items-center gap-2">
                  <Avatar name={s.santri} size={rank === 1 ? "lg" : "md"} />
                  <p className="text-xs font-medium text-gray-900 dark:text-white text-center max-w-[80px] truncate">{s.santri}</p>
                  <p className="text-sm font-bold text-emerald-600">{s.rata_rata}</p>
                  <div className={`${heights2[i]} w-16 rounded-t-xl flex items-center justify-center text-white font-bold text-lg ${
                    rank === 1 ? "gold-gradient" : rank === 2 ? "bg-gray-400" : "bg-amber-600"
                  }`}>
                    {rank}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Santri</th>
                  {mapelList.map((m) => (
                    <th key={m} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">{mapelLabel[m]}</th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Rata-rata</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {nilaiData.map((row, idx) => (
                  <tr key={row.santri} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-center text-sm font-bold text-gray-500 dark:text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={row.santri} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-xs">{row.santri}</p>
                          <p className="text-xs text-gray-500">{row.kelas}</p>
                        </div>
                      </div>
                    </td>
                    {mapelList.map((m) => {
                      const val = row[m as keyof typeof row] as number;
                      return (
                        <td key={m} className={`px-3 py-3 text-center text-sm font-semibold ${gradeColor(val)}`}>
                          {val}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{row.rata_rata}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={row.rata_rata >= 75 ? "green" : "red"}>
                        {row.rata_rata >= 75 ? "Lulus" : "Tidak Lulus"}
                      </Badge>
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
