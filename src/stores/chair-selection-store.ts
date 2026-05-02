import { create } from "zustand";
import type { TestimonialStaffFilter } from "@/lib/constants";

type ChairSelectionState = {
  selectedBarber: TestimonialStaffFilter;
  setSelectedBarber: (value: TestimonialStaffFilter) => void;
};

export const useChairSelectionStore = create<ChairSelectionState>((set) => ({
  selectedBarber: "all",
  setSelectedBarber: (selectedBarber) => set({ selectedBarber }),
}));
