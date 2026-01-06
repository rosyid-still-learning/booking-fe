import { create } from "zustand";
import api from "@/lib/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    const res = await api.post("/login", { email, password });

    
    const token = res.data.access_token; // 
    const user = res.data.user;

    if (!token) {
      console.error("LOGIN RESPONSE:", res.data);
      throw new Error("Token tidak ditemukan dari backend");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token });

    return { token, user };
  },

  loadUser: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) return false;

    set({ user: JSON.parse(user), token });
    return true;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
