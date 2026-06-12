import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, scrollToTop } from "@/lib/scroll";

/**
 * Wires the shared editorial reveal vocabulary inside a page root:
 *   .reveal-line > span — line-mask text reveals
 *   .wipe               — clip-path image wipes (inner img scale-settles)
 *   .stagger-up         — children rise in sequence
 * Skipped entirely under prefers-reduced-motion — content is laid out in
 * its final state and only animated FROM, so it stays visible either way.
 */
export function useEditorialMotion(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    // Reset scroll BEFORE creating triggers: building them at the previous
    // page's scroll depth makes reveals self-complete and kill mid-refresh,
    // which corrupts ScrollTrigger's internal array (crash on navigation).
    scrollToTop(true);

    // "play none none none" instead of `once: true` — same play-once
    // behavior without the self-kill that mutates _triggers during refresh
    const ONCE = "play none none none";

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".reveal-line > span").forEach((el) => {
          gsap.from(el, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: el.parentElement, start: "top 85%", toggleActions: ONCE },
          });
        });

        gsap.utils.toArray<HTMLElement>(".wipe").forEach((el) => {
          const img = el.querySelector("img, .wipe-inner");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 78%", toggleActions: ONCE },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power3.inOut" }
          );
          if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.05, ease: "power3.inOut" }, 0);
        });

        gsap.utils.toArray<HTMLElement>(".stagger-up").forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%", toggleActions: ONCE },
          });
        });
      });
    }, root);

    // Re-measure once webfonts and images settle so trigger positions
    // aren't captured against a half-loaded layout
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [root]);
}
