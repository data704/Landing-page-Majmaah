"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useGSAP, gsap, SplitText } from "@/app/lib/gsap";

const socialIcons = [
  {
    id: 1,
    icon: "/icons/linkedin.svg",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/urimpact/",
  },
  {
    id: 2,
    icon: "/icons/phone.svg",
    label: "whatsapp",
    href: "https://api.whatsapp.com/send?phone=966545636919",
  },
  {
    id: 3,
    icon: "/icons/email.svg",
    label: "Email",
    href: getIsDesktop()
      ? "https://mail.google.com/mail/?view=cm&fs=1&to=info@urimpact.sa"
      : "mailto:info@urimpact.sa",
  },
];
import { useTranslations } from "next-intl";
import Modal from "./components/Modal";
import { getIsDesktop } from "./utils";

type StateModalProps = "privacy" | "terms" | "cookie" | "security";

const Footer = () => {
  const container = React.useRef<HTMLElement>(null);
  const [openModal, setOpenModal] = useState<StateModalProps | null>(null);

  const t = useTranslations("Footer");
  const footerListContent = useTranslations("FooterModalData");
  const ModalData = {
    privacy: {
      title: footerListContent("privacy.title"),
      list: footerListContent.raw("privacy.list"),
    },
    terms: {
      title: footerListContent("terms.title"),
      list: footerListContent.raw("terms.list"),
    },
    cookie: {
      title: footerListContent("terms.title"),
      list: footerListContent.raw("terms.list"),
    },
    security: {
      title: footerListContent("security.title"),
      list: footerListContent.raw("security.list"),
    },
  };
  useGSAP(
    () => {
      const split = SplitText.create(".split", { type: "lines" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          // onEnter: () => tl.restart()
        },
      });
      tl.from(split.lines, {
        y: 40,
        duration: 1,
        stagger: 0.08,
        autoAlpha: 0,
        ease: "power2.out",
      });
    },
    { scope: container }
  );
  return (
    <>
      <footer ref={container} className="bg-[#2B3D4F] text-white">
        <div className="max-w-360 w-full mx-auto px-6 py-4 md:py-10 md:px-30">
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center">
            <div className="col-span-1 md:col-span-2 flex flex-col gap-6 items-start">
              <Image
                src="/images/URIMPACT_LOGO-WHITE.svg"
                alt={t("logo_alt")}
                width={200}
                height={50}
                style={{
                  objectFit: "contain",
                }}
              />
              <p className="split text-sm leading-5 text-white/70">
                {t("description")}
              </p>
              <div className="flex flex-col gap-2 text-sm w-full">
                <span className="split font-medium text-sm leading-5">
                  {t("newsletter_title")}
                </span>
                <div className="flex flex-col md:flex-row items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder={t("email_placeholder")}
                    className="bg-white/5 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-full"
                  />
                  <button
                    className="bg-primary px-4 py-2 rounded-lg cursor-pointer w-full md:w-auto flex items-center justify-center"
                    aria-label={t("subscribe_button_aria")}
                    type="submit"
                  >
                    <Image
                      src="/icons/share-outline.svg"
                      alt={t("send_icon_alt")}
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* COMPANY */}
            <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end gap-20">
              {/* LEGAL */}
              <div className="split flex flex-col gap-4">
                <span className="font-semibold text-sm leading-5">
                  {t("legal_title")}
                </span>
                <a
                  href=""
                  className="text-sm leading-5 text-white/70 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal("privacy");
                  }}
                >
                  {t("privacy_policy")}
                </a>
                <a
                  href=""
                  className="text-sm leading-5 text-white/70 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal("terms");
                  }}
                >
                  {t("terms_of_service")}
                </a>
                <a
                  href=""
                  className="text-sm leading-5 text-white/70 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal("cookie");
                  }}
                >
                  {t("cookie_policy")}
                </a>
                <a
                  href=""
                  className="text-sm leading-5 text-white/70 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal("security");
                  }}
                >
                  {t("security")}
                </a>
              </div>
            </div>
          </div>

          <hr className="border-t border-white/20 my-8" />
          <div className="flex items-center justify-between">
            <p className="split text-center text-[10px] md:text-sm leading-5 text-white/50">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-2">
              {socialIcons.map((social) => {
                const isMail = social.href.startsWith("mailto:");
                return (
                  <a
                    href={social.href}
                    key={social.id}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={18}
                      height={18}
                      className="cursor-pointer"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
      {openModal && (
        <Modal
          open={!!openModal}
          onClose={() => setOpenModal(null)}
          title={ModalData[openModal].title}
          listData={ModalData[openModal].list}
        />
      )}
    </>
  );
};

export default Footer;
