"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useExamTimer(durasiDetik: number, onTimeUp: () => void) {
  const [sisa, setSisa] = useState(durasiDetik);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSisa((prev) => {
        if (prev <= 1) {
          stop();
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return stop;
  }, [stop]);

  const jam = Math.floor(sisa / 3600);
  const menit = Math.floor((sisa % 3600) / 60);
  const detik = sisa % 60;

  const display = jam > 0
    ? `${jam.toString().padStart(2, "0")}:${menit.toString().padStart(2, "0")}:${detik.toString().padStart(2, "0")}`
    : `${menit.toString().padStart(2, "0")}:${detik.toString().padStart(2, "0")}`;

  const persen = (sisa / durasiDetik) * 100;
  const kritis = sisa <= 300;

  return { display, persen, kritis, sisa, stop };
}
