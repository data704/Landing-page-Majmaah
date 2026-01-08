"use client"

import Image from "next/image"
import Container from "./components/Container"
import FlexBetween from "./components/FlexBetween"
import { benefits, manualProcessFeatures } from "./utils"
import { useRef } from "react"
import { useSplitText } from "@/app/hooks/useSplitText"
import { useTranslations } from "next-intl"

const ProblemAndSoution = () => {
    const t = useTranslations("ProblemSolution")
    const container = useRef<HTMLDivElement>(null);

    useSplitText({
        selector: ".split",
        scope: container,
        x: -40,
        type: "lines",
    })

    return (
        <Container>
            <div id="problems-and-solutions" ref={container} className="flex flex-col gap-16 items-start">

                <FlexBetween className="gap-4">
                    <div className="bg-(--color-primary) rounded-[0.5px] w-1.5" />
                    <div className="flex flex-col gap-4">
                        <p className="split font-bold text-[clamp(24px,4vw,40px)] tracking-[-0.9px] leading-11">
                            {t("section_title")}
                        </p>
                        <p className="split font-normal text-[16px] leading-6 text-[#5B6671]">
                            {t("section_sub_title")}
                        </p>
                    </div>
                </FlexBetween>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="flex flex-col gap-4">
                        <h3 className="split font-bold text-[clamp(16px,4vw,30px)] leading-7 text-[#2B3D4F]">
                            {t("problem_title")}
                        </h3>
                        {/* <p className="split font-normal text-[16px] leading-6 text-[#657586]">
                            {t("problem_description")}
                        </p> */}

                        <ul className="flex flex-col gap-4 list-none">
                            {manualProcessFeatures.map((feature, i) => (
                                <div key={`feature-${i}`} className="flex gap-4 items-center">
                                    <Image src={feature.icon} alt={feature.title} width={40} height={40} />
                                    <div className="flex flex-col">
                                        <li className="split font-semibold text-[16px] leading-6 text-[#2B3D4F]">
                                            {t(`manualProcessFeatures.${i}.title`)}
                                        </li>
                                        <li className="split font-normal text-sm leading-5 text-[#657586]">
                                            {t(`manualProcessFeatures.${i}.description`)}
                                        </li>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="split font-bold text-[clamp(16px,4vw,30px)] leading-7 text-(--color-primary)">
                            {t("solution_title")}
                        </h3>
                        <p className="split font-normal text-[16px] leading-6 text-[#657586]">
                            {t("solution_description")}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {benefits.map((feature, i) => (
                                <div
                                    key={`feature-${i}`}
                                    className="flex flex-col gap-3 items-start bg-[#FFFFFF] p-4 rounded-lg"
                                    style={{ boxShadow: "0px 4px 16px 0px #2B3D4F14" }}
                                >
                                    <Image src={feature.icon} alt={feature.title} width={40} height={40} />
                                    <p className="split font-semibold text-[16px] leading-6 text-[#2B3D4F]">
                                        {t(`benefits.${i}.title`)}
                                    </p>
                                    <p className="split font-normal text-sm leading-5 text-[#657586]">
                                        {t(`benefits.${i}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProblemAndSoution
