"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Sparkles, X, Copy, Plus, RefreshCw, CheckCircle, ChevronDown } from "lucide-react";

interface GeneratedSoal {
  id: number;
  pertanyaan: string;
  pilihan: string[];
  jawaban: string;
  pembahasan: string;
}

const mockGenerate = async (topik: string, jumlah: number, tingkat: string): Promise<GeneratedSoal[]> => {
  await new Promise((r) => setTimeout(r, 2000));
  return Array.from({ length: jumlah }, (_, i) => ({
    id: i + 1,
    pertanyaan: `Soal tentang ${topik} nomor ${i + 1}: Jika diketahui ${topik} dengan kondisi tertentu, maka hasilnya adalah...`,
    pilihan: ["Opsi A yang benar", "Opsi B yang salah", "Opsi C yang salah", "Opsi D yang salah"],
    jawaban: "A",
    pembahasan: `Pembahasan: Soal ini termasuk tingkat ${tingkat}. Jawaban yang benar adalah A karena sesuai dengan konsep ${topik}.`,
  }));
};

interface Props {
  onClose: () => void;
  onAdd: (soal: GeneratedSoal[]) => void;
}

export function AIGeneratorModal({ onClose, onAdd }: Props) {
  const [topik, setTopik] = useState("");
  const [mapel, setMapel] = useState("Matematika");
  const [tingkat, setTingkat] = useState("sedang");
  const [jumlah, setJumlah] = useState(5);
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState<GeneratedSoal[]>([]);
  const [dipilih, setDipilih] = useState<Set<number>>(new Set());
  const [step, setStep] = useState<"form" | "result">("form");

  const handleGenerate = async () => {
    if (!topik.trim()) return;
    setLoading(true);
    try {
      const soal = await mockGenerate(topik, jumlah, tingkat);
      setHasil(soal);
      setDipilih(new Set(soal.map((s) => s.id)));
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  const togglePilih = (id: number) => {
    setDipilih((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    onAdd(hasil.filter((s) => dipilih.has(s.id)));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-800 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">AI Generator Soal</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Generate soal otomatis dengan kecerdasan buatan</p>
          </div>
          <button onClick={onClose} className="ml-auto rounded-xl p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {step === "form" ? (
            <div className="space-y-4">
              <Input
                label="Topik / Materi Soal"
                placeholder="Contoh: Integral tak tentu, Tajwid Ikhfa, Hukum Waris..."
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Mata Pelajaran</label>
                  <select
                    value={mapel}
                    onChange={(e) => setMapel(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {["Matematika", "Bahasa Arab", "Fiqh", "IPA", "Bahasa Inggris", "Tahfidz", "Akidah"].map(m => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Soal</label>
                  <select
                    value={jenis}
                    onChange={(e) => setJenis(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="pilihan_ganda">Pilihan Ganda</option>
                    <option value="essay">Essay</option>
                    <option value="benar_salah">Benar/Salah</option>
                    <option value="isian_singkat">Isian Singkat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tingkat Kesulitan</label>
                <div className="flex gap-2">
                  {[["mudah", "Mudah", "green"], ["sedang", "Sedang", "gold"], ["sulit", "Sulit", "red"]].map(([val, label, color]) => (
                    <button
                      key={val}
                      onClick={() => setTingkat(val)}
                      className={cn(
                        "flex-1 rounded-xl border-2 py-2 text-sm font-medium transition-all",
                        tingkat === val
                          ? val === "mudah" ? "border-emerald-500 bg-emerald-50 text-emerald-700" :
                            val === "sedang" ? "border-yellow-400 bg-yellow-50 text-yellow-700" :
                            "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Jumlah Soal: <span className="text-emerald-600 font-bold">{jumlah}</span>
                </label>
                <input
                  type="range" min={1} max={20} value={jumlah}
                  onChange={(e) => setJumlah(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span><span>10</span><span>20</span>
                </div>
              </div>

              <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4 text-xs text-purple-700 dark:text-purple-300">
                <p className="font-medium mb-1">✨ AI akan menghasilkan:</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>{jumlah} soal {jenis.replace("_", " ")} tentang <strong>{topik || "..."}</strong></li>
                  <li>Tingkat kesulitan: <strong>{tingkat}</strong></li>
                  <li>Dilengkapi kunci jawaban dan pembahasan</li>
                  <li>Validasi otomatis kualitas soal</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-emerald-600">{dipilih.size}</span> dari {hasil.length} soal dipilih
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setDipilih(new Set(hasil.map(s => s.id)))} className="text-xs text-emerald-600 hover:underline">Pilih Semua</button>
                  <span className="text-gray-300">|</span>
                  <button onClick={() => setDipilih(new Set())} className="text-xs text-gray-500 hover:underline">Batal Semua</button>
                </div>
              </div>

              {hasil.map((soal) => (
                <div
                  key={soal.id}
                  onClick={() => togglePilih(soal.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border-2 p-4 transition-all",
                    dipilih.has(soal.id)
                      ? "border-emerald-400 bg-emerald-50/50 dark:border-emerald-600 dark:bg-emerald-900/10"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 mt-0.5",
                      dipilih.has(soal.id)
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}>
                      {dipilih.has(soal.id) && <CheckCircle className="h-4 w-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{soal.pertanyaan}</p>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {soal.pilihan.map((p, i) => (
                          <div key={i} className={cn(
                            "rounded-lg px-2 py-1 text-xs",
                            String.fromCharCode(65 + i) === soal.jawaban
                              ? "bg-emerald-100 text-emerald-700 font-medium dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                          )}>
                            {String.fromCharCode(65 + i)}. {p}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{soal.pembahasan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-5 flex gap-3">
          {step === "form" ? (
            <>
              <Button variant="secondary" className="flex-1" onClick={onClose}>Batal</Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                leftIcon={<Sparkles className="h-4 w-4" />}
                loading={loading}
                onClick={handleGenerate}
                disabled={!topik.trim()}
              >
                Generate Soal
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" leftIcon={<RefreshCw className="h-4 w-4" />} onClick={() => setStep("form")}>
                Generate Ulang
              </Button>
              <Button
                className="flex-1"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={handleAdd}
                disabled={dipilih.size === 0}
              >
                Tambahkan {dipilih.size} Soal ke Bank
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
