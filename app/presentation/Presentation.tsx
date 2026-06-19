"use client";

import { Deck, Fragment, Slide, useReveal } from "@revealjs/react";
import RevealHighlight from "reveal.js/plugin/highlight";
import "reveal.js/plugin/highlight/monokai.css";
import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";

function NextSlideButton() {
  const deck = useReveal();

  return (
    <button
      type="button"
      className="border border-white text-white p-2 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer font-bold text-2xl"
      onClick={() => deck?.next()}
    >
      Click me
    </button>
  );
}

export default function Presentation() {
  return (
    <Deck
      className="h-full w-full"
      config={{
        width: 1280,
        height: 720,
        hash: true,
        transition: "slide",
      }}
      plugins={[RevealHighlight]}
    >
      <Slide>
        <NextSlideButton />
      </Slide>
      <Slide>
        <div className="flex flex-col items-start justify-center"> 
        <h2>The Problem</h2>
        <p>New people Joining the stock market every year without any knowledge</p>
        <Fragment>  
    <div > 
    But how can they learn it? Where to start? What is being taught?
    </div>


        </Fragment>
        </div>
      </Slide>
      <Slide>
        <h2>The Solution</h2>
        <p>Next.js + reveal.js.</p>
      </Slide>
    </Deck>
  );
}
