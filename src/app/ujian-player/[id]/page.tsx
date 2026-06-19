"use client";

import { useState, useEffect, useCallback } from "react";
import { useExamTimer } from "@/hooks/useExamTimer";
import { useAntiCheat } from "@/hooks/useAntiCheat";
import { cn } from "@/lib/utils";
import {
  Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle,
  Clock, BookOpen, Send, X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const soalUjian = [
  {
    id: 1, soal: "Berapakah hasil dari integral ∫(3x² + 2x - 1)dx?",
    pilihan: ["x³ + x² - x + C", "x³ + x + C", "3x³ + x² - x + C", "x² + 2x + C"],
    jawaban: "A",
  },
  {
    id: 2, soal: "Jika f(x) = 2x³ - 5x + 3, maka f'(x) adalah...",
    pilihan: ["6x² - 5", "6x - 5", "2x² - 5", "6x² + 5"],
    jawaban: "A",
  },
  {
    id: 3, soal: "Nilai dari lim(x→2) (x² - 4)/(x - 2) adalah...",
    pilihan: ["0", "2", "4", "Tidak terdefinisi"],
    jawaban: "C",
  },
  {
    id: 4, soal: "Persamaan garis singgung kurva y = x² pada titik (1,1) adalah...",
    pilihan: ["y = 2x - 1", "y = 2x + 1", "y = x + 1", "y = x - 1"],
    jawaban: "A",
  },
  {
    id: 5, soal: "Deret geometri 2, 6, 18, 54, ... memiliki rasio...",
    pilihan: ["2", "3", "4", "6"],
    jawaban: "B",
  },
  {
    id: 6, soal: "Determinan matriks [[2,3],[1,4]] adalah...",
    pilihan: ["5", "11", "8", "-5"],
    jawaban: "A",
  },
  {
    id: 7, soal: "Nilai sin(60°) adalah...",
    pilihan: ["½", "√2/2", "√3/2", "1"],
    jawaban: "C",
  },
  {
    id: 8, soal: "Himpunan penyelesaian x² - 5x + 6 = 0 adalah...",
    pilihan: ["{2, 3}", "{-2, 3}", "{2, -3}", "{-2, -3}"],
    jawaban: "A",
  },
  {
    id: 9, soal: "Jika log₂(8) = x, maka x adalah...",
    pilihan: ["2", "3", "4", "8"],
    jawaban: "B",
  },
  {
    id: 10, soal: "Nilai dari ⁵C₂ (Kombinasi 5 pilih 2) adalah...",
    pilihan: ["10", "20", "5", "15"],
    jawaban: "A",
  },
];

type Status = "belum" | "dijawab" | "ragu";

export default function UjianPlayerPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [jawaban, setJawaban] = useState<Record<number, string>>({});
  const [ragu, setRagu] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [fullscreenDenied, setFullscreenDenied] = useState(false);

  const { pelanggaran } = useAntiCheat(!submitted);

  const handleTimeUp = useCallback(() => {
    setSubmitted(true);
  }, []);

  const { display, persen, kritis } = useExamTimer(90 * 60, handleTimeUp);

  useEffect(() => {
    if (pelanggaran.length > 0) {
      setShowWarning(true);
      const t = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(t);
    }
  }, [pelanggaran.length]);

  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => setFullscreenDenied(true));
    }
    return () => {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    };
  }, []);

  const current = soalUjian[currentIdx];
  const totalDijawab = Object.keys(jawaban).length;
  const nilai = submitted
    ? Math.round(
        (soalUjian.filter((s) => jawaban[s.id] === s.jawaban).length / soalUjian.length) * 100
      )
    : 0;

  const statusSoal = (id: number): Status => {
    if (jawaban[id]) return "dijawab";
    if (ragu.has(id)) return "ragu";
    return "belum";
  };

  const toggleRagu = () => {
    setRagu((prev) => {
      const next = new Set(prev);
      if (next.has(current.id)) next.delete(current.id);
      else next.add(current.id);
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowSubmitModal(false);
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
  };

  if (submitted) {
    const benar = soalUjian.filter((s) => jawaban[s.id] === s.jawaban).length;
    const salah = soalUjian.length - benar;
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-gray-800 shadow-2xl p-8 text-center">
          <div className={cn(
            "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full",
            nilai >= 75 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"
          )}>
            <CheckCircle className={cn("h-10 w-10", nilai >= 75 ? "text-emerald-600" : "text-red-500")} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Ujian Selesai!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">UTS Matematika · Kelas 9A</p>

          <div className={cn(
            "text-6xl font-black mb-1",
            nilai >= 90 ? "text-emerald-600" : nilai >= 75 ? "text-blue-600" : nilai >= 60 ? "text-orange-500" : "text-red-500"
          )}>
            {nilai}
          </div>
          <p className="text-sm text-gray-500 mb-6">dari 100 poin</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-3">
              <p className="text-2xl font-bold text-emerald-600">{benar}</p>
              <p className="text-xs text-gray-500">Benar</p>
            </div>
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-2xl font-bold text-red-500">{salah}</p>
              <p className="text-xs text-gray-500">Salah</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-700 p-3">
              <p className="text-2xl font-bold text-orange-500">{pelanggaran.length}</p>
              <p className="text-xs text-gray-500">Pelanggaran</p>
            </div>
          </div>

          <div className={cn(
            "mb-6 rounded-xl p-3 text-sm font-semibold",
            nilai >= 75
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {nilai >= 75 ? "✓ LULUS — Selamat!" : "✗ TIDAK LULUS — Perlu Remedial"}
          </div>

          <Button className="w-full" onClick={() => window.close()}>
            Tutup & Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden select-none">
      {/* Anti-cheat warning */}
      {showWarning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl bg-red-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">⚠️ Pelanggaran terdeteksi: {pelanggaran.at(-1)?.tipe}</span>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center gap-4 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">UTS Matematika</p>
            <p className="text-xs text-gray-500">Kelas 9A · Ahmad Fauzi</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {pelanggaran.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              {pelanggaran.length} pelanggaran
            </div>
          )}
          <div className="text-center">
            <p className="text-xs text-gray-500">Dijawab</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{totalDijawab}/{soalUjian.length}</p>
          </div>
          <div className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold",
            kritis
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
          )}>
            <Clock className="h-4 w-4" />
            {display}
          </div>
          <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", kritis ? "bg-red-500" : "bg-emerald-500")}
              style={{ width: `${persen}%` }}
            />
          </div>
          <Button variant="danger" size="sm" leftIcon={<Send className="h-4 w-4" />}
            onClick={() => setShowSubmitModal(true)}>
            Submit
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Soal Navigator */}
        <aside className="w-52 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 px-1">Navigasi Soal</p>
          <div className="grid grid-cols-5 gap-1.5">
            {soalUjian.map((s, i) => {
              const st = statusSoal(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentIdx(i)}
                  className={cn(
                    "relative flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all",
                    currentIdx === i && "ring-2 ring-emerald-500 ring-offset-1",
                    st === "dijawab" && "bg-emerald-500 text-white",
                    st === "ragu" && "bg-yellow-400 text-white",
                    st === "belum" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200"
                  )}
                >
                  {i + 1}
                  {ragu.has(s.id) && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-yellow-400" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            {[
              { color: "bg-emerald-500", label: "Dijawab" },
              { color: "bg-yellow-400", label: "Ragu-ragu" },
              { color: "bg-gray-200 dark:bg-gray-700", label: "Belum" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded", item.color)} />
                <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Soal Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {currentIdx + 1}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">dari {soalUjian.length} soal</span>
              </div>
              <button
                onClick={toggleRagu}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all",
                  ragu.has(current.id)
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                <Flag className="h-3.5 w-3.5" />
                {ragu.has(current.id) ? "Diberi Tanda" : "Tandai Ragu"}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6 mb-4">
              <p className="text-base font-medium text-gray-900 dark:text-white leading-relaxed">
                {current.soal}
              </p>
            </div>

            <div className="space-y-3">
              {current.pilihan.map((p, i) => {
                const kode = String.fromCharCode(65 + i);
                const dipilih = jawaban[current.id] === kode;
                return (
                  <button
                    key={kode}
                    onClick={() => setJawaban((prev) => ({ ...prev, [current.id]: kode }))}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                      dipilih
                        ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                    )}
                  >
                    <span className={cn(
                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                      dipilih
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    )}>
                      {kode}
                    </span>
                    <span className={cn(
                      "text-sm font-medium",
                      dipilih ? "text-emerald-800 dark:text-emerald-300" : "text-gray-700 dark:text-gray-300"
                    )}>
                      {p}
                    </span>
                    {dipilih && <CheckCircle className="ml-auto h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="secondary"
                leftIcon={<ChevronLeft className="h-4 w-4" />}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
              >
                Sebelumnya
              </Button>
              {currentIdx < soalUjian.length - 1 ? (
                <Button
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                  onClick={() => setCurrentIdx((i) => i + 1)}
                >
                  Berikutnya
                </Button>
              ) : (
                <Button variant="gold" leftIcon={<Send className="h-4 w-4" />} onClick={() => setShowSubmitModal(true)}>
                  Selesai & Submit
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-2xl mx-4">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30 mx-auto">
              <Send className="h-7 w-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-1">Submit Ujian?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-5">
              Anda telah menjawab <strong className="text-emerald-600">{totalDijawab}</strong> dari{" "}
              <strong>{soalUjian.length}</strong> soal.
              {soalUjian.length - totalDijawab > 0 && (
                <span className="text-red-500"> {soalUjian.length - totalDijawab} soal belum dijawab!</span>
              )}
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowSubmitModal(false)}>
                Batal
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                Ya, Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
