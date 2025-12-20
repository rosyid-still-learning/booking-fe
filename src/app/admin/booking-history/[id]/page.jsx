"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

// 🔥 FORMAT TANGGAL + JAM AM/PM
function formatDateTime(datetime) {
  if (!datetime) return "-";

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

// 🔥 BASE STORAGE URL (TANPA /api)
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const STORAGE_BASE = API_BASE?.replace("/api", "");

export default function BookingHistoryDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data.data);
    }
    fetchDetail();
  }, [id]);

  if (!booking) return <p className="p-6">Loading...</p>;

  const start = formatDateTime(booking.start_time);
  const end = formatDateTime(booking.end_time);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Kembali
        </button>

        <h1 className="text-2xl font-bold mt-2">
          Detail Riwayat Booking
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-3xl">
        {/* ROOM */}
        <h2 className="font-bold text-lg mb-1">
          {booking.room?.name || "-"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Pemohon: <strong>{booking.user?.name || "-"}</strong>
        </p>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-1">Judul Kegiatan</p>
            <p>{booking.title || "-"}</p>
          </div>

          <div>
            <p className="font-medium mb-1">Status</p>
            <span
              className={`font-semibold ${
                booking.status === "approved"
                  ? "text-green-600"
                  : booking.status === "rejected"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div>
            <p className="font-medium mb-1">Tanggal</p>
            <p>{start.tanggal}</p>
          </div>

          <div>
            <p className="font-medium mb-1">Waktu</p>
            <p>
              {start.jam} – {end.jam}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium mb-1">
              Detail Kegiatan
            </p>
            <p>{booking.purpose || "-"}</p>
          </div>
        </div>

        {/* ATTACHMENT */}
        {booking.attachment && (
          <div className="mt-6">
            <a
              href={booking.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              📎 Lihat File Pendukung
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
