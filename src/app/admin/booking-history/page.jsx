"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchHistory() {
    try {
      const res = await api.get("/admin/booking-history");

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      // 🔹 approved, rejected, DAN cancelled
      const history = list.filter((b) =>
        ["approved", "rejected", "cancelled"].includes(b.status)
      );

      setBookings(history);
    } catch {
      toast.error("Gagal memuat riwayat booking");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  function handleDelete(id) {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-lg p-4 border w-[320px]">
        <p className="font-semibold mb-3">
          Hapus riwayat booking ini?
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

              try {
                await api.delete(`/admin/bookings/${id}`);
                toast.success("Riwayat dihapus");

                setBookings((prev) =>
                  prev.filter((b) => b.id !== id)
                );
              } catch {
                toast.error("Gagal menghapus riwayat");
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    ));
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Riwayat Permintaan Booking
      </h1>

      {bookings.length === 0 && (
        <p className="italic text-gray-500">
          Belum ada riwayat booking
        </p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border p-4 rounded bg-white"
          >
            <h2 className="font-semibold">
              {b.room?.name}
            </h2>

            <p className="text-sm text-gray-600">
              Pemohon: {b.user?.name}
            </p>

            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={`font-semibold ${
                  b.status === "approved"
                    ? "text-green-600"
                    : b.status === "rejected"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {b.status === "approved"
                  ? "Disetujui"
                  : b.status === "rejected"
                  ? "Ditolak"
                  : "Dibatalkan"}
              </span>
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() =>
                  router.push(
                    `/admin/booking-history/${b.id}`
                  )
                }
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Detail
              </button>

              <button
                onClick={() => handleDelete(b.id)}
                className="px-3 py-1 text-red-600 border rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
