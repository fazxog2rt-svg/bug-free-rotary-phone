"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface Pelanggaran {
  id: number;
  tipe: string;
  waktu: string;
}

export function useAntiCheat(enabled = true) {
  const [pelanggaran, setPelanggaran] = useState<Pelanggaran[]>([]);
  const counterRef = useRef(0);

  const tambahPelanggaran = useCallback((tipe: string) => {
    const p: Pelanggaran = {
      id: ++counterRef.current,
      tipe,
      waktu: new Date().toLocaleTimeString("id-ID"),
    };
    setPelanggaran((prev) => [...prev, p]);
    return p;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) tambahPelanggaran("Tab Berpindah / Minimize");
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      tambahPelanggaran("Mencoba Copy");
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      tambahPelanggaran("Mencoba Paste");
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      tambahPelanggaran("Klik Kanan");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && ["c", "v", "u", "a", "s"].includes(e.key)) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault();
        tambahPelanggaran(`Shortcut Terlarang: ${e.ctrlKey ? "Ctrl+" : ""}${e.key.toUpperCase()}`);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", handleCopy as EventListener);
    document.addEventListener("paste", handlePaste as EventListener);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", handleCopy as EventListener);
      document.removeEventListener("paste", handlePaste as EventListener);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, tambahPelanggaran]);

  return { pelanggaran, totalPelanggaran: pelanggaran.length };
}
