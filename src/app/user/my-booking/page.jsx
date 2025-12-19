"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export default function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BOOKING =================
  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      const data = res.data?.data ?? res.data;
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal mengambil booking:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  fetchBookings();
}, []);


  // ================= CANCEL BOOKING =================
  const handleCancel = (id) => {
    toast.custom((t) => (
      <div className="bg-white border rounded-lg shadow p-4 w-[320px]">
        <p className="font-semibold mb-3">
          Yakin ingin membatalkan booking ini?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 border rounded"
          >
            Batal
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading(
                "Membatalkan booking..."
              );

              try {
                await api.post(`/bookings/${id}/cancel`);
                toast.success("Booking berhasil dibatalkan");
                fetchBookings();
              } catch (err) {
                toast.error(
                  err?.response?.data?.message ||
                    "Gagal membatalkan booking"
                );
              } finally {
                toast.dismiss(loadingToast);
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Batalkan
          </button>
        </div>
      </div>
    ));
  };

  if (loading) return <p>Loading bookingan saya...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Daftar Status Booking Saya
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">
          Belum ada booking ruangan.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              {/* NAMA RUANGAN */}
              <div className="mb-2">
                <h2 className="font-semibold text-lg">
                  {b.room?.name || "Ruangan"}
                </h2>
                <p className="text-sm text-gray-500">
                  📍 {b.room?.location}
                </p>
              </div>

              {/* JUDUL KEGIATAN */}
              <p className="mt-3 text-sm">
                <strong>Judul Kegiatan:</strong>
                <br />
                {b.title || "-"}
              </p>

              {/* DETAIL KEGIATAN */}
              <p className="mt-2 text-sm">
                <strong>Detail Kegiatan:</strong>
                <br />
                {b.purpose || "-"}
              </p>

              {/* DATE & TIME */}
              <div className="mt-3 bg-gray-50 border rounded-lg p-3 text-sm space-y-1">
                <p>
                  <strong>📅 Tanggal:</strong>{" "}
                  {dayjs(b.start_time).format("DD MMM YYYY")}
                </p>

                <p>
                  <strong>🕒 Jam:</strong>
                  <br />
                  {dayjs(b.start_time).format("hh:mm A")} –{" "}
                  {dayjs(b.end_time).format("hh:mm A")}
                </p>
              </div>

              {/* STATUS */}
              <p className="mt-3 text-sm">
                <strong>Status:</strong>{" "}
                {b.status === "approved" && (
                  <span className="text-green-600 font-semibold">
                    Disetujui
                  </span>
                )}
                {b.status === "rejected" && (
                  <span className="text-red-600 font-semibold">
                    Ditolak
                  </span>
                )}
                {b.status === "cancelled" && (
                  <span className="text-gray-600 font-semibold">
                    Dibatalkan
                  </span>
                )}
                {(!b.status || b.status === "pending") && (
                  <span className="text-yellow-600 font-semibold">
                    Menunggu Persetujuan
                  </span>
                )}
              </p>

              {/* ACTION */}
              {["pending", "approved"].includes(b.status) && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Batalkan Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
