"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreateRoomPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    building: "",
    floor: "",
    capacity: "",
    facilities: "",
    description: "",
    category: "",
  });

  const [facilities, setFacilities] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("location", form.building);
      data.append("capacity", Number(form.capacity));
      data.append("facilities", facilities);
      data.append("category", form.category);
      data.append("description", form.description ?? "");
      data.append("is_active", "1");

      if (image) {
        data.append("image", image);
      }

      await axios.post("/admin/rooms", data);

      toast.success("Ruangan berhasil ditambahkan");

      setTimeout(() => {
        router.push("/admin/rooms");
      }, 1500);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Gagal menambah ruangan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* ===== TOMBOL KEMBALI (KIRI ATAS) ===== */}
      <button
        onClick={() => router.push("/admin/rooms")}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Kembali
      </button>

      {/* ===== FORM ===== */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-5">
          Tambah Ruangan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preview Gambar */}
          <div className="w-full flex justify-center">
            <img
              src={preview || "/no-image.png"}
              alt="Preview"
              className="w-64 h-40 object-cover border rounded"
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block font-semibold mb-2">
              Foto Ruangan
            </label>

            <label
              htmlFor="image"
              className="inline-block cursor-pointer rounded border border-blue-600 bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100 transition"
            >
              Pilih Foto
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

            {image && (
              <p className="mt-2 text-sm text-gray-600">
                File dipilih:{" "}
                <span className="font-medium">
                  {image.name}
                </span>
              </p>
            )}
          </div>

          {/* Nama Ruangan */}
          <div>
            <label className="block font-semibold">
              Nama Ruangan
            </label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={form.name}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Gedung */}
          <div>
            <label className="block font-semibold">
              Gedung
            </label>
            <input
              name="building"
              type="text"
              onChange={handleChange}
              value={form.building}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Lantai */}
          <div>
            <label className="block font-semibold">
              Lantai
            </label>
            <input
              name="floor"
              type="number"
              onChange={handleChange}
              value={form.floor}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Kapasitas */}
          <div>
            <label className="block font-semibold">
              Kapasitas
            </label>
            <input
              name="capacity"
              type="number"
              onChange={handleChange}
              value={form.capacity}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Fasilitas */}
          <div>
            <label className="font-semibold">
              Fasilitas
            </label>
            <input
              type="text"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="contoh : AC, Proyektor, Whiteboard"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows="4"
              onChange={handleChange}
              value={form.description}
              className="border p-2 w-full"
            />
          </div>

          {/* Kategori Kampus */}
          <div>
            <label className="block font-semibold">
              Kategori Kampus
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">-- Pilih Kampus --</option>
              <option value="kampus_tengah">
                Kampus Tengah
              </option>
              <option value="kampus_jineng_dalem">
                Kampus Jineng Dalem
              </option>
              <option value="kampus_bawah">
                Kampus Bawah
              </option>
              <option value="kampus_denpasar">
                Kampus Denpasar
              </option>
            </select>
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/rooms")}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
