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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔥 UPLOAD KE CLOUDINARY (FIX UTAMA)
  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "rooms_unsigned");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgkajfw1b/image/upload",
      { method: "POST", body: fd }
    );

    const data = await res.json();
    if (!data.secure_url) {
      throw new Error("Upload Cloudinary gagal");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      await axios.post("/admin/rooms", {
        name: form.name,
        location: form.building,
        capacity: Number(form.capacity),
        facilities,
        category: form.category,
        description: form.description ?? "",
        is_active: 1,
        image: imageUrl, // ✅ STRING URL
      });

      toast.success("Ruangan berhasil ditambahkan");
      setTimeout(() => router.push("/admin/rooms"), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menambah ruangan");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI ASLI (TIDAK DIUBAH) =================
  return (
    <div className="p-6">
      <button
        onClick={() => router.push("/admin/rooms")}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Kembali
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-5">Tambah Ruangan</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full flex justify-center">
            <img
              src={preview || "/no-image.png"}
              className="w-64 h-40 object-cover border rounded"
            />
          </div>

          <input type="file" accept="image/*" onChange={handleImage} />

          <input name="name" onChange={handleChange} value={form.name} required />
          <input name="building" onChange={handleChange} value={form.building} required />
          <input name="floor" onChange={handleChange} value={form.floor} required />
          <input name="capacity" type="number" onChange={handleChange} value={form.capacity} required />
          <input value={facilities} onChange={(e) => setFacilities(e.target.value)} required />

          <textarea name="description" onChange={handleChange} value={form.description} />

          <select name="category" onChange={handleChange} value={form.category} required>
            <option value="">-- Pilih Kampus --</option>
            <option value="kampus_tengah">Kampus Tengah</option>
            <option value="kampus_jineng_dalem">Jineng Dalem</option>
            <option value="kampus_bawah">Kampus Bawah</option>
            <option value="kampus_denpasar">Denpasar</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
}
