import { gsap, useGSAP } from "@/app/lib/gsap";
import { RefObject } from "react";

type UseScrambleTextProps = {
    selector: string;
    scope?: RefObject<HTMLElement | null>;
    chars?: string;
    duration?: number;
    revealDelay?: number;
    speed?: number;
};

export function useScrambleText({
    selector,
    scope,
    chars = "0123456789%.3t",
    duration = 4,
    revealDelay = 0.5,
    speed = 0.4,
}: UseScrambleTextProps) {
    useGSAP(
        () => {
            const elements = scope?.current
                ? gsap.utils.toArray<HTMLElement>(
                    scope.current.querySelectorAll(selector)
                )
                : gsap.utils.toArray<HTMLElement>(selector);

            elements.forEach((el) => {
                const originalText = el.innerText;

                gsap.to(el, {
                    duration,
                    scrambleText: {
                        text: originalText,
                        chars,
                        revealDelay,
                        speed,
                    },
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        // toggleActions: "play none none none",
                    },
                });
            });
        },
        { scope }
    );
}
