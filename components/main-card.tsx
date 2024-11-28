'use client'

import { useEffect } from "react";

export default function MainCard({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  useEffect(() => {
    const root = document.documentElement;
    const root_rect = root.getBoundingClientRect();
    const card = document.getElementById('main-card');
    const card_rect = card?.getBoundingClientRect();
    if (!card_rect || !root_rect) {
      return;
    }
    const {x, y, width, height} = card_rect;
    root.addEventListener("mousemove", (e) => {
      root.style.setProperty('--shadow-x', -(e.clientX - x - width / 2) / root_rect.width * 14 + 'px');
      root.style.setProperty('--shadow-y', -(e.clientY - y - height / 2) / root_rect.height * 14 + 'px');
    });
  }, []);

  return (
    <div id="main-card" className="grid justify-items-center relative aspect-[7/4] w-1/2
      bg-[url('../public/paper-texture.jpg')] bg-center bg-cover
      drop-shadow-[var(--shadow-x)_var(--shadow-y)_14px_dimgray]"
    >
      {children}
    </div>
  );
}
