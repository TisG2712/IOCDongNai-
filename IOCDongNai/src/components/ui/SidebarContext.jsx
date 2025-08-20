import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  const openSidebar = useCallback(
    ({ title: newTitle = "", items: newItems = [] }) => {
      setTitle(newTitle);
      setItems(Array.isArray(newItems) ? newItems : []);
      setIsOpen(true);
    },
    []
  );

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      title,
      items,
      openSidebar,
      closeSidebar,
    }),
    [isOpen, title, items, openSidebar, closeSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}

