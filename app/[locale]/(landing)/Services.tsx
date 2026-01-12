"use client";
import Image from "next/image";
import Container from "./components/Container";
import FlexBetween from "./components/FlexBetween";
import { services } from "./utils";
import { useRef } from "react";
import { useSplitText } from "@/app/hooks/useSplitText";
import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("ServicesSection"); // 🔥 load Services translations
  const container = useRef<HTMLDivElement>(null);

  useSplitText({
    selector: ".split",
    scope: container,
    x: -50,
    type: "lines",
  });

  return (
    <Container>
      <div
        id="services"
        ref={container}
        className="flex flex-col gap-16 items-start "
      >
        <FlexBetween className="gap-4">
          <div className="bg-(--color-primary) rounded-[0.5px] w-1.5" />
          <div className="flex flex-col gap-4">
            <p className="split font-bold text-[clamp(24px,4vw,40px)] leading-11">
              {t("title")}
            </p>
            <p className="split font-normal text-[16px] leading-6 text-[#5B6671]">
              {t("subtitle")}
            </p>
          </div>
        </FlexBetween>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative p-8 border border-[#E2E7E980] rounded-xs flex flex-col gap-4"
            >
              <div
                className="rounded-xs h-1 w-full absolute top-0 left-0"
                style={{ backgroundColor: service.bg }}
              />

              <Image
                src={service.icon}
                alt="service icon"
                width={48}
                height={48}
              />

              <h3 className="split font-bold text-[clamp(16px,4vw,24px)] leading-7">
                {t(`services.${i}.title`)}
              </h3>

              <p className="split font-normal text-[16px] text-[#5B6671] leading-6">
                {t(`services.${i}.description`)}
              </p>

              {/* Features List */}
              <ul className="flex flex-col gap-2 list-none">
                {service.features.map((_, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <Image
                      src="/icons/tick-outline-icon.svg"
                      alt="tick"
                      width={16}
                      height={16}
                    />
                    <li className="split text-[16px] text-[#5B6671] leading-6">
                      {t(`services.${i}.features.${index}`)}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Services;
