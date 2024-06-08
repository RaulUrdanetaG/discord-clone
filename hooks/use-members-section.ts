import { create } from "zustand";

interface MembersSection {
  isOpen: boolean;
  setOpen: (data: boolean) => void;
}

export const useMembersSection = create<MembersSection>((set) => ({
  isOpen: true,
  setOpen: (state) => set({ isOpen: state }),
}));
