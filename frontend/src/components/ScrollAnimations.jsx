import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  ".hero-title",
  ".hero-sub",
  ".card-ll:not(.menu-panel)",
  ".card-ll-inner",
  ".row-animate",
  ".card-animate",
  ".fade-in-up",
].join(",");

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const triggers = [];
    const timer = window.setTimeout(() => {
      const revealTargets = gsap.utils
        .toArray(REVEAL_SELECTOR)
        .filter((node) => !node.closest(".menu-panel"));

      if (revealTargets.length) {
        gsap.set(revealTargets, { autoAlpha: 0, y: 24, willChange: "transform, opacity" });
        triggers.push(
          ...ScrollTrigger.batch(revealTargets, {
            id: "lastlap-reveal",
            start: "top 92%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                ease: "power3.out",
                stagger: 0.055,
                clearProps: "transform,opacity,visibility,willChange",
              });
            },
          }),
        );
      }

      ScrollTrigger.refresh();
    }, 80);

    return () => {
      window.clearTimeout(timer);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [location.pathname, location.search]);

  return null;
}
