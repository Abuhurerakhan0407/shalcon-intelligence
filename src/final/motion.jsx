import { useLayoutEffect } from "react";
import { useReducedMotionPreference } from "./ui.jsx";

const EASE = "power3.out";

export function usePortfolioMotion(ready = true) {
  const reduced = useReducedMotionPreference();

  useLayoutEffect(() => {
    if (!ready || reduced || typeof window === "undefined") return undefined;

    let cancelled = false;
    let dispose = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.gsap || gsapModule.default;
        const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default;
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        const pointerCleanups = [];

        // Cursor-proximity lighting. The surface remains fully usable without JS;
        // these variables only steer a decorative radial highlight.
        document
          .querySelectorAll(".service-card, .industry-card, .production-card, .roi-shell")
          .forEach((surface) => {
            const onMove = (event) => {
              const rect = surface.getBoundingClientRect();
              surface.style.setProperty("--mx", `${event.clientX - rect.left}px`);
              surface.style.setProperty("--my", `${event.clientY - rect.top}px`);
            };
            surface.addEventListener("pointermove", onMove, { passive: true });
            pointerCleanups.push(() => surface.removeEventListener("pointermove", onMove));
          });

        mm.add("all", () => {
          // A masked reveal adds hierarchy without turning every section into the
          // same fade-up pattern. Framer Motion still owns parent component entry.
          gsap.utils.toArray(".section-heading h2").forEach((title) => {
            gsap.fromTo(
              title,
              { clipPath: "inset(0 0 100% 0)", y: 26 },
              {
                clipPath: "inset(0 0 0% 0)",
                y: 0,
                duration: 0.82,
                ease: EASE,
                scrollTrigger: { trigger: title, start: "top 88%", once: true },
              },
            );
          });

          // Draw the orchestration network, then the existing signal pulses keep
          // communicating live system activity.
          gsap.utils.toArray(".beam.base").forEach((path, index) => {
            gsap.fromTo(
              path,
              { strokeDasharray: 900, strokeDashoffset: 900 },
              {
                strokeDashoffset: 0,
                duration: 1.15,
                delay: index * 0.045,
                ease: "power2.out",
                scrollTrigger: { trigger: ".flow-stage", start: "top 76%", once: true },
              },
            );
          });

          gsap.fromTo(
            ".flow-node",
            { y: 18, scale: 0.965, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.58,
              stagger: 0.07,
              ease: EASE,
              scrollTrigger: { trigger: ".flow-stage", start: "top 72%", once: true },
            },
          );

          // Process progress is tied directly to how far the visitor has read.
          gsap.fromTo(
            ".process-line span",
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".process-track",
                start: "top 72%",
                end: "bottom 58%",
                scrub: 0.45,
              },
            },
          );

          gsap.utils.toArray(".process-step").forEach((step) => {
            const node = step.querySelector(".step-node");
            if (!node) return;
            gsap.fromTo(
              node,
              { scale: 0.78, rotate: -9 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: EASE,
                scrollTrigger: { trigger: step, start: "top 82%", once: true },
              },
            );
          });

          // Business-use-case connectors behave like data packets travelling from
          // event → response when the row becomes relevant.
          gsap.utils.toArray(".usecase-row").forEach((row) => {
            const signal = row.querySelector("i b");
            if (!signal) return;
            gsap.fromTo(
              signal,
              { xPercent: -110 },
              {
                xPercent: 110,
                duration: 0.95,
                ease: "power2.inOut",
                scrollTrigger: { trigger: row, start: "top 88%", once: true },
              },
            );
          });

          // One authored closing moment resolves the signal/light language used
          // through the rest of the page.
          gsap.fromTo(
            ".cta-lamp",
            { yPercent: 18, scale: 0.82, opacity: 0.42 },
            {
              yPercent: -5,
              scale: 1.12,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".cta-section",
                start: "top bottom",
                end: "center 48%",
                scrub: 0.7,
              },
            },
          );

          gsap.fromTo(
            ".avatar-monogram",
            { scale: 0.9, rotate: -4 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: EASE,
              scrollTrigger: { trigger: ".about-visual", start: "top 78%", once: true },
            },
          );

          return () => {};
        });

        mm.add("(min-width: 901px)", () => {
          // Desktop gets the cinematic depth pass; mobile keeps shorter travel.
          gsap.to(".hero-copy", {
            y: -46,
            opacity: 0.58,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom 18%",
              scrub: 0.75,
            },
          });

          gsap.to(".hero-spotlight", {
            xPercent: -8,
            yPercent: 18,
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          gsap.to(".project-sticky", {
            y: -24,
            rotateY: 2.2,
            transformPerspective: 1200,
            ease: "none",
            scrollTrigger: {
              trigger: ".projects-layout",
              start: "top 18%",
              end: "bottom 82%",
              scrub: 0.8,
            },
          });

          gsap.utils.toArray(".project-copy h3").forEach((title) => {
            gsap.fromTo(
              title,
              { x: -34, opacity: 0.45 },
              {
                x: 0,
                opacity: 1,
                duration: 0.65,
                ease: EASE,
                scrollTrigger: { trigger: title, start: "top 76%", once: true },
              },
            );
          });

          return () => {};
        });

        mm.add("(max-width: 900px)", () => {
          gsap.to(".hero-spotlight", {
            yPercent: 10,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.45,
            },
          });

          gsap.utils.toArray(".mobile-project-visual").forEach((visual) => {
            gsap.fromTo(
              visual,
              { scale: 0.975, y: 16 },
              {
                scale: 1,
                y: 0,
                duration: 0.55,
                ease: EASE,
                scrollTrigger: { trigger: visual, start: "top 88%", once: true },
              },
            );
          });

          return () => {};
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready?.then(refresh).catch(() => {});
        window.addEventListener("load", refresh, { once: true });

        dispose = () => {
          pointerCleanups.forEach((cleanup) => cleanup());
          window.removeEventListener("load", refresh);
          mm.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, [ready, reduced]);
}
