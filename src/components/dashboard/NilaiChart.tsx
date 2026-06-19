"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const nilaiData = [
  { bulan: "Jan", rata_rata: 78, tertinggi: 95, terendah: 55 },
  { bulan: "Feb", rata_rata: 80, tertinggi: 96, terendah: 58 },
  { bulan: "Mar", rata_rata: 76, tertinggi: 94, terendah: 52 },
  { bulan: "Apr", rata_rata: 83, tertinggi: 98, terendah: 62 },
  { bulan: "Mei", rata_rata: 85, tertinggi: 99, terendah: 65 },
  { bulan: "Jun", rata_rata: 87, tertinggi: 100, terendah: 68 },
];

const kelulusanData = [
  { mapel: "MTK", lulus: 85, tidak_lulus: 15 },
  { mapel: "B.Arab", lulus: 92, tidak_lulus: 8 },
  { mapel: "Fiqh", lulus: 96, tidak_lulus: 4 },
  { mapel: "IPA", lulus: 78, tidak_lulus: 22 },
  { mapel: "B.Ing", lulus: 81, tidak_lulus: 19 },
];

export function NilaiTrendChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Tren Nilai Rata-rata</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={nilaiData}>
          <defs>
            <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[40, 100]} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="rata_rata"
            stroke="#059669"
            strokeWidth={2.5}
            fill="url(#colorNilai)"
            name="Rata-rata"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function KelulusanChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">Statistik Kelulusan per Mapel</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={kelulusanData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="mapel" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Legend />
          <Bar dataKey="lulus" fill="#059669" name="Lulus" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tidak_lulus" fill="#fca5a5" name="Tidak Lulus" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
