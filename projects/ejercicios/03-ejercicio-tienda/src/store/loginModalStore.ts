import { create } from "zustand";

interface LoginModalStore {
    openLogin: boolean;
    setOpenLogin: (open: boolean) => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
    openLogin: false,
    setOpenLogin: (open) => set({ openLogin: open })
}))