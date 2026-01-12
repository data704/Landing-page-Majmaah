"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, SplitText, useGSAP } from "@/app/lib/gsap";

import Chip from "./components/Chip";
import Container from "./components/Container";

import CSRIndexContent from "./CSRIndexContent";
import ESGIndexContent from "./ESGIndexContent";
import CarbonIndexContent from "./CarbonIndexContent";
import AgricultureIndexContent from "./AgricultureIndexContent";
import FlexBetween from "./components/FlexBetween";

const rightContent = [
  <CSRIndexContent key="csr" />,
  <ESGIndexContent key="esg" />,
  <CarbonIndexContent key="carbon" />,
  <AgricultureIndexContent key="agri" />,
];

const ServicesDetails = () => {
  const container = useRef<HTMLDivElement>(null);
  const t = useTranslations("ServicesDetailsSection");

  const services = t.raw("services") as {
    tag: string;
    title: string;
    desc: string;
    sub_desc: string;
    features: string[];
    bg: string;
  }[];

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".service-item").forEach((section, i) => {
        const isEven = i % 2 === 0;
        const texts = section.querySelectorAll(".split");
        const right = section.querySelector(".right-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
          },
        });

        texts.forEach((el) => {
          const split = SplitText.create(el, { type: "lines" });
          tl.from(
            split.lines,
            {
              x: isEven ? -50 : 50,
              autoAlpha: 0,
              stagger: 0.08,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            "<"
          );
        });

        right &&
          tl.from(
            right,
            {
              x: isEven ? 50 : -50,
              autoAlpha: 0,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="overflow-x-hidden">
      {services.map((service, i) => {
        const isEven = i % 2 === 0;

        return (
          <Container key={i}>
            <div
              className={`service-item flex gap-12 items-center 
              ${
                isEven ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
              } overflow-hidden w-full`}
            >
              {/* LEFT */}
              <div className="w-full md:w-6/12 max-w-full overflow-hidden">
                <FlexBetween className="gap-4 mb-8">
                  <div className="bg-(--color-primary) rounded-[0.5px] w-1.5" />
                  <div className="flex flex-col gap-4">
                    <p className="split font-bold text-[clamp(24px,2vw,40px)] leading-8">
                      {service.tag}
                    </p>
                    <p className="split font-normal text-[16px] leading-6 text-[#5B6671]">
                      {service.tag}
                    </p>
                  </div>
                </FlexBetween>

                <p className="split text-lg mb-4">{service.desc}</p>
                <p className="split text-sm text-gray-500 mb-8">
                  {service.sub_desc}
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex gap-3">
                      <Image
                        src="/icons/tick-outline-icon.svg"
                        alt="tick"
                        width={12}
                        height={12}
                      />
                      <p className="split text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="right-content w-full md:w-6/12 max-w-full overflow-hidden">
                {rightContent[i]}
              </div>
            </div>
          </Container>
        );
      })}
    </section>
  );
};

export default ServicesDetails;
