"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRoomDetail } from "@/utils/api";
import api from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthStore();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // FORM STATE
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const data = await getRoomDetail(id);
        const resolved = data?.data ?? data;
        setRoom(resolved);
      } catch (e) {
        toast.error("Gagal mengambil detail ruangan");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) return <p>Loading halaman booking...</p>;
  if (!room) return <p>Ruangan tidak ditemukan.</p>;

  const onFileChange = (e) => {
    setAttachment(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI WAJIB
    if (!title || !date || !startTime || !endTime || !purpose || !attachment) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    const now = dayjs();
    const startDatetime = dayjs(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");
    const endDatetime = dayjs(`${date} ${endTime}`, "YYYY-MM-DD HH:mm");

    if (!startDatetime.isValid() || !endDatetime.isValid()) {
      toast.error("Format tanggal atau waktu tidak valid.");
      return;
    }

    if (startDatetime.isBefore(now)) {
      toast.error("Tidak bisa booking di waktu yang sudah lewat.");
      return;
    }

    if (!startDatetime.isBefore(endDatetime)) {
      toast.error("Jam mulai harus lebih awal dari jam selesai.");
      return;
    }

    const form = new FormData();
    form.append("room_id", room.id);
    form.append("title", title);
    form.append("start_time", startDatetime.format("YYYY-MM-DD HH:mm:00"));
    form.append("end_time", endDatetime.format("YYYY-MM-DD HH:mm:00"));
    form.append("purpose", purpose);
    form.append("attachment", attachment); // WAJIB

    setSubmitting(true);
    toast.loading("Mengirim booking...");

    try {
      await api.post("/bookings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.dismiss();
      toast.success("Booking berhasil! Menunggu persetujuan admin.");
      router.push("/user/my-booking");
    } catch (err) {
      toast.dismiss();
      toast.error(
        err?.response?.data?.message ||
          "Terjadi kesalahan saat membuat booking."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl">
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Kembali
      </button>

      <h1 className="text-2xl font-bold mb-1">
        Booking Ruangan — {room.name}
      </h1>
      <p className="text-gray-600 mb-3">{room.location}</p>

      <p className="text-sm text-gray-500 mb-4">
        <span className="text-red-500">*</span> Wajib diisi
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        {/* JUDUL */}
        <label className="block mb-2 font-medium">
          Judul Kegiatan <span className="text-red-500">*</span>
          
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="Contoh: Kelas/Rapat/Seminar"
        />

        {/* TANGGAL & JAM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block mb-1 font-medium">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={dayjs().format("YYYY-MM-DD")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Jam Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Jam Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* TUJUAN */}
        <label className="block mb-2 font-medium">
          Detail Kegiatan <span className="text-red-500">*</span>
        </label>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          rows={3}
          placeholder="Contoh: Rapat HMJ TI, Kelas Pemweb SI 3A"
        />

        {/* FILE WAJIB */}
        <label className="block mb-2 font-medium">
          File Pendukung (KTM / Surat Resmi Peminjaman Ruangan){" "}
          <span className="text-red-500">*</span>
        </label>

        <label
          htmlFor="attachment"
          className="inline-block cursor-pointer rounded border border-blue-600 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100 transition"
        >
          Pilih File
        </label>

        <input
          id="attachment"
          type="file"
          accept="image/*,application/pdf"
          onChange={onFileChange}
          className="hidden"
        />

        {attachment && (
          <p className="mt-2 text-sm text-gray-600">
            File dipilih:{" "}
            <span className="font-medium">{attachment.name}</span>
          </p>
        )}

        {/* BUTTON */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {submitting ? "Mengirim..." : "Kirim Booking"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/user/rooms")}
            className="px-4 py-2 rounded border"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
