"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { FiBell } from "react-icons/fi";

export default function AdminDashboard() {
  const router = useRouter();
  const { loadUser, user } = useAuthStore();

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loadUser()) {
      router.push("/login");
    } else {
      fetchNotifications();
    }
  }, []);

  // 🔄 FETCH NOTIF
  async function fetchNotifications() {
    try {
      const res = await api.get("/admin/notifications");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setNotifications(data);
    } catch (err) {
      console.error("Gagal mengambil notifikasi");
      setNotifications([]);
    }
  }

  // ✅ CLEAR NOTIF
  async function markAllRead() {
    try {
      await api.post("/admin/notifications/clear");
      setNotifications([]);
      setOpen(false);
    } catch {
      console.error("Gagal clear notifikasi");
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Halo, {user?.name} 👋
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            Selamat datang di Dashboard Admin Sistem Booking Ruangan
            Universitas Pendidikan Ganesha.
          </p>
        </div>

        {/* NOTIFICATION */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiBell size={22} />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-[1px] rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b font-semibold text-sm">
                Notifikasi
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">
                  Tidak ada notifikasi
                </p>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b last:border-b-0 text-sm hover:bg-gray-50 transition"
                      >
                        {n.message}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t text-right">
                    <button
                      onClick={markAllRead}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Tandai semua dibaca
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* INFO BOX */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
        <h2 className="font-semibold text-green-800 mb-1">
          Peran Administrator
        </h2>
        <p className="text-sm text-green-700">
          Administrator bertanggung jawab dalam pengelolaan data
          ruangan serta pengawasan proses pemesanan.
        </p>
      </div>

      {/* FEATURE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold mb-2 text-lg">
            🏢 Kelola Ruangan
          </h3>
          <p className="text-sm text-gray-600">
            Menambah, mengubah, dan menghapus data ruangan
            dengan mudah.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold mb-2 text-lg">
            📋 Permintaan Booking
          </h3>
          <p className="text-sm text-gray-600">
            Memproses permintaan booking serta melihat
            riwayat pemesanan.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold mb-2 text-lg">
            📊 Ruangan Dibooking
          </h3>
          <p className="text-sm text-gray-600">
            Monitoring ruangan yang sedang digunakan
            secara real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
