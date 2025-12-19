"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiCalendar,
  FiList,
  FiLogOut,
  FiCheckSquare,
  FiClock,
} from "react-icons/fi";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [pendingCount, setPendingCount] = useState(0);

  async function fetchPendingCount() {
    try {
      const res = await api.get("/admin/bookings/pending-count");
      setPendingCount(res.data.count || 0);
    } catch {}
  }

  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Apakah kamu yakin ingin logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 border rounded"
          >
            Batal
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              logout();
              toast.success("Logout berhasil");
              router.push("/login");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded transition
     ${
       pathname === path
         ? "bg-blue-700 font-semibold"
         : "hover:bg-blue-800"
     }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50 flex flex-col p-5">
      
      {/* LOGO + TITLE */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="https://cdn.undiksha.ac.id/wp-content/uploads/2021/12/27081301/logo-undiksha.png"
          alt="Logo Undiksha"
          width={36}
          height={36}
          priority
        />
        <h1 className="text-lg font-bold tracking-wide">
          Ganesha Booking
        </h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 flex flex-col gap-1">
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          <FiHome /> Dashboard
        </Link>

        <Link href="/admin/rooms" className={linkClass("/admin/rooms")}>
          <FiList /> Kelola Ruangan
        </Link>

        <Link
          href="/admin/bookings"
          className={`flex items-center justify-between p-3 rounded transition
            ${
              pathname === "/admin/bookings"
                ? "bg-blue-700 font-semibold"
                : "hover:bg-blue-800"
            }`}
        >
          <div className="flex items-center gap-3">
            <FiCalendar />
            <span>Permintaan Booking</span>
          </div>

          {pendingCount > 0 && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {pendingCount}
            </span>
          )}
        </Link>

        <Link
          href="/admin/active-bookings"
          className={linkClass("/admin/active-bookings")}
        >
          <FiCheckSquare /> Ruangan Dibooking
        </Link>

        <Link
          href="/admin/booking-history"
          className={linkClass("/admin/booking-history")}
        >
          <FiClock /> Riwayat Booking
        </Link>
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded text-red-400 hover:bg-red-600 hover:text-white transition"
      >
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
