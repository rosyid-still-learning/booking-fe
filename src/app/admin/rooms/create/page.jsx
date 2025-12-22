"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreateRoomPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("location", location);
  formData.append("capacity", capacity);
  formData.append("facilities", facilities);
  formData.append("category_id", category); // 🔥 FIX
  formData.append("description", description);
  if (image) formData.append("image", image);

  setLoading(true);
  try {
    await api.post("/admin/rooms", formData);
    toast.success("Ruangan berhasil ditambahkan");
    router.push("/admin/rooms");
  } catch (err) {
    console.error(err);
    toast.error("Gagal menambah ruangan");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/admin/rooms")}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        ← Kembali
      </button>

      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tambah Ruangan</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Nama Ruangan</label>
            <input
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Lokasi</label>
            <input
              className="w-full border p-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Kapasitas</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Fasilitas</label>
            <input
              className="w-full border p-2 rounded"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              placeholder="AC, Proyektor, Whiteboard"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Kategori</label>
            <select
              className="w-full border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Pilih Kampus --</option>
              <option value="kampus_tengah">Kampus Tengah</option>
              <option value="kampus_jineng_dalem">Kampus Jineng Dalem</option>
              <option value="kampus_bawah">Kampus Bawah</option>
              <option value="kampus_denpasar">Kampus Denpasar</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Deskripsi</label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold mb-2 block">Foto Ruangan</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}
