import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionPolish() {
  useLayoutEffect(() => {
    gsap.config({ force3D: true, nullTargetWarn: false });
    gsap.ticker.lagSmoothing(500, 33);
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

    const cleanups = [];
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (finePointer && !reduced) {
      const cards = document.querySelectorAll(
        ".aw-service-card, .aw-project-card, .aw-approach-card, .aw-about-side, .aw-work-intro"
      );

      cards.forEach((card) => {
        let raf = 0;
        let clientX = 0;
        let clientY = 0;

        const paint = () => {
          const rect = card.getBoundingClientRect();
          const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
          const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
          card.style.setProperty("--pointer-x", `${x}%`);
          card.style.setProperty("--pointer-y", `${y}%`);
          raf = 0;
        };

        const move = (event) => {
          clientX = event.clientX;
          clientY = event.clientY;
          if (!raf) raf = requestAnimationFrame(paint);
        };

        const leave = () => {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          card.style.setProperty("--pointer-x", "50%");
          card.style.setProperty("--pointer-y", "35%");
        };

        card.addEventListener("pointermove", move, { passive: true });
        card.addEventListener("pointerleave", leave, { passive: true });
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          if (raf) cancelAnimationFrame(raf);
        });
      });
    }

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray(".aw-section-head").forEach((head) => {
          const title = head.querySelector("h2");
          const copy = head.querySelector("p");
          if (!title) return;
          gsap.fromTo(
            title,
            { yPercent: 12, autoAlpha: 0.72 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: head,
                start: "top 88%",
                end: "top 48%",
                scrub: 0.35,
              },
            }
          );
          if (copy) {
            gsap.fromTo(
              copy,
              { y: 18, autoAlpha: 0.45 },
              {
                y: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: head,
                  start: "top 90%",
                  end: "top 55%",
                  scrub: 0.35,
                },
              }
            );
          }
        });

        gsap.utils.toArray(".aw-service-art").forEach((art) => {
          gsap.to(art, {
            yPercent: -12,
            rotate: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: art.closest(".aw-service-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(() => requestAnimationFrame(refresh));
    ScrollTrigger.sort();

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
