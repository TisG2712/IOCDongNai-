import React, { useEffect, useRef, useState } from "react";
import { useSidebar } from "./SidebarContext";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isOpen, title, items, closeSidebar } = useSidebar();
  const [topOffset, setTopOffset] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    const computeOffset = () => {
      const header = document.getElementById("app-header");
      const navbar = document.getElementById("app-navbar");
      const headerHeight = header ? header.offsetHeight : 0;
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      setTopOffset(headerHeight + navbarHeight);
    };
    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, []);

  useEffect(() => {
    const onMouseDown = (ev) => {
      if (!isOpen) return;
      const panel = panelRef.current;
      if (panel && !panel.contains(ev.target)) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen, closeSidebar]);

  return (
    <>
      {/* Panel below navbar - Yellow theme harmonized */}
      <aside
        ref={panelRef}
        className={`fixed left-0 w-64 bg-yellow-200 shadow-xl transform transition-transform z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: topOffset, height: `calc(100vh - ${topOffset}px)` }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-400 bg-amber-100/60">
          <h3 className="text-xs font-semibold text-red-700 tracking-wide">
            {title}
          </h3>
          <button
            className="text-red-700 text-xs hover:text-red-600"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-2 text-xs overflow-y-auto custom-scrollbar-hidden flex-1">
          {items && items.length > 0 ? (
            <ul className="space-y-1">
              {items.map((item, idx) => {
                const isObject = item && typeof item === "object";
                const label = isObject ? item.label : item;
                const to = isObject ? item.to : undefined;
                const onClick = isObject ? item.onClick : undefined;

                return (
                  <li key={idx}>
                    {to ? (
                      <Link
                        to={to}
                        className="block w-full text-left px-2 py-2 rounded text-red-700 hover:bg-amber-300/80 hover:text-red-800 transition-colors"
                        onClick={closeSidebar}
                      >
                        {label}
                      </Link>
                    ) : (
                      <button
                        className="w-full text-left px-2 py-2 rounded text-red-700 hover:bg-amber-300/80 hover:text-red-800 transition-colors"
                        onClick={() => {
                          if (typeof onClick === "function") onClick();
                          closeSidebar();
                        }}
                      >
                        {label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-white/80 px-3 py-2">Không có mục nào</div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
