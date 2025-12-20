"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // SEARCH
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // FILTER
  const [selectedCategory, setSelectedCategory] = useState("");

  // ================= FORMAT CATEGORY =================
  const formatCategory = (category) => {
    if (!category) return "-";
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ================= FETCH ROOMS (ADMIN) =================
  const fetchRooms = async () => {
    try {
      const res = await api.get("/admin/rooms");
      const list = res.data?.data ?? [];
      setRooms(list);
      setFilteredRooms(list);
    } catch (err) {
      console.error("ADMIN ROOMS ERROR:", err);
      toast.error("Gagal mengambil data ruangan (Admin)");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ================= FILTER + SEARCH =================
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
  }, [searchKeyword, selectedCategory, rooms]);

  const handleSearch = () => {
    setSearchKeyword(searchInput);
  };

  // ================= DELETE ROOM =================
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="space-y-3">
          <p className="font-semibold">
            Apakah kamu yakin ingin menghapus ruangan ini?
          </p>

          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Batal
            </button>

            <button
              className="px-3 py-1 rounded bg-red-600 text-white text-sm"
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Menghapus ruangan...");

                try {
                  await api.delete(`/admin/rooms/${id}`);

                  setRooms((prev) =>
                    prev.filter((room) => room.id !== id)
                  );

                  toast.success("Ruangan berhasil dihapus");
                } catch (err) {
                  console.error(err);
                  toast.error("Terjadi kesalahan saat menghapus");
                } finally {
                  toast.dismiss(loadingToast);
                }
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  // ================= RENDER =================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Ruangan</h1>

      <a
        href="/admin/rooms/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6"
      >
        + Tambah Ruangan
      </a>

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

        {/* FILTER */}
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

      {/* ===== LIST ===== */}
      {filteredRooms.length === 0 ? (
        <p className="text-gray-500">Ruangan tidak ditemukan</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="border rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
  src={room.image_url || "https://via.placeholder.com/400x250?text=No+Image"}
  alt={room.name}
  className="w-full h-40 object-cover rounded"
/>



              <h2 className="text-lg font-bold">{room.name}</h2>
              <p className="text-gray-600 text-sm">{room.location}</p>
              <p className="text-gray-600 text-sm">
                Kapasitas: {room.capacity}
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1">
                {formatCategory(room.category)}
              </p>

              <div className="flex gap-2 mt-4">
                <a
                  href={`/admin/rooms/edit/${room.id}`}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded text-center"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
