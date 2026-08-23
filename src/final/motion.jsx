import { useLayoutEffect } from "react";
import { useReducedMotionPreference } from "./ui.jsx";
import { setHeroScrollState } from "./scrollState.js";

const EASE = "power3.out";

function createHeroTimeline(gsap, ScrollTrigger, { distance, scrub, mobile = false }) {
  const hero = document.querySelector(".hero-story");
  if (!hero) return null;

  gsap.set(".scene-label", { autoAlpha: 0, scale: 0.82 });
  gsap.set(".hero-stage", { autoAlpha: 0, y: 10 });
  gsap.set(".hero-transition-copy", { autoAlpha: 0, y: 10 });
  gsap.set(".stage-core", { autoAlpha: 1, y: 0 });
  setHeroScrollState(0, 0);

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: mobile ? "bottom top" : `+=${distance}`,
      pin: !mobile,
      scrub,
      anticipatePin: mobile ? 0 : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => setHeroScrollState(self.progress, self.getVelocity()),
      onRefresh: (self) => setHeroScrollState(self.progress, 0),
    },
  });

  timeline
    .to(".hero-scroll-cue", { autoAlpha: 0, duration: 0.08 }, 0.02)
    .to(".hero-grid-bg", { scale: 1.1, opacity: 0.7, duration: 0.34 }, 0.02)
    .to(".hero-spotlight", { xPercent: -10, yPercent: 16, scale: 1.24, duration: 0.42 }, 0.02)
    .to(".scene-agent", { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.1)
    .to(".stage-core", { autoAlpha: 0, y: -8, duration: 0.07 }, 0.17)
    .to(".stage-context", { autoAlpha: 1, y: 0, duration: 0.08 }, 0.17)
    .to(".scene-crm, .scene-api", { autoAlpha: 1, scale: 1, duration: 0.11, stagger: 0.035 }, 0.21)
    .to(".scene-data, .scene-human", { autoAlpha: 1, scale: 1, duration: 0.11, stagger: 0.035 }, 0.3)
    .to(".scene-wa", { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.37)
    .to(".stage-context", { autoAlpha: 0, y: -8, duration: 0.06 }, 0.39)
    .to(".stage-route", { autoAlpha: 1, y: 0, duration: 0.08 }, 0.39)
    .to(".hero-copy", {
      xPercent: mobile ? -2 : -6,
      y: mobile ? -28 : -72,
      autoAlpha: mobile ? 0.34 : 0.22,
      duration: 0.28,
    }, 0.43)
    .to(".scene-label", { y: -6, duration: 0.2, stagger: 0.01 }, 0.48)
    .to(".stage-route", { autoAlpha: 0, y: -8, duration: 0.06 }, 0.61)
    .to(".stage-system", { autoAlpha: 1, y: 0, duration: 0.08 }, 0.61)
    .to(".hero-transition-copy", { autoAlpha: 1, y: 0, duration: 0.1 }, 0.68)
    .to(".hero-visual", {
      scale: mobile ? 1.035 : 1.075,
      borderColor: "rgba(0,255,138,.15)",
      duration: 0.22,
    }, 0.68)
    .to(".scene-label", { autoAlpha: 0, scale: 0.9, duration: 0.12, stagger: 0.012 }, 0.82)
    .to(".hero-stage", { autoAlpha: 0, duration: 0.08 }, 0.84)
    .to(".hero-transition-copy", { autoAlpha: 0, y: -10, duration: 0.08 }, 0.9)
    .to(".hero-copy", { autoAlpha: 0, duration: 0.08 }, 0.9)
    .to(".hero-grid-bg", { opacity: 0.12, scale: 1.22, duration: 0.1 }, 0.9);

  return timeline;
}

function createFlowTimeline(gsap) {
  const stage = document.querySelector(".flow-stage");
  if (!stage) return null;

  gsap.set(".beam.base", { strokeDasharray: 900, strokeDashoffset: 900 });
  gsap.set(".flow-story-step", { autoAlpha: 0, y: 9 });
  gsap.set(".flow-step-1", { autoAlpha: 1, y: 0 });
  gsap.set(".flow-node.orchestrator, .flow-node.system, .flow-node.outcome", { autoAlpha: 0, filter: "blur(5px)" });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top 78%",
      end: "bottom 22%",
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .fromTo(".flow-node.lead", { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.08 }, 0)
    .to(".beam.base.b1", { strokeDashoffset: 0, duration: 0.13 }, 0.08)
    .to(".flow-node.orchestrator", { autoAlpha: 1, filter: "blur(0px)", duration: 0.1 }, 0.18)
    .to(".flow-step-1", { autoAlpha: 0, y: -8, duration: 0.05 }, 0.2)
    .to(".flow-step-2", { autoAlpha: 1, y: 0, duration: 0.07 }, 0.2)
    .to(".flow-node.orchestrator", { boxShadow: "0 0 0 12px rgba(0,255,138,.035), 0 26px 100px rgba(0,255,138,.16)", duration: 0.12 }, 0.28)
    .to(".flow-step-2", { autoAlpha: 0, y: -8, duration: 0.05 }, 0.36)
    .to(".flow-step-3", { autoAlpha: 1, y: 0, duration: 0.07 }, 0.36)
    .to(".beam.base.b2, .beam.base.b3, .beam.base.b4", { strokeDashoffset: 0, duration: 0.16, stagger: 0.025 }, 0.39)
    .to(".flow-node.system", { autoAlpha: 1, filter: "blur(0px)", duration: 0.12, stagger: 0.035 }, 0.5)
    .to(".flow-step-3", { autoAlpha: 0, y: -8, duration: 0.05 }, 0.65)
    .to(".flow-step-4", { autoAlpha: 1, y: 0, duration: 0.07 }, 0.65)
    .to(".beam.base.b5, .beam.base.b6, .beam.base.b7", { strokeDashoffset: 0, duration: 0.15, stagger: 0.025 }, 0.68)
    .to(".flow-node.outcome", { autoAlpha: 1, filter: "blur(0px)", duration: 0.12 }, 0.81)
    .to(".flow-stage", { borderColor: "rgba(0,255,138,.18)", duration: 0.1 }, 0.88);

  return timeline;
}

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
          const heroTimeline = createHeroTimeline(gsap, ScrollTrigger, { distance: 2700, scrub: 0.9 });
          const flowTimeline = createFlowTimeline(gsap);

          gsap.to(".project-sticky", {
            y: -18,
            rotateX: -1.8,
            rotateY: 3.8,
            scale: 1.015,
            transformPerspective: 1300,
            ease: "none",
            scrollTrigger: {
              trigger: ".projects-layout",
              start: "top 18%",
              end: "bottom 82%",
              scrub: 0.8,
            },
          });

          gsap.utils.toArray(".project-copy").forEach((item) => {
            gsap.fromTo(
              item,
              { x: 28 },
              {
                x: -12,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top 88%",
                  end: "bottom 20%",
                  scrub: 0.6,
                },
              },
            );
          });

          return () => {
            heroTimeline?.kill();
            flowTimeline?.kill();
            setHeroScrollState(0, 0);
          };
        });

        mm.add("(max-width: 900px)", () => {
          const heroTimeline = createHeroTimeline(gsap, ScrollTrigger, { distance: 1500, scrub: 0.65, mobile: true });

          gsap.utils.toArray(".mobile-project-visual").forEach((visual) => {
            gsap.fromTo(
              visual,
              { scale: 0.965, y: 22, rotateX: 3 },
              {
                scale: 1,
                y: 0,
                rotateX: 0,
                duration: 0.6,
                ease: EASE,
                scrollTrigger: { trigger: visual, start: "top 88%", once: true },
              },
            );
          });

          gsap.utils.toArray(".flow-node").forEach((node, index) => {
            gsap.fromTo(
              node,
              { autoAlpha: 0.2 },
              {
                autoAlpha: 1,
                duration: 0.42,
                delay: index * 0.04,
                ease: EASE,
                scrollTrigger: { trigger: node, start: "top 88%", once: true },
              },
            );
          });

          return () => {
            heroTimeline?.kill();
            setHeroScrollState(0, 0);
          };
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready?.then(refresh).catch(() => {});
        window.addEventListener("load", refresh, { once: true });

        dispose = () => {
          pointerCleanups.forEach((cleanup) => cleanup());
          window.removeEventListener("load", refresh);
          setHeroScrollState(0, 0);
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
