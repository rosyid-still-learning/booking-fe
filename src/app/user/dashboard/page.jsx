"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();
  const { loadUser, user } = useAuthStore();

  useEffect(() => {
    if (!loadUser()) router.push("/login");
  }, []);

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat Datang, {user?.name} 👋
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Melalui dashboard ini, Anda dapat melihat daftar ruangan
          yang tersedia dan melakukan pemesanan ruangan sesuai
          kebutuhan kegiatan akademik di Universitas Pendidikan
          Ganesha.
        </p>
      </div>

      {/* INFO BOX */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
        <h2 className="font-semibold text-blue-800 mb-1">
          Informasi Sistem
        </h2>
        <p className="text-sm text-blue-700">
          Sistem ini dirancang untuk mempermudah proses pemesanan
          ruangan secara online dan terorganisir bagi civitas
          akademika.
        </p>
      </div>

      {/* QUICK ACTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <Link
          href="/user/rooms"
          className="group rounded-xl border bg-white p-5 shadow-sm
                     hover:shadow-md hover:border-blue-400
                     transition cursor-pointer"
        >
          <h3 className="font-semibold mb-2 text-lg group-hover:text-blue-600">
            📋 Daftar Ruangan
          </h3>
          <p className="text-sm text-gray-600">
            Lihat informasi ruangan secara detail dan
            ketersediaan ruangan.
          </p>
        </Link>

        <Link
          href="/user/rooms"
          className="group rounded-xl border bg-white p-5 shadow-sm
                     hover:shadow-md hover:border-blue-400
                     transition cursor-pointer"
        >
          <h3 className="font-semibold mb-2 text-lg group-hover:text-blue-600">
            📝 Ajukan Booking
          </h3>
          <p className="text-sm text-gray-600">
            Ajukan pemesanan ruangan sesuai jadwal
            yang diinginkan.
          </p>
        </Link>

        <Link
          href="/user/my-booking"
          className="group rounded-xl border bg-white p-5 shadow-sm
                     hover:shadow-md hover:border-blue-400
                     transition cursor-pointer"
        >
          <h3 className="font-semibold mb-2 text-lg group-hover:text-blue-600">
            ⏳ Status Booking
          </h3>
          <p className="text-sm text-gray-600">
            Pantau status persetujuan pemesanan ruangan
            dan lakukan pembatalan maksimal 24 jam sebelum
            waktu mulai.
          </p>
        </Link>

      </div>
    </div>
  );
}
