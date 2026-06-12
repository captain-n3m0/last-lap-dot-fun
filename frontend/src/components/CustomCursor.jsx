import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[data-cursor='interactive']",
].join(",");

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canUseCustomCursor());
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !dotRef.current) return undefined;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });
    const moveCursor = {
      x: gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3.out" }),
      y: gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3.out" }),
      dotX: gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" }),
      dotY: gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" }),
    };

    const handleMove = (event) => {
      moveCursor.x(event.clientX);
      moveCursor.y(event.clientY);
      moveCursor.dotX(event.clientX);
      moveCursor.dotY(event.clientY);
      document.documentElement.classList.add("has-custom-cursor");
      cursor.classList.add("is-visible");
      dot.classList.add("is-visible");
    };

    const handleOver = (event) => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.add("is-interactive");
        dot.classList.add("is-interactive");
      }
    };

    const handleOut = (event) => {
      const fromInteractive = event.target.closest(INTERACTIVE_SELECTOR);
      const toInteractive = event.relatedTarget?.closest?.(INTERACTIVE_SELECTOR);
      if (fromInteractive && fromInteractive !== toInteractive) {
        cursor.classList.remove("is-interactive");
        dot.classList.remove("is-interactive");
      }
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible", "is-interactive");
      dot.classList.remove("is-visible", "is-interactive");
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
