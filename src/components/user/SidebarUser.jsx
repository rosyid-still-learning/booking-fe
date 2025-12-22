"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiList, FiBookmark, FiLogOut } from "react-icons/fi";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function SidebarUser() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const menu = [
    { name: "Dashboard", href: "/user/dashboard", icon: <FiHome /> },
    { name: "Daftar Ruangan", href: "/user/rooms", icon: <FiList /> },
    {
      name: "Status Booking Saya",
      href: "/user/my-booking",
      icon: <FiBookmark />,
    },
  ];

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Apakah kamu yakin ingin logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 border rounded"
          >
            Batal
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              logout();
              toast.success("Logout berhasil");
              router.push("/login");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50 flex flex-col p-5">
      {/* LOGO + TITLE */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="https://cdn.undiksha.ac.id/wp-content/uploads/2021/12/27081301/logo-undiksha.png"
          alt="Logo Undiksha"
          width={36}
          height={36}
          priority
        />
        <h1 className="text-lg font-bold tracking-wide">
          Ganesha Booking
        </h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 flex flex-col gap-1">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded transition
              ${
                pathname === item.href
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-800"
              }
            `}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded text-red-400 hover:bg-red-600 hover:text-white transition"
      >
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
