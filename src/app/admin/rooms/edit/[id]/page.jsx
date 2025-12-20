"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  // ================= STATE =================
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [facilities, setFacilities] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH DATA =================
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/admin/rooms/${id}`);
        const data = res.data;

        setName(data.name || "");
        setLocation(data.location || "");
        setCapacity(data.capacity || "");
        setCategory(data.category || "");
        setDescription(data.description || "");
        setFacilities(
          Array.isArray(data.facilities)
            ? data.facilities.join(", ")
            : data.facilities || ""
        );
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data ruangan");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("facilities", facilities);
    formData.append("category", category);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
     await api.post(`/admin/rooms/${id}`, formData, {
  headers: {
    "X-HTTP-Method-Override": "PUT",
    "Content-Type": "multipart/form-data",
  },
});


      toast.success("Ruangan berhasil diperbarui");

      setTimeout(() => {
        router.push("/admin/rooms");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Gagal update ruangan"
      );
    }
  };

  // ================= RENDER =================
  if (loading) return <p className="p-6">Memuat data...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      {/* ===== BACK ===== */}
      <button
        onClick={() => router.push("/admin/rooms")}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Kembali
      </button>

      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Ruangan</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Nama Ruangan</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Lokasi</label>
            <input
              type="text"
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
              type="text"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              className="w-full border p-2 rounded"
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
              <option value="">-- Pilih Kategori --</option>
              <option value="kampus_tengah">Kampus Tengah</option>
              <option value="kampus_jineng_dalem">
                Kampus Jineng Dalem
              </option>
              <option value="kampus_bawah">Kampus Bawah</option>
              <option value="kampus_denpasar">
                Kampus Denpasar
              </option>
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

          {/* IMAGE */}
          <div>
            <label className="block font-semibold mb-2">
              Ganti Gambar
            </label>

            <label
              htmlFor="image"
              className="inline-block cursor-pointer rounded border border-blue-600 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100 transition"
            >
              Pilih Gambar Baru
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
              className="hidden"
            />

            {image && (
              <p className="mt-2 text-sm text-gray-600">
                File dipilih:{" "}
                <span className="font-medium">{image.name}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
