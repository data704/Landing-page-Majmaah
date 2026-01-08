import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { RefObject } from "react";

//  x: -50,
//       autoAlpha: 0,
//       stagger: 0.08,
//       duration: 2.5,
//       ease: "back.out(1.7)",

interface SplitTextProps {
    selector: string;
    type: "lines" | "words" | "chars";
    scope: RefObject<HTMLDivElement | null>;
    stagger?: number;
    duration?: number;
    x?: number;
    y?: number;
    ease?: string;
    start?: string
}

export const useSplitText = ({
    selector,
    type = "lines",
    scope,
    stagger = 0.08,
    duration = 2.5,
    x = 0,
    y = 0,
    ease = "back.out(1.7)",
    start = "top 75%",
}: SplitTextProps) => {
    useGSAP(() => {
        const split = SplitText.create(selector, { type: type })
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scope.current,
                start,
                // onEnter: () => tl.restart(),
            }
        })
        const target =
            type === "lines" ?
                split.lines :
                type === "words" ?
                    split.words :
                    split.chars

        tl.from(target, {
            x,
            y,
            autoAlpha: 0,
            stagger,
            duration,
            ease
        });

    }, { scope: scope })
}
