"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-neutral-200 text-neutral-800 py-4 mt-8"
    >
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Mon Blog. Tous droits réservés.
      </div>
    </footer>
  );
}
