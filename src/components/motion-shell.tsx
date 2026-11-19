"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiPause, FiPlay } from "react-icons/fi";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (listener: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerMotion = () => false;

export function MotionShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const introduced = useRef(false);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    getServerMotion,
  );

  useGSAP(
    (_context, contextSafe) => {
      if (paused || reduced) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px) and (min-height: 900px)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, desktop, finePointer } = context.conditions!;
          const shell = root.current;
          if (!shell || !motion) return;
          const cleanups: (() => void)[] = [];

          const select = gsap.utils.selector(shell);
          gsap.to(select(".scroll-progress"), {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              id: "page-progress",
              start: 0,
              end: "max",
              scrub: true,
            },
          });

          if (select(".hero").length) {
            const firstEntrance =
              !introduced.current &&
              window.scrollY < 60 &&
              !window.location.hash;
            if (firstEntrance) {
              const loader = select(".theatre-loader")[0];
              gsap.set(loader, { display: "grid" });
              gsap
                .timeline({
                  onComplete: () => {
                    introduced.current = true;
                    gsap.set(loader, { display: "none" });
                  },
                })
                .fromTo(
                  select(".loader-word > span"),
                  { yPercent: 110 },
                  {
                    yPercent: 0,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power3.out",
                  },
                  0,
                )
                .fromTo(
                  select(".loader-meter > span"),
                  { scaleX: 0 },
                  { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
                  0,
                )
                .to(
                  select(".loader-copy"),
                  { opacity: 0, y: -20, duration: 0.3 },
                  0.85,
                )
                .to(
                  select(".curtain-top"),
                  { yPercent: -102, duration: 0.95, ease: "power3.inOut" },
                  1,
                )
                .to(
                  select(".curtain-bottom"),
                  { yPercent: 102, duration: 0.95, ease: "power3.inOut" },
                  1,
                );
              const intro = gsap.timeline({
                delay: 1.2,
                defaults: { ease: "power3.out" },
              });
              intro
                .from(
                  select(".hero-line > span"),
                  {
                    yPercent: 110,
                    rotate: 3,
                    duration: 1.1,
                    stagger: 0.13,
                    clearProps: "transform",
                  },
                  0.05,
                )
                .from(
                  select(
                    ".hero-eyebrow, .hero-subcopy, .hero-socials, .hero-bottom",
                  ),
                  {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    clearProps: "transform,opacity",
                  },
                  0.35,
                )
                .from(
                  select(".hero-visual"),
                  {
                    y: 55,
                    rotate: 4,
                    opacity: 0,
                    duration: 1.2,
                    clearProps: "transform,opacity",
                  },
                  0.2,
                );
            }
            const spin = gsap.to(select(".hero-spark"), {
              rotate: 360,
              duration: 26,
              repeat: -1,
              ease: "none",
            });
            ScrollTrigger.create({
              trigger: select(".hero")[0],
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => spin.paused(!self.isActive),
            });
            gsap.to(select(".hero-watermark"), {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: select(".hero")[0],
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            gsap.to(select(".portrait-inner"), {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: select(".hero")[0],
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          for (const element of select("[data-reveal]")) {
            gsap.from(element, {
              y: 36,
              opacity: 0,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: element, start: "top 93%", once: true },
            });
          }

          const marquee = select(".specialties-track")[0];
          if (marquee) {
            const loop = gsap.to(marquee, {
              xPercent: -50,
              duration: 32,
              repeat: -1,
              ease: "none",
            });

            ScrollTrigger.create({
              trigger: select(".specialties-strip")[0],
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => loop.paused(!self.isActive),
            });
          }
          const stage = select(".work-stage")[0] as HTMLElement | undefined;
          const track = select(".featured-grid")[0] as HTMLElement | undefined;
          if (desktop && finePointer && stage && track) {
            shell.dataset.horizontalWork = "true";
            cleanups.push(() => {
              delete shell.dataset.horizontalWork;
            });
            const distance = () =>
              Math.max(0, track.scrollWidth - stage.clientWidth);
            const animation = gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                id: "project-showcase",
                trigger: stage,
                start: "top 100px",
                end: () => `+=${distance() + 150}`,
                pin: true,
                scrub: 0.7,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
            const trigger = animation.scrollTrigger!;
            const focusCard = (event: FocusEvent) => {
              const target = event.target as HTMLElement;
              const card = target.closest<HTMLElement>(".featured-card");
              if (!card) return;
              const bounds = card.getBoundingClientRect();
              if (
                bounds.left >= stage.getBoundingClientRect().left &&
                bounds.right <= stage.getBoundingClientRect().right
              )
                return;
              const progress = Math.min(
                1,
                Math.max(0, card.offsetLeft / Math.max(1, distance())),
              );
              trigger.scroll(
                trigger.start + progress * (trigger.end - trigger.start),
              );
            };
            stage.addEventListener("focusin", focusCard);
            cleanups.push(() =>
              stage.removeEventListener("focusin", focusCard),
            );
          }

          if (finePointer) {
            let pointerFrame = 0;
            let activeCard: HTMLElement | null = null;
            const clearCard = () => {
              if (!activeCard) return;
              activeCard.style.removeProperty("--tilt-x");
              activeCard.style.removeProperty("--tilt-y");
              activeCard = null;
            };
            const spotlight = (event: PointerEvent) => {
              if (pointerFrame) cancelAnimationFrame(pointerFrame);
              pointerFrame = requestAnimationFrame(() => {
                const card = (event.target as HTMLElement).closest<HTMLElement>(
                  "[data-spotlight]",
                );
                if (activeCard !== card) clearCard();
                if (!card) return;
                activeCard = card;
                const bounds = card.getBoundingClientRect();
                const x = event.clientX - bounds.left;
                const y = event.clientY - bounds.top;
                card.style.setProperty("--spot-x", `${x}px`);
                card.style.setProperty("--spot-y", `${y}px`);
                if (card.hasAttribute("data-tilt")) {
                  card.style.setProperty(
                    "--tilt-x",
                    `${(0.5 - y / bounds.height) * 5}deg`,
                  );
                  card.style.setProperty(
                    "--tilt-y",
                    `${(x / bounds.width - 0.5) * 5}deg`,
                  );
                }
              });
            };
            shell.addEventListener("pointermove", spotlight, { passive: true });
            shell.addEventListener("pointerleave", clearCard);
            cleanups.push(() => {
              cancelAnimationFrame(pointerFrame);
              clearCard();
              shell.removeEventListener("pointermove", spotlight);
              shell.removeEventListener("pointerleave", clearCard);
            });
            for (const selectedButton of select("[data-magnetic]")) {
              const button = selectedButton as HTMLElement;
              const xTo = gsap.quickTo(button, "x", {
                duration: 0.4,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(button, "y", {
                duration: 0.4,
                ease: "power3.out",
              });
              const move = (event: PointerEvent) => {
                const rect = button.getBoundingClientRect();
                xTo((event.clientX - rect.left - rect.width / 2) * 0.12);
                yTo((event.clientY - rect.top - rect.height / 2) * 0.16);
              };
              const leave = () => {
                xTo(0);
                yTo(0);
              };
              button.addEventListener("pointermove", move);
              button.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", leave);
              });
            }
          }
          const ripples = new Set<HTMLElement>();
          const ripple = contextSafe!((x: number, y: number) => {
            if (ripples.size >= 8) return;
            const ring = document.createElement("span");
            ring.className = "click-ripple";
            ring.setAttribute("aria-hidden", "true");
            ring.style.left = `${x}px`;
            ring.style.top = `${y}px`;
            shell.append(ring);
            ripples.add(ring);
            gsap.fromTo(
              ring,
              { scale: 0.2, opacity: 0.9 },
              {
                scale: 2.6,
                opacity: 0,
                duration: 0.55,
                ease: "power2.out",
                onComplete: () => {
                  ring.remove();
                  ripples.delete(ring);
                },
              },
            );
          });
          const tap = (event: PointerEvent) => {
            if (
              event.button !== 0 ||
              !(event.target as HTMLElement).closest("a, button")
            )
              return;
            ripple(event.clientX, event.clientY);
          };
          const keyboardClick = (event: MouseEvent) => {
            const target = (event.target as HTMLElement).closest("a, button");
            if (event.detail !== 0 || !target) return;
            const box = target.getBoundingClientRect();
            ripple(box.left + box.width / 2, box.top + box.height / 2);
          };
          shell.addEventListener("pointerdown", tap, { passive: true });
          shell.addEventListener("click", keyboardClick);
          cleanups.push(() => {
            shell.removeEventListener("pointerdown", tap);
            shell.removeEventListener("click", keyboardClick);
            ripples.forEach((ring) => ring.remove());
          });
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );

      let active = true;
      const refresh = () => {
        if (active) ScrollTrigger.refresh();
      };
      void document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        active = false;
        window.removeEventListener("load", refresh);
        media.revert();
      };
    },
    {
      scope: root,
      dependencies: [pathname, paused, reduced],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={root}
      className="motion-shell"
      data-motion={paused || reduced ? "off" : "on"}
    >
      <div className="scroll-progress" aria-hidden="true" />
      <div className="theatre-loader" aria-hidden="true">
        <div className="loader-curtain curtain-top" />
        <div className="loader-curtain curtain-bottom" />
        <div className="loader-copy">
          <span className="loader-kicker">SETTING THE SCENE</span>
          <span className="loader-word">
            <span>
              KOUSIK<span className="loader-dot">.</span>
            </span>
          </span>
          <div className="loader-meter">
            <span />
          </div>
          <span className="loader-caption">CODE. CREATE. REPEAT.</span>
        </div>
      </div>
      {children}
      {reduced ? (
        <span className="motion-preference">Reduced motion</span>
      ) : (
        <button
          type="button"
          className="motion-toggle"
          onClick={() => {
            introduced.current = true;
            setPaused(!paused);
          }}
          aria-label={paused ? "Resume animations" : "Pause animations"}
          aria-pressed={paused}
        >
          {paused ? (
            <FiPlay aria-hidden="true" />
          ) : (
            <FiPause aria-hidden="true" />
          )}
          <span>Motion {paused ? "off" : "on"}</span>
        </button>
      )}
    </div>
  );
}
