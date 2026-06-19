"use client";

import { useRef, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Download, Printer, QrCode, BookOpen } from "lucide-react";

const santriList = [
  { id: "1", nis: "2024001", nama: "Ahmad Fauzi", kelas: "9A", tingkat: "Tsanawiyah", jurusan: "IPA" },
  { id: "2", nis: "2024002", nama: "Siti Aisyah", kelas: "11A", tingkat: "Aliyah", jurusan: "IPS" },
  { id: "3", nis: "2024003", nama: "Hasan Basri", kelas: "7B", tingkat: "Tsanawiyah", jurusan: "IPA" },
  { id: "4", nis: "2024004", nama: "Fatimah Zahra", kelas: "12A", tingkat: "Aliyah", jurusan: "IPA" },
  { id: "5", nis: "2024005", nama: "Muhammad Rizki", kelas: "8C", tingkat: "Tsanawiyah", jurusan: "IPS" },
  { id: "6", nis: "2024006", nama: "Nurul Hidayah", kelas: "10B", tingkat: "Aliyah", jurusan: "IPA" },
];

function QRCard({ santri }: { santri: typeof santriList[0] }) {
  return (
    <div
      id={`card-${santri.id}`}
      className="relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white dark:border-emerald-700 dark:bg-gray-800"
      style={{ width: "320px", minHeight: "180px" }}
    >
      {/* Green header strip */}
      <div className="green-gradient px-4 py-3 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-white" />
        <div>
          <p className="text-white font-bold text-sm leading-tight">Pesantren Exam Pro</p>
          <p className="text-emerald-200 text-xs">Kartu Identitas Santri</p>
        </div>
        <div className="ml-auto">
          <p className="text-yellow-300 text-xs font-bold font-mono">{santri.nis}</p>
        </div>
      </div>

      <div className="flex gap-4 p-4">
        {/* Photo + QR */}
        <div className="flex flex-col items-center gap-2">
          <Avatar name={santri.nama} size="lg" />
          {/* QR placeholder */}
          <div className="h-16 w-16 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
            <QrCode className="h-10 w-10 text-gray-800 dark:text-gray-200" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1">
          <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{santri.nama}</p>
          <div className="space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            <p><span className="font-medium text-gray-700 dark:text-gray-300">Kelas:</span> {santri.kelas}</p>
            <p><span className="font-medium text-gray-700 dark:text-gray-300">Tingkat:</span> {santri.tingkat}</p>
            <p><span className="font-medium text-gray-700 dark:text-gray-300">Jurusan:</span> {santri.jurusan}</p>
          </div>
          <div className="mt-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium text-center">
              Scan untuk login ujian
            </p>
          </div>
        </div>
      </div>

      {/* Gold bottom strip */}
      <div className="h-1 w-full gold-gradient" />
    </div>
  );
}

export default function QRCardPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = santriList.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
  );

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <DashboardLayout title="QR Card Santri">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Cari santri..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-80"
          />
          <div className="ml-auto flex gap-2">
            <Button
              variant="secondary"
              leftIcon={<Download className="h-4 w-4" />}
              disabled={selected.size === 0}
            >
              Export PDF ({selected.size})
            </Button>
            <Button
              leftIcon={<Printer className="h-4 w-4" />}
              disabled={selected.size === 0}
              onClick={() => window.print()}
            >
              Cetak Kartu
            </Button>
          </div>
        </div>

        {/* Select All */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.size === filtered.length && filtered.length > 0}
              onChange={() => {
                if (selected.size === filtered.length) setSelected(new Set());
                else setSelected(new Set(filtered.map(s => s.id)));
              }}
              className="rounded"
            />
            Pilih Semua ({filtered.length})
          </label>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
          {filtered.map(santri => (
            <div key={santri.id} className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.has(santri.id)}
                  onChange={() => toggleSelect(santri.id)}
                  className="rounded"
                />
                Pilih kartu ini
              </label>
              <div className={`transition-all ${selected.has(santri.id) ? "ring-2 ring-emerald-500 ring-offset-2 rounded-2xl" : ""}`}>
                <QRCard santri={santri} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
