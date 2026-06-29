"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { DemoNavbar } from "@/components/demo/DemoNavbar";

/**
 * Väljer rätt navbar per route. Demo-rutter (/admin/demo/*) får DemoNavbar
 * (med gradient-knappen); allt annat får den vanliga Navbar:n oförändrad.
 * Live-beteendet är identiskt eftersom default-grenen returnerar Navbar.
 */
export function SiteNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin/demo")) {
    return <DemoNavbar />;
  }
  return <Navbar />;
}
