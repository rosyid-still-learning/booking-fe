"use client";

import React, { useEffect, useState } from "react";
import RoomCard from "@/components/user/RoomCard";
import { getRooms } from "@/utils/api";
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


  // ================= FILTER KATEGORI (AUTO) =================
  useEffect(() => {
    let result = rooms;

    // pakai searchKeyword (hasil klik tombol cari)
    if (searchKeyword.trim() !== "") {
      result = result.filter((room) =>
        room.name?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // filter kategori langsung jalan
    if (selectedCategory !== "") {
      result = result.filter(
        (room) => room.category === selectedCategory
      );
    }

    setFilteredRooms(result);
  }, [selectedCategory, searchKeyword, rooms]);

  // ================= HANDLE SEARCH BUTTON =================
  const handleSearch = () => {
    setSearchKeyword(searchInput);
  };

  if (loading) return <p>Loading data ruangan...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Ruangan</h1>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-end">
        
        {/* SEARCH */}
        <div className="flex w-full md:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Cari nama ruangan..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Cari
          </button>
        </div>

        {/* FILTER KATEGORI (AUTO) */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">Semua Kategori</option>
          <option value="kampus_tengah">Kampus Tengah</option>
          <option value="kampus_jineng_dalem">Kampus Jineng Dalem</option>
          <option value="kampus_bawah">Kampus Bawah</option>
          <option value="kampus_denpasar">Kampus Denpasar</option>
        </select>
      </div>

      {/* ===== LIST RUANGAN ===== */}
      {filteredRooms.length === 0 ? (
        <p className="text-gray-500">Ruangan tidak ditemukan</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
