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

  if (!image) {
    toast.error("Foto ruangan wajib diisi");
    return;
  }

  setLoading(true);

  try {
    // 🔥 UPLOAD KE CLOUDINARY
    const imageUrl = await uploadToCloudinary(image);

    // 🔥 KIRIM JSON, BUKAN FORM DATA
    await api.post("/admin/rooms", {
      name,
      location,
      capacity: Number(capacity),
      facilities: facilities.split(",").map(f => f.trim()),
      category: category, // SESUAI EDIT
      description,
      image: imageUrl, // STRING URL
    });

    toast.success("Ruangan berhasil ditambahkan");
    router.push("/admin/rooms");
  } catch (err) {
    console.error(err?.response?.data || err);
    toast.error("Gagal menambah ruangan");
  } finally {
    setLoading(false);
  }
};


const uploadToCloudinary = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", "rooms_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dgkajfw1b/image/upload",
    {
      method: "POST",
      body: fd,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Upload gambar ke Cloudinary gagal");
  }

  return data.secure_url;
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
  <option value="1">Kampus Tengah</option>
  <option value="2">Kampus Jineng Dalem</option>
  <option value="3">Kampus Bawah</option>
  <option value="4">Kampus Denpasar</option>
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
