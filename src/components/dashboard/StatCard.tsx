"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color?: "green" | "gold" | "blue" | "purple";
  subtitle?: string;
}

const colorClasses = {
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    value: "text-emerald-700 dark:text-emerald-400",
  },
  gold: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    icon: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400",
    value: "text-yellow-700 dark:text-yellow-400",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    value: "text-blue-700 dark:text-blue-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    value: "text-purple-700 dark:text-purple-400",
  },
};

export function StatCard({ title, value, icon, trend, color = "green", subtitle }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={cn("rounded-2xl p-5 card-hover border border-gray-100 dark:border-gray-700/50", colors.bg)}>
      <div className="flex items-start justify-between">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", colors.icon)}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1",
            trend >= 0
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
          )}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className={cn("text-2xl font-bold", colors.value)}>{value.toLocaleString()}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
