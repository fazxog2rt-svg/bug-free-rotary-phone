"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { School, Bell, Shield, Palette, Save, Upload } from "lucide-react";

const sections = [
  {
    id: "profil",
    icon: <School className="h-5 w-5" />,
    title: "Profil Pesantren",
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nama Pesantren" defaultValue="Pondok Pesantren Modern Al-Fikr" />
        <Input label="Kode Pesantren" defaultValue="PP-ALFIKR-001" />
        <Input label="Alamat" defaultValue="Jl. Pesantren No. 1, Jakarta" />
        <Input label="No. Telepon" defaultValue="+62 21 1234567" />
        <Input label="Email" defaultValue="info@alfikr.ac.id" type="email" />
        <Input label="Website" defaultValue="https://alfikr.ac.id" />
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Logo Pesantren</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center dark:border-gray-600">
              <School className="h-8 w-8 text-gray-400" />
            </div>
            <Button variant="secondary" size="sm" leftIcon={<Upload className="h-4 w-4" />}>Upload Logo</Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "notif",
    icon: <Bell className="h-5 w-5" />,
    title: "Pengaturan Notifikasi",
    content: (
      <div className="space-y-4">
        {[
          "Email notifikasi ujian", "WhatsApp notifikasi nilai", "Push notification pelanggaran", "Telegram bot aktif",
        ].map((item) => (
          <div key={item} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
            </label>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "keamanan",
    icon: <Shield className="h-5 w-5" />,
    title: "Keamanan & Anti-Kecurangan",
    content: (
      <div className="space-y-4">
        {[
          "Aktifkan deteksi tab berpindah", "Blokir copy-paste saat ujian", "Deteksi multi device", "Wajib webcam monitoring", "AI cheating detection",
        ].map((item) => (
          <div key={item} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
            </label>
          </div>
        ))}
      </div>
    ),
  },
];

export default function PengaturanPage() {
  const [active, setActive] = useState("profil");
  const activeSection = sections.find(s => s.id === active);

  return (
    <DashboardLayout title="Pengaturan">
      <div className="flex gap-5">
        {/* Sidebar Nav */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                active === s.id
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {s.icon}
              {s.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-6">
          {activeSection && (
            <>
              <div className="mb-5 flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                  {activeSection.icon}
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">{activeSection.title}</h2>
              </div>
              {activeSection.content}
              <div className="mt-6 flex justify-end">
                <Button leftIcon={<Save className="h-4 w-4" />}>Simpan Perubahan</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
