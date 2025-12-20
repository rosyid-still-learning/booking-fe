"use client";

import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col bg-white">
      {/* FOTO */}
      {room.image_url && (
        <img
          src={room.image_url}
          alt={`Foto ruangan ${room.name}`}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      {/* INFO */}
      <h2 className="text-lg font-bold">{room.name}</h2>
      <p className="text-sm text-gray-600">{room.location}</p>

      {room.category && (
        <span className="mt-2 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {room.category
            .replaceAll("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      )}

      <p className="text-sm mt-2">Kapasitas: {room.capacity} orang</p>

      {/* AKSI */}
      <div className="flex gap-2 mt-4">
        <Link
          href={`/user/rooms/${room.id}`}
          className="flex-1 text-center border rounded py-2 hover:bg-gray-100"
        >
          Detail
        </Link>

        <Link
          href={`/user/booking/${room.id}`}
          className="flex-1 text-center bg-green-600 text-white rounded py-2 hover:bg-green-700"
        >
          Booking
        </Link>
      </div>
    </div>
  );
}
