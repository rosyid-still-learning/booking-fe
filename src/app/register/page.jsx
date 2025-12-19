"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import axios from "@/lib/axios"; // sesuaikan path axios kamu

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
        // role TIDAK DIKIRIM
      });

      toast.success("Register berhasil, silakan login!");
      router.push("/login");
    } catch (error) {
      toast.error("Email sudah terdaftar");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 relative">

      {/* 🔙 KEMBALI */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
      >
        <FiArrowLeft />
        <span>Kembali</span>
      </Link>

      {/* REGISTER CARD */}
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border"
      >
        <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">
          Ganesha Booking
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Buat akun baru
        </p>

        {/* NAMA */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Username
          </label>
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FiUser className="text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan nama anda"
              className="w-full p-2 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Email
          </label>
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full p-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-1 block">
            Password
          </label>
          <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <FiLock className="text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow"
        >
          Register
        </button>

        {/* LINK LOGIN */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
