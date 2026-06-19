"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AIGeneratorModal } from "@/components/ai/AIGeneratorModal";
import { Plus, Search, Filter, Edit, Trash2, Sparkles, BookOpen } from "lucide-react";

const soalData = [
  {
    id: "1", mapel: "Matematika", jenis: "pilihan_ganda", tingkat: "sedang",
    pertanyaan: "Berapakah hasil dari ∫(2x + 3)dx ?",
    tags: ["integral", "kalkulus"], poin: 5,
  },
  {
    id: "2", mapel: "Bahasa Arab", jenis: "isian_singkat", tingkat: "mudah",
    pertanyaan: "Tuliskan bentuk jamak dari كِتَابٌ (kitaab)!",
    tags: ["mufrodat", "jamak"], poin: 3,
  },
  {
    id: "3", mapel: "Fiqh", jenis: "pilihan_ganda", tingkat: "mudah",
    pertanyaan: "Berapa rakaat shalat Dzuhur?",
    tags: ["shalat", "ibadah"], poin: 2,
  },
  {
    id: "4", mapel: "Tahfidz", jenis: "essay", tingkat: "sulit",
    pertanyaan: "Sebutkan dan jelaskan hukum bacaan Mad yang Anda ketahui beserta contohnya!",
    tags: ["mad", "tajwid"], poin: 15,
  },
  {
    id: "5", mapel: "IPA", jenis: "benar_salah", tingkat: "mudah",
    pertanyaan: "Fotosintesis menghasilkan oksigen dan glukosa. (Benar/Salah)",
    tags: ["biologi", "fotosintesis"], poin: 2,
  },
  {
    id: "6", mapel: "Bahasa Inggris", jenis: "pilihan_ganda", tingkat: "sedang",
    pertanyaan: "Choose the correct tense: 'She ___ to school every day.'",
    tags: ["grammar", "present"], poin: 3,
  },
];

const jenisLabel: Record<string, string> = {
  pilihan_ganda: "Pilihan Ganda",
  benar_salah: "Benar/Salah",
  essay: "Essay",
  isian_singkat: "Isian",
  menjodohkan: "Menjodohkan",
};

const tingkatVariant: Record<string, "green" | "gold" | "red"> = {
  mudah: "green", sedang: "gold", sulit: "red",
};

const mapelColors: Record<string, string> = {
  Matematika: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Bahasa Arab": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Fiqh: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Tahfidz: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  IPA: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "Bahasa Inggris": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function BankSoalPage() {
  const [search, setSearch] = useState("");
  const [filterMapel, setFilterMapel] = useState("semua");
  const [showAI, setShowAI] = useState(false);

  const mapelList = ["semua", ...Array.from(new Set(soalData.map((s) => s.mapel)))];
  const filtered = soalData.filter((s) => {
    const matchSearch = s.pertanyaan.toLowerCase().includes(search.toLowerCase());
    const matchMapel = filterMapel === "semua" || s.mapel === filterMapel;
    return matchSearch && matchMapel;
  });

  return (
    <DashboardLayout title="Bank Soal">
      <div className="space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
          {[
            { label: "Total Soal", value: soalData.length },
            { label: "Pilihan Ganda", value: soalData.filter(s => s.jenis === "pilihan_ganda").length },
            { label: "Essay", value: soalData.filter(s => s.jenis === "essay").length },
            { label: "Mudah", value: soalData.filter(s => s.tingkat === "mudah").length },
            { label: "Sedang", value: soalData.filter(s => s.tingkat === "sedang").length },
            { label: "Sulit", value: soalData.filter(s => s.tingkat === "sulit").length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-3 text-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Cari soal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="sm:w-80"
          />
          <div className="flex gap-2 flex-wrap">
            {mapelList.map((m) => (
              <button
                key={m}
                onClick={() => setFilterMapel(m)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filterMapel === m
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="gold" leftIcon={<Sparkles className="h-4 w-4" />} onClick={() => setShowAI(true)}>
              AI Generator
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Tambah Soal
            </Button>
          </div>
        </div>

        {/* Soal Cards */}
        <div className="space-y-3">
          {filtered.map((soal, idx) => (
            <div
              key={soal.id}
              className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${mapelColors[soal.mapel] || "bg-gray-100 text-gray-700"}`}>
                      {soal.mapel}
                    </span>
                    <Badge variant="gray">{jenisLabel[soal.jenis]}</Badge>
                    <Badge variant={tingkatVariant[soal.tingkat]}>
                      {soal.tingkat.charAt(0).toUpperCase() + soal.tingkat.slice(1)}
                    </Badge>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {soal.poin} poin
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">{soal.pertanyaan}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {soal.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAI && (
        <AIGeneratorModal
          onClose={() => setShowAI(false)}
          onAdd={(soalBaru) => {
            console.log("Soal ditambahkan:", soalBaru);
            setShowAI(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}
