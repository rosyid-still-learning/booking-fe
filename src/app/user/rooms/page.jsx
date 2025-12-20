"use client";

import React, { useEffect, useState } from "react";
import RoomCard from "@/components/user/RoomCard";
import useAuthStore from "@/store/authStore";
import api from "@/lib/axios";

export default function RoomsPage() {
  const { token } = useAuthStore();

  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // FILTER
  const [selectedCategory, setSelectedCategory] = useState("");

  // ================= FETCH DATA =================
  useEffect(() => {
    if (!token) {
      setRooms([]);
      setFilteredRooms([]);
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await api.get("/rooms");
        const roomsList = res.data?.data ?? res.data ?? [];
        setRooms(roomsList);
        setFilteredRooms(roomsList);
      } catch (err) {
        console.error("Gagal load rooms:", err);
        setRooms([]);
        setFilteredRooms([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  // ================= FILTER =================
  useEffect(() => {
    let result = rooms;

    if (searchKeyword.trim() !== "") {
      result = result.filter((room) =>
        room.name?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (selectedCategory !== "") {
      result = result.filter(
        (room) => room.category === selectedCategory
      );
    }

    setFilteredRooms(result);
  }, [selectedCategory, searchKeyword, rooms]);

  const handleSearch = () => {
    setSearchKeyword(searchInput);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">
          Loading data ruangan...
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Daftar Ruangan
        </h1>
        <p className="text-gray-500 mt-1">
          Cari dan filter ruangan sesuai kebutuhan
        </p>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 items-end">
        
        {/* SEARCH */}
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            placeholder="Cari nama ruangan..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg transition"
          >
            Cari
          </button>
        </div>

        {/* FILTER */}
        <div className="w-full md:w-1/4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kategori</option>
            <option value="kampus_tengah">Kampus Tengah</option>
            <option value="kampus_jineng_dalem">Kampus Jineng Dalem</option>
            <option value="kampus_bawah">Kampus Bawah</option>
            <option value="kampus_denpasar">Kampus Denpasar</option>
          </select>
        </div>
      </div>

      {/* ===== LIST RUANGAN ===== */}
      {filteredRooms.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg font-medium">Ruangan tidak ditemukan</p>
          <p className="text-sm mt-1">
            Coba kata kunci atau kategori lain
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
