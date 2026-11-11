"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Kalkylens kod hämtas först när sektionen närmar sig bild, så att den inte
// tynger sidans första laddning.
const HomeCalculator = dynamic(() => import("./HomeCalculator"), {
  ssr: false,
  loading: () => <Placeholder />,
});

/** Tomma kort med samma mått som kalkylen, så att sidan inte hoppar. */
function Placeholder() {
  return (
    <div className="grid gap-5 lg:grid-cols-2" aria-hidden="true">
      <div className="min-h-[560px] rounded-[30px] bg-[#FFFDF8] ring-1 ring-ink/[0.06]" />
      <div className="min-h-[420px] rounded-[30px] bg-night lg:min-h-[560px]" />
    </div>
  );
}

export function LazyCalculator() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShow(true);
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <HomeCalculator /> : <Placeholder />}</div>;
}
