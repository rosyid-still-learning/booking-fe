import Image from "next/image";
import Link from "next/link";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTools,
} from "react-icons/fa";

export const metadata = {
  title: "Ganesha Booking | Sistem Booking Ruang Kelas Terintegrasi",
  description:
    "Ganesha Booking adalah sistem booking ruang kelas berbasis digital untuk mahasiswa, dosen, dan admin dalam lingkungan akademik Universitas Pendidikan Ganesha.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://cdn.undiksha.ac.id/wp-content/uploads/2022/08/08151536/Kampus-Undiksha.jpg"
            alt="Gedung kampus Universitas Pendidikan Ganesha Bali"
            fill
            className="object-cover blur-sm brightness-50"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="max-w-3xl px-4">
          {/* LOGO */}
          <Image
            src="https://cdn.undiksha.ac.id/wp-content/uploads/2021/12/27081301/logo-undiksha.png"
            alt="Logo resmi Universitas Pendidikan Ganesha"
            width={140}
            height={140}
            className="mx-auto mb-6"
            priority
          />

          {/* H1 SEO */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Ganesha Booking
          </h1>

          {/* H2 SEO */}
          <h2 className="text-xl md:text-2xl text-gray-200 mb-6">
            Sistem Booking Ruang Kelas Digital untuk Lingkungan Akademik
          </h2>

          <p className="text-gray-300 mb-8">
            Platform terintegrasi untuk mengelola peminjaman ruang kelas secara
            online dengan proses yang terstruktur, transparan, dan mudah
            digunakan.
          </p>

          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Login ke Sistem
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Tentang Ganesha Booking
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Ganesha Booking adalah sistem informasi berbasis web yang dirancang
            untuk membantu pengelolaan peminjaman ruang kelas di lingkungan
            akademik. Sistem ini memastikan setiap proses booking tercatat,
            tervalidasi, dan mudah dipantau oleh pengguna maupun admin.
          </p>
        </div>
      </section>

      {/* TARGET USERS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Untuk Siapa Ganesha Booking?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* MAHASISWA */}
            <div className="p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaUserGraduate className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mahasiswa</h3>
              <p className="text-gray-600">
                Mengajukan peminjaman ruang kelas untuk diskusi, presentasi,
                atau kegiatan akademik lainnya secara online.
              </p>
            </div>

            {/* DOSEN */}
            <div className="p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaChalkboardTeacher className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dosen</h3>
              <p className="text-gray-600">
                Mengatur kebutuhan ruang kelas tambahan, kelas pengganti,
                atau kegiatan akademik dengan sistem yang cepat dan akurat.
              </p>
            </div>

            {/* ADMIN */}
            <div className="p-8 rounded-xl shadow hover:shadow-lg transition">
              <FaTools className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admin</h3>
              <p className="text-gray-600">
                Mengelola data ruang kelas, jadwal, dan pengguna secara
                terpusat untuk memastikan pemanfaatan fasilitas yang optimal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-300 py-6 text-center text-sm">
        © {new Date().getFullYear()} Ganesha Booking — Universitas Pendidikan Ganesha
      </footer>
    </main>
  );
}
