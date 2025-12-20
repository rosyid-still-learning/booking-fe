"use client";
import Link from "next/link";

// helper aman buat format kategori
const formatCategory = (category: string) => {
  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function RoomCard({ room }) {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col bg-white hover:shadow-md transition">
      
      {/* IMAGE */}
      <img
        src={room.image || "https://via.placeholder.com/400x250?text=No+Image"}
        alt={room.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-900">
        {room.name}
      </h2>

      {/* LOCATION */}
      <p className="text-sm text-gray-500">
        {room.location}
      </p>

      {/* CATEGORY */}
      {room.category && (
        <span className="mt-2 w-fit inline-block text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {formatCategory(room.category)}
        </span>
      )}

      {/* CAPACITY */}
      <p className="text-sm mt-3 text-gray-700">
        Kapasitas: <span className="font-medium">{room.capacity}</span> orang
      </p>

      {/* ACTION */}
      <div className="flex gap-2 mt-4">
        <Link
          href={`/user/rooms/${room.id}`}
          className="flex-1 text-center border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-100 transition"
        >
          Detail
        </Link>

        <Link
          href={`/user/booking/${room.id}`}
          className="flex-1 text-center bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700 transition"
        >
          Booking
        </Link>
      </div>
    </div>
  );
}
