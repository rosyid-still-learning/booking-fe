"use client";

export default function MobileSidebar({ open, onClose, children }) {
  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* DRAWER */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50
        transform transition-transform md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {children}
      </aside>
    </>
  );
}
