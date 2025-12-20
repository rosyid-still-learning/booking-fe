"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreateRoomPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    facilities: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===============================
  // CLOUDINARY UPLOAD (FRONTEND)
  // ===============================
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rooms_unsigned");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgkajfw1b/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
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
        ...form,
        capacity: Number(form.capacity),
        image: imageUrl,
      });

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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Ruangan</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Nama"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Lokasi"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Kapasitas"
          type="number"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        <input
          placeholder="Fasilitas (AC, Proyektor)"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, facilities: e.target.value })}
        />
        <textarea
          placeholder="Deskripsi"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && (
          <img src={preview} className="h-40 object-cover rounded" />
        )}

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
