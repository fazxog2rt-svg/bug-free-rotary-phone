"use client";

import { useRef, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { gradeColor } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Printer, Download, Search, Eye, BookOpen, Star, Calendar, CheckSquare } from "lucide-react";

const santriList = [
  { id: "1", nis: "2024001", nama: "Ahmad Fauzi", kelas: "9A", wali: "Bapak Fauzi", status: "aktif" as const },
  { id: "2", nis: "2024002", nama: "Siti Aisyah", kelas: "11A", wali: "Ibu Aisyah", status: "aktif" as const },
  { id: "3", nis: "2024004", nama: "Fatimah Zahra", kelas: "12A", wali: "Bapak Zahra", status: "aktif" as const },
];

const nilaiRapor = {
  akademik: [
    { mapel: "Matematika", kkm: 75, uts: 86, uas: 90, tugas: 88, nilai_akhir: 88, predikat: "B+" },
    { mapel: "Bahasa Arab", kkm: 75, uts: 82, uas: 88, tugas: 90, nilai_akhir: 87, predikat: "B+" },
    { mapel: "Fiqh", kkm: 75, uts: 90, uas: 94, tugas: 92, nilai_akhir: 92, predikat: "A-" },
    { mapel: "IPA", kkm: 75, uts: 80, uas: 84, tugas: 82, nilai_akhir: 82, predikat: "B" },
    { mapel: "Bahasa Inggris", kkm: 75, uts: 85, uas: 89, tugas: 87, nilai_akhir: 87, predikat: "B+" },
  ],
  tahfidz: { juz_selesai: 15, nilai_tahsin: 88, nilai_tajwid: 90, nilai_kelancaran: 85, predikat: "Baik" },
  akhlak: { kedisiplinan: "A", sopan_santun: "A", tanggung_jawab: "B+", kerja_sama: "A-" },
  kehadiran: { hadir: 98, sakit: 2, izin: 1, alpha: 0, persen: 97 },
};

function RaporPreview({ santri }: { santri: typeof santriList[0] }) {
  return (
    <div id="rapor-preview" className="bg-white text-gray-900 rounded-2xl border-2 border-gray-200 overflow-hidden" style={{ width: "100%", maxWidth: "740px" }}>
      {/* Header */}
      <div className="green-gradient p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-white" />
          <div className="text-left">
            <p className="text-xl font-black text-white">PONDOK PESANTREN MODERN AL-FIKR</p>
            <p className="text-emerald-200 text-sm">Jl. Pesantren No. 1 Jakarta · info@alfikr.ac.id</p>
          </div>
        </div>
        <div className="mt-3 inline-block rounded-xl bg-white/20 px-6 py-2">
          <p className="text-white font-bold text-lg tracking-wider">RAPOR DIGITAL SEMESTER GANJIL</p>
          <p className="text-emerald-200 text-sm">Tahun Pelajaran 2025/2026</p>
        </div>
      </div>

      {/* Student Info */}
      <div className="border-b border-gray-200 p-5">
        <div className="flex items-center gap-4">
          <Avatar name={santri.nama} size="xl" />
          <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
            {[
              ["Nama Santri", santri.nama],
              ["NIS", santri.nis],
              ["Kelas", santri.kelas],
              ["Wali Santri", santri.wali],
            ].map(([label, val]) => (
              <div key={label}>
                <span className="text-gray-500">{label}: </span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
              Foto
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Nilai Akademik */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
            <Star className="h-4 w-4 text-yellow-500" />
            Nilai Akademik
          </h3>
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-50">
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 border-b border-gray-200">Mata Pelajaran</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">KKM</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">UTS</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">UAS</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">Tugas</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">Akhir</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 border-b border-gray-200">Predikat</th>
              </tr>
            </thead>
            <tbody>
              {nilaiRapor.akademik.map((n, i) => (
                <tr key={n.mapel} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 py-2 font-medium">{n.mapel}</td>
                  <td className="px-3 py-2 text-center text-gray-500">{n.kkm}</td>
                  <td className="px-3 py-2 text-center">{n.uts}</td>
                  <td className="px-3 py-2 text-center">{n.uas}</td>
                  <td className="px-3 py-2 text-center">{n.tugas}</td>
                  <td className={`px-3 py-2 text-center font-bold ${gradeColor(n.nilai_akhir)}`}>{n.nilai_akhir}</td>
                  <td className="px-3 py-2 text-center">
                    <Badge variant={n.nilai_akhir >= 90 ? "green" : n.nilai_akhir >= 75 ? "blue" : "red"}>
                      {n.predikat}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tahfidz & Akhlak */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              Nilai Tahfidz
            </h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Juz Selesai</span>
                <span className="font-bold text-emerald-600">{nilaiRapor.tahfidz.juz_selesai} Juz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tahsin</span>
                <span className="font-bold">{nilaiRapor.tahfidz.nilai_tahsin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tajwid</span>
                <span className="font-bold">{nilaiRapor.tahfidz.nilai_tajwid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kelancaran</span>
                <span className="font-bold">{nilaiRapor.tahfidz.nilai_kelancaran}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-1">
                <span className="font-medium">Predikat</span>
                <Badge variant="green">{nilaiRapor.tahfidz.predikat}</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-800 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-600" />
              Nilai Akhlak & Kehadiran
            </h4>
            <div className="space-y-1.5 text-sm">
              {Object.entries(nilaiRapor.akhlak).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-500 capitalize">{k.replace(/_/g, " ")}</span>
                  <Badge variant="green">{v}</Badge>
                </div>
              ))}
              <div className="flex justify-between border-t border-gray-100 pt-1">
                <span className="text-gray-500">Kehadiran</span>
                <span className="font-bold text-emerald-600">{nilaiRapor.kehadiran.persen}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            {["Wali Kelas", "Mudir Pesantren", "Orang Tua/Wali"].map((label) => (
              <div key={label}>
                <p className="text-gray-500 mb-12">{label}</p>
                <div className="border-t border-gray-400 pt-1">
                  <p className="font-medium text-gray-700">(....................)</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <p>Diterbitkan secara digital · {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RaporPage() {
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<typeof santriList[0] | null>(null);

  const filtered = santriList.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
  );

  return (
    <DashboardLayout title="Rapor Digital">
      {preview ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setPreview(null)}>← Kembali</Button>
            <Button leftIcon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>Cetak PDF</Button>
            <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Unduh PDF</Button>
          </div>
          <RaporPreview santri={preview} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Cari santri..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="w-80"
            />
            <Button leftIcon={<Printer className="h-4 w-4" />}>Cetak Semua</Button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Santri</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Kelas</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.nama} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{s.nama}</p>
                          <p className="text-xs text-gray-500">{s.nis}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{s.kelas}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="green">Siap Cetak</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="secondary" size="sm" leftIcon={<Eye className="h-3.5 w-3.5" />} onClick={() => setPreview(s)}>
                          Preview
                        </Button>
                        <Button size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>PDF</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
