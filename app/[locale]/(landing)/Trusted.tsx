"use client";
import Image from "next/image";
import Container from "./components/Container";
import { partnersLogo } from "./utils";
import React from "react";
import { useScrambleText } from "@/app/hooks/useScrambleText";
import { useSplitText } from "@/app/hooks/useSplitText";
import { useTranslations } from "next-intl";

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
          <div className="marque-animation flex gap-16 w-full">
            {partnersLogo.map((src, i) => (
              <div
                key={i}
                style={{
                  height: 160,
                  minWidth: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={src}
                  alt="partner logo"
                  width={400}
                  height={160}
                  style={{
                    height: "160px",
                    width: "auto",
                    objectFit: "contain",
                    maxWidth: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Trusted;
