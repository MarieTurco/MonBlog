"use client";

import React from "react";

export default function Navbar() {
  return (
    <header
      role="banner"
      className="bg-brand-dark text-white shadow-md"
    >
      <nav className="container mx-auto py-4">
        <h1 className="text-center text-2xl font-bold tracking-wide">
          Mon Blog
        </h1>
      </nav>
    </header>
  );
}
