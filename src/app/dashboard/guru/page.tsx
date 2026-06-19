"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const guruData = [
  { id: "1", nip: "198501012010011001", name: "Ustadz Abdul Rahman", mapel: ["Fiqh", "Ushul Fiqh"], kelas: ["9A", "10A", "11A"], ujian: 12, email: "rahman@pesantren.id" },
  { id: "2", nip: "198703152012012002", name: "Ustadzah Khadijah", mapel: ["Bahasa Arab"], kelas: ["7A", "8A", "9A"], ujian: 8, email: "khadijah@pesantren.id" },
  { id: "3", nip: "199002202015011003", name: "Ustadz Yusuf", mapel: ["Matematika", "IPA"], kelas: ["7B", "8B"], ujian: 15, email: "yusuf@pesantren.id" },
  { id: "4", nip: "198812101014012004", name: "Ustadzah Aisyah", mapel: ["Bahasa Inggris"], kelas: ["10B", "11B", "12B"], ujian: 10, email: "aisyah@pesantren.id" },
  { id: "5", nip: "199501252018011005", name: "Ustadz Ibrahim", mapel: ["Tahfidz", "Tajwid"], kelas: ["Semua Kelas"], ujian: 6, email: "ibrahim@pesantren.id" },
];

export default function GuruPage() {
  const [search, setSearch] = useState("");
  const filtered = guruData.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Data Guru">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Cari nama guru..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-80"
          />
          <div className="ml-auto">
            <Button leftIcon={<Plus className="h-4 w-4" />}>Tambah Guru</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guru) => (
            <div key={guru.id} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-5 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <Avatar name={guru.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{guru.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{guru.nip}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{guru.email}</p>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-1">
                {guru.mapel.map(m => (
                  <Badge key={m} variant="green">{m}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2 text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{guru.kelas.length}</p>
                  <p className="text-xs text-gray-500">Kelas</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2 text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{guru.ujian}</p>
                  <p className="text-xs text-gray-500">Ujian Dibuat</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Edit className="h-3.5 w-3.5" />}>Edit</Button>
                <button className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 dark:border-gray-700 dark:hover:bg-red-900/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
