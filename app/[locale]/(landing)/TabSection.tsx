"use client";

import Image from "next/image";
import Container from "./components/Container";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useSplitText } from "@/app/hooks/useSplitText";

const tabs = [
  {
    id: 1,
    icon: "/icons/onboarding.svg",
    label: "Onboarding-icon",
    image: "/images/onboarding.png",
  },
  {
    id: 2,
    icon: "/icons/dashboard.svg",
    label: "Dashboard-icon",
    sub_tab: ["Dashboard 1", "Dashboard 2"],
    image: ["/images/dashboard-1.png", "/images/dashboard-2.png"],
  },
  {
    id: 3,
    icon: "/icons/scope.svg",
    label: "Scope 1&2-icon",
    image: "/images/scope1,2,3.png",
  },
  {
    id: 4,
    icon: "/icons/ai.svg",
    label: "Urimpact AI-icon",
    image: "/images/urimpact-ai.png",
  },
  {
    id: 5,
    icon: "/icons/suppliers.svg",
    label: "Suppliers-icon",
    image: "/images/suppliers.png",
  },
  {
    id: 6,
    icon: "/icons/certificate.svg",
    label: "Certificate-icon",
    image: "/images/certificate.png",
  },
];

const TabSection = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [activeSubTab, _setActiveSubTab] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerSection = useRef<HTMLDivElement>(null);

  useSplitText({
    selector: ".split",
    scope: containerSection,
    y: 20,
    type: "words",
  });
  const t = useTranslations("TabSection");
  const activeTabObj = tabs.find((tab) => tab.id === activeTab);
  let activeImage = "";
  if (activeTabObj?.sub_tab && activeTabObj.image instanceof Array) {
    activeImage = activeTabObj.image[activeSubTab];
  } else if (typeof activeTabObj?.image === "string") {
    activeImage = activeTabObj.image;
  }

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.set(contentRef.current, { opacity: 0, y: 20, scale: 0.95 });

    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [activeTab]);

  return (
    <section
      ref={containerSection}
      className="flex flex-col items-center justify-center w-full"
    >
      <Container className="flex flex-col items-center justify-center gap-4">
        <p className="split font-bold text-[clamp(24px,4vw,40px)] leading-11 mb-4">
          {t("title")}
        </p>
        <div className="flex flex-wrap items-center justify-between w-full border-b gap-1 border-[#E8D5B7] py-4">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`split flex items-center gap-1 px-1 py-2 rounded-md transition-colors duration-300 w-30 md:w-auto  cursor-pointer   ${
                activeTab === tab.id ? "text-primary" : ""
              }`}
            >
              <Image
                src={tab.icon}
                alt={tab.label}
                width={24}
                height={24}
                className="w-4 h-4 md:w-6 md:h-6"
              />
              <p className="text-[12px] md:text-lg text-start font-semibold  flex-1">
                {t(`tabs.${i}`)}
              </p>
            </button>
          ))}
        </div>
        {/* {activeTab === 2 && activeTabObj?.sub_tab && (
          <div className="flex items-center gap-2 w-full">
            {activeTabObj.sub_tab.map((sub, index) => (
              <button
                key={sub}
                onClick={() => setActiveSubTab(index)}
                className={`px-2 py-1 rounded-full transition-all duration-300 ${
                  activeSubTab === index ? "bg-white shadow-lg" : ""
                }`}
              >
                {t(`subTabs.${index}`)}
              </button>
            ))}
          </div>
        )} */}
        <div
          ref={contentRef}
          className="w-full h-60 md:h-150 overflow-auto overflow-x-hidden py-2 flex justify-center items-start border border-gray-200 rounded-md"
        >
          {activeImage && (
            <Image
              src={activeImage}
              blurDataURL="/images/placeholder-image.jpg"
              alt="Tab Image"
              width={800}
              height={400}
              className="object-contain w-full"
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default TabSection;
