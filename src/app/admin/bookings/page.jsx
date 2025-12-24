"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// 🔥 FORMAT TANGGAL + JAM AM/PM TANPA DETIK
function formatDateTime(datetime) {
  if (!datetime) return { tanggal: "-", jam: "-" };

  const date = new Date(datetime);

  const tanggal = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const jam = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { tanggal, jam };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FIX PDF CLOUDINARY BIAR KE-OPEN, BUKAN DOWNLOAD
function getViewableUrl(url) {
  if (!url) return null;
  return url.replace(
    "/upload/",
    "/upload/fl_attachment:false/"
  );
}

  async function fetchBookings() {
    try {
      const res = await api.get("/admin/bookings");
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setBookings(list);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat permintaan booking");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleApprove(id) {
    toast.custom((t) => (
      <div className="bg-white border rounded-lg shadow p-4 w-[320px]">
        <p className="font-semibold mb-3">
          Approve permintaan booking ini?
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
                await api.post(`/admin/bookings/${id}/approve`);
                toast.success("Booking berhasil di-approve");
                setBookings((prev) => prev.filter((b) => b.id !== id));
              } catch {
                toast.error("Gagal approve booking");
              }
            }}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve
          </button>
        </div>
      </div>
    ));
  }

  async function handleReject(id) {
    toast.custom((t) => (
      <div className="bg-white border rounded-lg shadow p-4 w-[320px]">
        <p className="font-semibold mb-3">
          Reject permintaan booking ini?
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
                await api.post(`/admin/bookings/${id}/reject`);
                toast.success("Booking berhasil di-reject");
                setBookings((prev) => prev.filter((b) => b.id !== id));
              } catch {
                toast.error("Gagal reject booking");
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>
    ));
  }

  if (loading) return <p>Loading permintaan booking...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Daftar Permintaan Booking
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500 italic">
          Belum ada permintaan booking
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {bookings.map((b) => {
          const start = formatDateTime(b.start_time);
          const end = formatDateTime(b.end_time);

          return (
            <div
              key={b.id}
              className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="font-bold text-lg">
                {b.room?.name || "-"}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Pemohon: <strong>{b.user?.name || "-"}</strong>
              </p>

              <p className="mt-3">
                <strong>Judul Kegiatan:</strong>
                <br />
                {b.title || "-"}
              </p>

              <p className="mt-2">
                <strong>Detail Kegiatan:</strong>
                <br />
                {b.purpose || "-"}
              </p>

              <div className="mt-4 bg-gray-50 border rounded-lg p-3 text-sm">
                <p className="font-semibold mb-1">Waktu Booking</p>
                <p>📅 {start.tanggal}</p>
                <p>🕒 {start.jam} – {end.jam}</p>
              </div>

              {/* FILE PENDUKUNG */}
{b.attachment && (
  <div className="mt-3">
    {b.attachment.toLowerCase().endsWith(".pdf") ? (
      <iframe
        src={b.attachment}
        className="w-full h-[450px] border rounded"
        title="File Pendukung PDF"
      />
    ) : (
      <img
        src={b.attachment}
        alt="File Pendukung"
        className="max-w-full border rounded"
      />
    )}
  </div>
)}



              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleApprove(b.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(b.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
