"use client";

import { Deck, Fragment, Slide, useReveal } from "@revealjs/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import RevealHighlight from "reveal.js/plugin/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import { AnimatedProblemSlide } from "./slids/ProblemSlide";

function NextSlideButton() {
  const deck = useReveal();

  return (
    <button
      type="button"
      className="border border-white text-white py-2 px-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer font-bold text-2xl"
      onClick={() => deck?.next()}
    >
      Get Started
      <ArrowRight className="inline-block ml-2" />
    </button>
  );
}

export default function Presentation() {
  return (
    <Deck
      className="h-full w-full flex flex-col items-start justify-start"
      config={{
        width: "100%",
        height: 720,
        hash: true,
        transition: "none",
        backgroundTransition: "none",
        autoAnimate: false,
        center: false,
      }}
      plugins={[RevealHighlight]}
    >
      <Slide className="slide-start">
        <NextSlideButton />
      </Slide>

      <Slide className="p-0 m-0">
        {/* 6. Render the new component here */}
        <AnimatedProblemSlide />
      </Slide>

      <Slide>
        <h2>The Solution</h2>
        <p>Next.js + reveal.js.</p>
      </Slide>
    </Deck>
  );
}
