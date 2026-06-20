import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReveal } from "@revealjs/react";
import { useRef } from "react";

export function AnimatedProblemSlide() {
  const slideContentRef = useRef(null);
  const fragmentOneRef = useRef(null);

  const deck = useReveal();

  useGSAP(() => {
    // 1. Wait until deck is fully initialized
    if (!deck) return;

    // 2. Main slide animation
    const anim = gsap.fromTo(
      slideContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", paused: true }
    );

    // 3. Fragment animation (Typewriter wipe effect)
    const fragmentAnim = gsap.fromTo(
      fragmentOneRef.current,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        ease: "steps(40)",
        paused: true,
      }
    );

    const handleSlideChange = (event: any) => {
      if (
        event.currentSlide &&
        slideContentRef.current &&
        event.currentSlide.contains(slideContentRef.current)
      ) {
        // 1. Find out which slide we just came from, and which one we are on now
        const prevIndex = event.previousSlide
          ? deck.getIndices(event.previousSlide).h
          : 0;

        const currentIndex = event.indexh;

        // 2. Compare them to determine direction
        if (currentIndex < prevIndex) {
          // We moved BACKWARDS. Skip the animation to its final visible state immediately.
          anim.progress(1);
        } else {
          // We moved FORWARDS. Replay the animation normally.
          anim.restart();
        }
      }
    };

    // 4. Fragment Handlers
    const handleFragmentShown = (event: { fragment: HTMLElement | null }) => {
      // Because we used className="fragment", event.fragment IS our exact div!
      // No more messy .contains() checks needed.
      if (event.fragment === fragmentOneRef.current) {
        fragmentAnim.restart();
      }
    };

    const handleFragmentHidden = (event: { fragment: HTMLElement | null }) => {
      if (event.fragment === fragmentOneRef.current) {
        fragmentAnim.reverse();
      }
    };

    // 5. Attach listeners
    deck.on("slidechanged", handleSlideChange);
    deck.on("ready", handleSlideChange);
    deck.on("fragmentshown", handleFragmentShown);
    deck.on("fragmenthidden", handleFragmentHidden);

    return () => {
      deck.off("slidechanged", handleSlideChange);
      deck.off("ready", handleSlideChange);
      deck.off("fragmentshown", handleFragmentShown);
      deck.off("fragmenthidden", handleFragmentHidden);
    };
  }, [deck]);

  return (
    <div className="flex flex-col items-start justify-start  ">
      <div ref={slideContentRef} className="flex flex-col items-start ">
        <h2>The Problem</h2>
        <p className="text-start">
          New people Joining the
          <span className="font-bold text-5xl text-green-700">
            {" "}
            {"stock market"}{" "}
          </span>
          every year without any knowledge
        </p>
      </div>

      {/* Fragment should be in the className as this solves the issue of the
      fragment not being recognized by reveal.js */}
      <p ref={fragmentOneRef} className="fragment text-start">
        But how can they learn it? Where to start? What is being taught?
      </p>
      <p className="fragment">
        That's where we come in. We will teach them the basics of the stock
        market and how to invest in it.
      </p>
    </div>
  );
}
