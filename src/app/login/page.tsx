"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BookOpen, Mail, Lock, Eye, EyeOff, Fingerprint, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

type LoginMethod = "email" | "nis" | "qr" | "otp";

const demoAccounts = [
  { label: "Super Admin", role: "super_admin" as const, email: "admin@pesantren.id", name: "Admin Pesantren" },
  { label: "Guru", role: "guru" as const, email: "guru@pesantren.id", name: "Ustadz Rahman" },
  { label: "Santri", role: "santri" as const, email: "santri@pesantren.id", name: "Ahmad Fauzi" },
  { label: "Orang Tua", role: "orang_tua" as const, email: "ortu@pesantren.id", name: "Bapak Fauzi" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [method, setMethod] = useState<LoginMethod>("email");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (role = "super_admin", name = "Admin Pesantren", userEmail = email || "admin@pesantren.id") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ id: "1", name, email: userEmail, role: role as any });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 green-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-white" />
          <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border-2 border-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">Pesantren Exam Pro</p>
              <p className="text-sm text-emerald-200">Platform CBT Modern</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Ujian Digital<br />
              <span className="text-yellow-300">Pesantren Modern</span>
            </h1>
            <p className="mt-4 text-emerald-100 text-lg leading-relaxed">
              Platform CBT terpadu untuk pondok pesantren modern. Aman, cepat, dan terintegrasi dengan sistem akademik.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Santri Aktif", value: "12.500+" },
              { label: "Ujian Selesai", value: "48.000+" },
              { label: "Pesantren", value: "250+" },
              { label: "Tingkat Kelulusan", value: "94%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-emerald-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-emerald-300">
          © 2026 Pesantren Exam Pro · Powered by Next.js 15
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl green-gradient mb-3">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pesantren Exam Pro</h1>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:shadow-none dark:border dark:border-gray-700">
            <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">Selamat Datang 👋</h2>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Masuk ke akun Anda untuk melanjutkan</p>

            {/* Method Tabs */}
            <div className="mb-6 grid grid-cols-4 gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
              {[
                { id: "email" as LoginMethod, label: "Email", icon: <Mail className="h-4 w-4" /> },
                { id: "nis" as LoginMethod, label: "NIS", icon: <Fingerprint className="h-4 w-4" /> },
                { id: "qr" as LoginMethod, label: "QR", icon: <QrCode className="h-4 w-4" /> },
                { id: "otp" as LoginMethod, label: "OTP", icon: <Lock className="h-4 w-4" /> },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg py-2 text-xs font-medium transition-all",
                    method === m.id
                      ? "bg-white text-emerald-700 shadow dark:bg-gray-600 dark:text-emerald-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  )}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>

            {method === "email" && (
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="email@pesantren.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" />}
                />
                <Input
                  label="Password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    <button onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
                    </button>
                  }
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <input type="checkbox" className="rounded" />
                    Ingat saya
                  </label>
                  <a href="#" className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                    Lupa password?
                  </a>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  loading={loading}
                  onClick={() => handleLogin("super_admin", "Admin Pesantren", email)}
                >
                  Masuk
                </Button>
              </div>
            )}

            {method === "nis" && (
              <div className="space-y-4">
                <Input label="Nomor Induk Santri (NIS)" placeholder="Contoh: 2024001234" leftIcon={<Fingerprint className="h-4 w-4" />} />
                <Input label="Password" type="password" placeholder="••••••••" leftIcon={<Lock className="h-4 w-4" />} />
                <Button className="w-full" size="lg" loading={loading} onClick={() => handleLogin("santri", "Ahmad Fauzi")}>
                  Masuk dengan NIS
                </Button>
              </div>
            )}

            {method === "qr" && (
              <div className="text-center py-4">
                <div className="mx-auto mb-4 h-48 w-48 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <QrCode className="h-24 w-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Arahkan kamera ke QR Code pada kartu santri Anda</p>
                <Button className="mt-4 w-full" size="lg" onClick={() => handleLogin("santri", "Ahmad Fauzi")}>
                  Simulasi QR Login
                </Button>
              </div>
            )}

            {method === "otp" && (
              <div className="space-y-4">
                <Input label="Email" type="email" placeholder="email@pesantren.id" leftIcon={<Mail className="h-4 w-4" />} />
                <Button className="w-full" variant="secondary" size="lg">
                  Kirim OTP
                </Button>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Kode OTP</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        maxLength={1}
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white text-center text-lg font-bold text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    ))}
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => handleLogin()}>
                  Verifikasi OTP
                </Button>
              </div>
            )}

            {/* Google */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400 dark:bg-gray-800">atau</span>
              </div>
            </div>
            <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Masuk dengan Google
            </button>
          </div>

          {/* Demo shortcuts */}
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <p className="mb-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Demo Login Cepat</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => handleLogin(acc.role, acc.name, acc.email)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
