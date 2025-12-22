"use client";

import SidebarUser from "@/components/user/SidebarUser";
import MobileSidebar from "@/components/MobileSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserLayout({ children }) {
  const router = useRouter();
  const { loadUser, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // cek login
  useEffect(() => {
    const isLoggedIn = loadUser();
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
  }, []);

  // cek role user
  useEffect(() => {
    if (!user) return;

    if (user.role !== "user") {
      router.replace("/admin/dashboard");
      return;
    }

    setLoading(false);
  }, [user]);

  if (loading) return null;

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR DESKTOP (ASLI) */}
      <div className="hidden md:block">
        <SidebarUser />
      </div>

      {/* SIDEBAR MOBILE (DRAWER, ASLI) */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <SidebarUser />
      </MobileSidebar>

      {/* KONTEN */}
      <main className="flex-1 bg-gray-50 flex flex-col md:ml-64">
        {/* HEADER */}
        <Header>
          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        </Header>

        {/* PAGE CONTENT */}
        <div className="p-6 flex-1">
          {children}
        </div>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
