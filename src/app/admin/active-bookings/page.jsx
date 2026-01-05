"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import dayjs from "dayjs";

export default function ActiveBookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/admin/bookings/active").then((res) =>
      setData(res.data)
    );
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Ruangan Sedang Dibooking
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Informasi ruangan yang sedang dalam status dibooking
        </p>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="bg-gray-50 border border-dashed rounded-xl p-8 text-center text-gray-500">
          Tidak ada ruangan yang sedang dibooking
        </div>
      )}

      {/* CARD LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-xl border shadow-sm hover:shadow-md transition"
          >
            <div className="p-5">
              {/* NAMA RUANGAN */}
              <div className="mb-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  {b.room?.name || "-"}
                </h2>
                <p className="text-sm text-gray-500">
                  📍 {b.room?.location}
                </p>
              </div>

              {/* JUDUL KEGIATAN */}
              <p className="mt-3 text-sm text-gray-700">
                <strong>Judul Kegiatan:</strong>
                <br />
                {b.title || "-"}
              </p>

              {/* DETAIL KEGIATAN */}
              <p className="mt-2 text-sm text-gray-700">
                <strong>Detail Kegiatan:</strong>
                <br />
                {b.purpose || "-"}
              </p>

              {/* DATE & TIME */}
              <div className="mt-4 bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-medium">📅 Tanggal:</span>{" "}
                  {dayjs(b.start_time).format("DD MMM YYYY")}
                </p>

                <p>
                  <span className="font-medium">🕒 Waktu:</span>
                  <br />
                  {dayjs(b.start_time).format("hh:mm A")} –{" "}
                  {dayjs(b.end_time).format("hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
