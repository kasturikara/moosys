import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  nama: string;
  email: string;
  role: string;
}

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: (userId: string) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, nama, email, role")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    set({ user: data });
  },
}));
