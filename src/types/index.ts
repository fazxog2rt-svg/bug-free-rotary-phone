export type Role =
  | "super_admin"
  | "mudir"
  | "admin_akademik"
  | "guru"
  | "musyrif"
  | "santri"
  | "orang_tua";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  nis?: string;
  kelas?: string;
}

export interface Santri {
  id: string;
  nis: string;
  name: string;
  kelas: string;
  tingkat: string;
  jurusan: string;
  status: "aktif" | "tidak_aktif";
  avatar?: string;
  orang_tua?: string;
}

export interface Guru {
  id: string;
  nip: string;
  name: string;
  mata_pelajaran: string[];
  email: string;
  phone: string;
  avatar?: string;
}

export interface Soal {
  id: string;
  pertanyaan: string;
  jenis: "pilihan_ganda" | "benar_salah" | "essay" | "isian_singkat" | "menjodohkan";
  pilihan?: string[];
  jawaban_benar?: string | string[];
  tingkat_kesulitan: "mudah" | "sedang" | "sulit";
  mapel: string;
  tags: string[];
  poin: number;
}

export interface Ujian {
  id: string;
  judul: string;
  mapel: string;
  kelas: string[];
  tanggal_mulai: string;
  tanggal_selesai: string;
  durasi: number;
  jenis: "harian" | "uts" | "uas" | "imtihan" | "tahfidz";
  status: "draft" | "aktif" | "selesai";
  token?: string;
  acak_soal: boolean;
  acak_jawaban: boolean;
  total_soal: number;
  total_peserta?: number;
}

export interface HasilUjian {
  id: string;
  santri_id: string;
  ujian_id: string;
  nilai: number;
  status: "lulus" | "tidak_lulus";
  durasi_pengerjaan: number;
  tanggal: string;
  jawaban: Record<string, string>;
}

export interface Hafalan {
  id: string;
  santri_id: string;
  juz: number;
  surat: string;
  ayat_mulai: number;
  ayat_selesai: number;
  nilai_tahsin: number;
  nilai_tajwid: number;
  nilai_kelancaran: number;
  tanggal: string;
  musyrif_id: string;
}

export interface StatDashboard {
  total_santri: number;
  total_guru: number;
  ujian_aktif: number;
  total_kelas: number;
  rata_rata_nilai: number;
  tingkat_kelulusan: number;
}
