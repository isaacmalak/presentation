import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReveal } from "@revealjs/react";
import { useRef } from "react";

export function AnimatedProblemSlide() {
  const slideContentRef = useRef(null);
  const fragmentOneRef = useRef(null);
  const fragmentTwoRef = useRef(null);

  const deck = useReveal();

  useGSAP(() => {
    if (!deck) return;

    // --- Helper Functions to Lock/Unlock Navigation ---
    const lockNavigation = () => {
      deck.configure({ keyboard: false, controls: false });
    };

    const unlockNavigation = () => {
      deck.configure({ keyboard: true, controls: true });
    };

    // 1. Main slide animation
    const anim = gsap.fromTo(
      slideContentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        paused: true,
        onComplete: unlockNavigation, // Unlock when done
        onReverseComplete: unlockNavigation,
      }
    );

    // 2. First Fragment animation
    const fragmentAnim = gsap.fromTo(
      fragmentOneRef.current,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.7,
        ease: "steps(40)",
        paused: true,
        onComplete: unlockNavigation,
        onReverseComplete: unlockNavigation,
      }
    );

    // 3. Second Fragment animation
    const fragmentTwoAnim = gsap.fromTo(
      fragmentTwoRef.current,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.7,
        ease: "steps(40)",
        paused: true,
        onComplete: unlockNavigation,
        onReverseComplete: unlockNavigation,
      }
    );

    const handleSlideChange = (event: any) => {
      if (
        event.currentSlide &&
        slideContentRef.current &&
        event.currentSlide.contains(slideContentRef.current)
      ) {
        const prevIndex = event.previousSlide
          ? deck.getIndices(event.previousSlide).h
          : 0;
        const currentIndex = event.indexh;
        console.log(
          "Slide changed. Current index:",
          currentIndex,
          "Previous index:",
          prevIndex
        );
        // 2. Compare them to determine direction
        if (currentIndex < prevIndex) {
          anim.progress(1);
        } else {
          lockNavigation(); // Lock navigation right before starting
          anim.restart();
        }
      }
    };

    // 4. Fragment Handlers
    const handleFragmentShown = (event: { fragment: HTMLElement | null }) => {
      // Because we used className="fragment", event.fragment IS our exact div!
      // No more messy .contains() checks needed.
      if (event.fragment === fragmentOneRef.current) {
        lockNavigation();
        fragmentAnim.restart();
      } else if (event.fragment === fragmentTwoRef.current) {
        lockNavigation();
        fragmentTwoAnim.restart();
      }
    };

    const handleFragmentHidden = (event: { fragment: HTMLElement | null }) => {
      if (event.fragment === fragmentOneRef.current) {
        lockNavigation();
        fragmentAnim.reverse();
      } else if (event.fragment === fragmentTwoRef.current) {
        lockNavigation();
        fragmentTwoAnim.reverse();
      }
    };

    // Attach listeners
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
    <div className="flex flex-col items-start justify-start">
      <div ref={slideContentRef} className="flex flex-col items-start">
        <h2>The Problem</h2>

        <p className="text-start text-3xl">
          Millions want to invest in the
          <span className="font-bold text-green-700"> Stock Market</span>
          .
          <br />
          Few know what is the Stock Market is.
        </p>
      </div>

      <p ref={fragmentOneRef} className="fragment text-start mt-8 text-2xl">
        Confusing information.
        <br />
        No clear starting point.
      </p>

      <p ref={fragmentTwoRef} className="fragment text-start mt-8 text-2xl">
        We simplify investing education.
        <br />
        <span className="font-bold text-amber-500">
          Learn → Understand → Choose your investments{" "}
        </span>
        with confidence.
      </p>
    </div>
  );
}
