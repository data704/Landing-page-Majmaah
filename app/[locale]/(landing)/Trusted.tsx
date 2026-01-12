"use client";
import Image from "next/image";
import Container from "./components/Container";
import { partnersLogo } from "./utils";
import React from "react";
import { useScrambleText } from "@/app/hooks/useScrambleText";
import { useSplitText } from "@/app/hooks/useSplitText";
import { useTranslations } from "next-intl";
import Marquee from "./components/Marquee";

const Trusted = () => {
  const container = React.useRef<HTMLDivElement>(null);
  useScrambleText({
    selector: ".stat-value",
    scope: container,
    chars: "0123456+",
  });
  useSplitText({
    selector: ".split",
    scope: container,
    y: 20,
    type: "words",
  });
  const t = useTranslations("TrustedSection");
  // const messages = useMessages()
  // const keys = Object.keys(messages.TrustedSection.stats)
  // console.log('keys', keys)
  // const stats = t.raw("stats") as { label: string; value: string }[];
  // console.log('stats', stats)
  return (
    <Container>
      <div
        ref={container}
        className="flex flex-col gap-12 items-center justify-center mt-8 md:mt-0"
      >
        <p className="split font-semibold text-[clamp(16px,4vw,30px)] leading-0 text-[#2B3D4F]">
          {t("title")}
        </p>

        <div className="w-full overflow-hidden">
          <Marquee speedPxPerSecond={140} gapPx={64} duration={30}>
            {partnersLogo.map((src, i) => (
              <div
                key={i}
                className="flex h-30 min-w-40 max-w-40 max-h-40 items-center justify-center"
              >
                <Image
                  src={src}
                  alt="partner logo"
                  width={400}
                  height={120}
                  className="h-30 max-h-30 w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </Container>
  );
};

export default Trusted;
