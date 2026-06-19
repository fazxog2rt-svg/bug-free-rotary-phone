"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

const activities = [
  { id: 1, user: "Ahmad Fauzi", action: "menyelesaikan ujian", target: "UTS Matematika", time: "2026-06-19", type: "exam" as const },
  { id: 2, user: "Siti Aisyah", action: "setoran hafalan", target: "Juz 30 - An-Naba", time: "2026-06-19", type: "tahfidz" as const },
  { id: 3, user: "Ustadz Rahman", action: "membuat soal baru", target: "Bank Soal Fiqh", time: "2026-06-18", type: "soal" as const },
  { id: 4, user: "Hasan Basri", action: "mendaftar ujian", target: "UAS Bahasa Arab", time: "2026-06-18", type: "exam" as const },
  { id: 5, user: "Fatimah Zahra", action: "nilai remedial", target: "IPA Kelas 9A", time: "2026-06-17", type: "nilai" as const },
];

const typeVariant = {
  exam: "blue" as const,
  tahfidz: "green" as const,
  soal: "gold" as const,
  nilai: "orange" as const,
};

const typeLabel = {
  exam: "Ujian",
  tahfidz: "Tahfidz",
  soal: "Soal",
  nilai: "Nilai",
};

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3">
            <Avatar name={act.user} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{act.user}</span>
                {" "}{act.action}{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{act.target}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatDate(act.time)}</p>
            </div>
            <Badge variant={typeVariant[act.type]}>{typeLabel[act.type]}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
