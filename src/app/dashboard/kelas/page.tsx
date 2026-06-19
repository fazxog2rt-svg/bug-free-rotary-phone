"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Plus, Users, BookOpen } from "lucide-react";

const kelasData = [
  { id: "1", nama: "Kelas 7A", tingkat: "Tsanawiyah", jurusan: "IPA", wali: "Ustadzah Khadijah", santri: 32, mapel: 8 },
  { id: "2", nama: "Kelas 7B", tingkat: "Tsanawiyah", jurusan: "IPS", wali: "Ustadz Yusuf", santri: 30, mapel: 8 },
  { id: "3", nama: "Kelas 9A", tingkat: "Tsanawiyah", jurusan: "IPA", wali: "Ustadz Rahman", santri: 35, mapel: 10 },
  { id: "4", nama: "Kelas 10A", tingkat: "Aliyah", jurusan: "IPA", wali: "Ustadzah Aisyah", santri: 28, mapel: 12 },
  { id: "5", nama: "Kelas 11A", tingkat: "Aliyah", jurusan: "IPS", wali: "Ustadzah Khadijah", santri: 30, mapel: 12 },
  { id: "6", nama: "Kelas 12A", tingkat: "Aliyah", jurusan: "IPA", wali: "Ustadz Ibrahim", santri: 25, mapel: 14 },
];

const tingkatVariant: Record<string, "blue" | "green"> = { Tsanawiyah: "blue", Aliyah: "green" };

export default function KelasPage() {
  return (
    <DashboardLayout title="Data Kelas">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {["Semua", "Tsanawiyah", "Aliyah"].map((t, i) => (
              <button key={t} className={`rounded-xl px-3 py-2 text-xs font-medium ${i === 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                {t}
              </button>
            ))}
          </div>
          <Button leftIcon={<Plus className="h-4 w-4" />}>Tambah Kelas</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kelasData.map((kelas) => (
            <div key={kelas.id} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 card-hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{kelas.nama}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{kelas.jurusan}</p>
                </div>
                <Badge variant={tingkatVariant[kelas.tingkat]}>{kelas.tingkat}</Badge>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <Avatar name={kelas.wali} size="sm" />
                <div>
                  <p className="text-xs text-gray-500">Wali Kelas</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{kelas.wali}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-3">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{kelas.santri}</p>
                    <p className="text-xs text-gray-500">Santri</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{kelas.mapel}</p>
                    <p className="text-xs text-gray-500">Mapel</p>
                  </div>
                </div>
              </div>

              <Button variant="secondary" size="sm" className="mt-3 w-full">Lihat Detail</Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
