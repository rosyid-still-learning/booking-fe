"use client";

import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import dayjs from "dayjs";

export default function Header({ children }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((item) =>
      item.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      
      {/* LEFT - HAMBURGER (MOBILE) + BREADCRUMB */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        {children} {/* ⬅️ INI KUNCI UTAMA */}
        <span>{breadcrumbs.join(" / ")}</span>
      </div>

      {/* RIGHT - USER INFO */}
      <div className="text-right leading-tight">
        <p className="text-sm font-medium text-gray-800">
          {user?.name}
        </p>
        <p className="text-xs text-gray-500 capitalize">
          {user?.role}
        </p>
        <p className="text-xs text-gray-400">
          {dayjs().format("dddd, DD MMM YYYY")}
        </p>
      </div>
    </header>
  );
}
