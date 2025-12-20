"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

export default function RoomDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const roomRes = await api.get(`/rooms/${id}`);
        setRoom(roomRes.data);

        const bookingRes = await api.get(`/rooms/${id}/bookings`);
        setBookings(bookingRes.data.data || []);
      } catch (err) {
        toast.error("Gagal memuat detail ruangan");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!room) return <p className="p-6">Ruangan tidak ditemukan</p>;

  const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  const bookingsOnDate = bookings.filter(
    (b) =>
      b.status === "approved" &&
      dayjs(b.start_time).format("YYYY-MM-DD") === selectedDateStr
  );

  return (
    <div className="p-6">
      {/* ===== TOMBOL KEMBALI (FIX KIRI ATAS) ===== */}
      <button
        onClick={() => router.push("/user/rooms")}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Kembali
      </button>

      {/* ===== GRID ASLI (TIDAK DIUBAH) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2 bg-white rounded shadow p-6">
          
          {room.image && (
  <img
    src={room.image}
    alt={room.name}
    className="w-full h-64 object-cover rounded mb-4"
  />
)}


          <h1 className="text-2xl font-bold">{room.name}</h1>
          <p className="text-gray-600">{room.location}</p>

          <div className="mt-4 space-y-2">
            <p>
              <strong>Kampus:</strong>{" "}
              {room.category
                ? room.category
                    .replaceAll("_", " ")
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : "-"}
            </p>

            <p>
              <strong>Kapasitas:</strong> {room.capacity} orang
            </p>

            {room.description && (
              <p>
                <strong>Deskripsi:</strong>
                <br />
                {room.description}
              </p>
            )}

            <div>
              <strong>Fasilitas:</strong>
              <ul className="list-disc ml-6">
                {Array.isArray(room.facilities) &&
                room.facilities.length > 0 ? (
                  room.facilities.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={() => router.push(`/user/booking/${room.id}`)}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Booking Ruangan
          </button>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-bold mb-3">
            Kalender Booking
          </h2>

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full"
          />

          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              Booking tanggal{" "}
              {dayjs(selectedDate).format("DD MMMM YYYY")}
            </h3>

            {bookingsOnDate.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Belum ada booking di tanggal ini
              </p>
            ) : (
              <ul className="space-y-2">
                {bookingsOnDate.map((b) => (
                  <li
                    key={b.id}
                    className="border rounded p-3 text-sm bg-gray-50 space-y-1"
                  >
                    <p>
                      <span className="font-medium">
                        Jam mulai :
                      </span>{" "}
                      {dayjs(b.start_time).format("HH:mm")}
                    </p>

                    <p>
                      <span className="font-medium">
                        Jam selesai :
                      </span>{" "}
                      {dayjs(b.end_time).format("HH:mm")}
                    </p>

                    <p>
                      <span className="font-medium">
                        Digunakan untuk :
                      </span>
                    </p>

                    <p className="text-gray-600 ml-2">
                      {b.purpose || "-"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
