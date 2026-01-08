"use client";
import Image from "next/image";
import Container from "./components/Container";
import FlexBetween from "./components/FlexBetween";
import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useSplitText } from "@/app/hooks/useSplitText";
import { useTranslations } from "next-intl";

const SeeForest = () => {
    const container = useRef<HTMLDivElement>(null);
    const t = useTranslations("SeeForestSection");

    useSplitText({
        selector: ".split",
        scope: container,
        x: -50,
        type: "lines"
    });

    useGSAP(() => {
        if (!container.current) return;
        const rightEl = container.current.querySelector(".image-container");
        if (!rightEl) return;

        gsap.fromTo(rightEl, { scale: 1.2, autoAlpha: 0 }, {
            scale: 1,
            autoAlpha: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }, { scope: container });
    return (
        <Container>
            <div id="see-forest" ref={container} className="flex flex-col gap-16 items-start">
                <FlexBetween className="gap-4">
                    <div className="bg-(--color-primary) rounded-[0.5px] w-1.5" />
                    <div className="flex flex-col gap-4">
                        <p className="split font-bold text-[clamp(24px,4vw,40px)] overflow-hidden tracking-[-0.9px] leading-11">
                            {t("title")}
                        </p>
                        <p className="split font-normal text-[16px] leading-6 text-[#5B6671] overflow-hidden">
                            {t("subtitle")}
                        </p>
                    </div>
                </FlexBetween>
                <div className="image-container will-change-transform will-change-opacity mx-auto">
                    <Image
                        src="/images/dashboard.png"
                        alt={t("image_alt")}
                        width={1024}
                        height={650}
                        priority
                    />
                </div>
            </div>
        </Container>
    );
}

export default SeeForest;