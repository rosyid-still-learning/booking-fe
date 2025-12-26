"use client";

import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import dayjs from "dayjs";

export default function Header({ children }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      
      {/* LEFT - HAMBURGER (MOBILE) + BRAND */}
      <div className="flex items-center gap-3">
        {children} {/* ⬅️ tetap, jangan dihapus */}

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-800">
            Ganesha Booking
          </span>
          <span className="text-xs text-gray-500">
            Sistem Peminjaman Ruang Kampus
          </span>
        </div>
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
