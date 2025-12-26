import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Ganesha Booking | Sistem Booking Ruang Kelas Kampus",
  description:
    "Ganesha Booking adalah sistem booking ruang kelas berbasis digital untuk lingkungan akademik. Memudahkan mahasiswa, dosen, dan admin dalam mengatur peminjaman ruangan kampus.",
  keywords: [
    "sistem booking ruang kelas",
    "peminjaman ruangan kampus",
    "booking kelas universitas",
    "aplikasi booking ruang kelas",
    "sistem informasi akademik",
  ],
  authors: [{ name: "Ganesha Booking" }],
  creator: "Ganesha Booking",
  publisher: "Universitas Pendidikan Ganesha",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ganesha Booking",
    description:
      "Sistem booking ruang kelas digital untuk lingkungan akademik.",
    siteName: "Ganesha Booking",
    locale: "id_ID",
    type: "website",
  },

  // 🔥 INI YANG KURANG (WAJIB)
  verification: {
    google: "VrJmauicxLCajJmafxpDaSNuGWZduXo-_0wiwNCacOk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
