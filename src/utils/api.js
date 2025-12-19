// src/utils/api.js
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function safeFetch(url, opts = {}) {
  const headers = {
    Accept: "application/json",
    ...(opts.headers || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...opts,
    headers,
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    throw new Error(body?.message || `HTTP ${res.status}`);
  }

  return body;
}

export async function getRooms() {
  return safeFetch(`${API_BASE}/rooms`);
}

export async function getRoomDetail(id) {
  return safeFetch(`${API_BASE}/rooms/${id}`);
}

export async function getPendingBookingCount() {
  return safeFetch(`${API_BASE}/admin/bookings/pending-count`);
}
