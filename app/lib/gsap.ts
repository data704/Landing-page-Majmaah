"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export { gsap, ScrollTrigger, SplitText, useGSAP, ScrambleTextPlugin };
