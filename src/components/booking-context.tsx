"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
type BookingContextValue = {
  drawerOpen: boolean;
  openDrawer: (booksyServiceId?: string | null) => void;
  closeDrawer: () => void;
  preselectedBooksyServiceId: string | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [preselectedBooksyServiceId, setPreselectedBooksyServiceId] = useState<
    string | null
  >(null);

  const openDrawer = useCallback((booksyServiceId?: string | null) => {
    setPreselectedBooksyServiceId(
      booksyServiceId != null && booksyServiceId !== ""
        ? booksyServiceId
        : null
    );
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      drawerOpen,
      openDrawer,
      closeDrawer,
      preselectedBooksyServiceId,
    }),
    [drawerOpen, openDrawer, closeDrawer, preselectedBooksyServiceId]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
