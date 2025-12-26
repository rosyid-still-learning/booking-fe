export default function Footer() {
  return (
    <footer className="bg-slate-100 text-gray-600 text-sm text-center py-4 mt-10">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-800">
          Ganesha Booking
        </span>
      </p>
      <p className="mt-1">
        Sistem Peminjaman Ruangan Kampus
      </p>
    </footer>
  );
}
