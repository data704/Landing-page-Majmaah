"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ContactFormModal from "@/components/ContactFormModal";
import Button from "@/components/Button";
import { navbarItems } from "./config";
import Link from "next/link";

const Header = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openContactModal, setOpenContactModal] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topPos = element.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ behavior: "smooth", top: topPos });
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenu(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="w-full h-18 flex items-center justify-center backdrop-blur-lg fixed top-0 left-0 bg-white shadow-xs border-b border-white/20 z-99">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-4">
          <div className="flex items-center justify-between">
            <Image
              src="/URIMPACT_LOGO.png"
              alt="logo-image"
              width={200}
              height={40}
              className={`object-contain cursor-pointer w-35 md:w-50 md:h-16`}
              onClick={() => scrollToSection("hero-section")}
            />
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className="hidden lg:flex items-center justify-center">
                <div className="flex items-center gap-4">
                  {navbarItems.map((item) => (
                    <div key={item.id} className="relative group">
                      {item.children ? (
                        <button
                          type="button"
                          onClick={() => {
                            // mobile toggle logic if needed
                          }}
                          className="text-md tracking-tight flex items-center gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                        >
                          <p>{t(item.label)}</p>
                          <Image
                            src="/icons/arrowhead.svg"
                            alt="arrow-icon"
                            width={20}
                            height={20}
                            className="rotate-180"
                          />
                        </button>
                      ) : item.modalOpen ? (
                        <button
                          type="button"
                          onClick={() => setOpenContactModal(true)}
                          className="text-md tracking-tight flex items-center gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                        >
                          {t(item.label)}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          locale={locale}
                          className="text-md tracking-tight flex items-center gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                        >
                          {t(item.label)}
                        </Link>
                      )}
                      {item.children && (
                        <div className="absolute left-0 mt-1 hidden group-hover:flex group-hover:flex-col bg-white shadow-lg rounded-md p-2 min-w-65 z-50">
                          {item.children.map((child, index) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              locale={locale}
                              className="py-2 px-3 hover:bg-primary/10 rounded"
                            >
                              {index + 1}. {t(child.label)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    className="md:px-2 py-1.5"
                    variant="contained"
                    text={t("btn-platform-demo-label")}
                  />
                </div>
              </div>
              <button
                className="block lg:hidden cursor-pointer"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Image
                  src="/images/menu.png"
                  alt="menu-icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu  */}
        {openMenu && (
          <div className="absolute top-0 bg-white shadow-xl/20 w-full rounded-xl">
            <div className="flex flex-col items-start gap-4 p-4">
              {navbarItems.map((item) => (
                <div key={item.id} className="w-full">
                  {item.children ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.id ? null : item.id,
                        )
                      }
                      className="text-md w-full tracking-tight flex items-center justify-between gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                    >
                      <p>{t(item.label)}</p>
                      <Image
                        src="/icons/arrowhead.svg"
                        alt="arrow-icon"
                        width={20}
                        height={20}
                        className="rotate-180"
                      />
                    </button>
                  ) : item.modalOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenContactModal(true);
                        // setOpenMenu(false);
                      }}
                      className="text-md w-full tracking-tight flex items-center gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                    >
                      {t(item.label)}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      locale={locale}
                      className="text-md tracking-tight flex items-center gap-1 hover:bg-primary/20 py-2 px-3 rounded-lg"
                    >
                      {t(item.label)}
                    </Link>
                  )}
                  {item.children &&
                    item.children.length > 0 &&
                    activeDropdown === item.id && (
                      <div className="flex flex-col bg-gray-50 rounded-lg mt-1 p-2">
                        {item.children.map((child, index) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            locale={locale}
                            className="py-2 px-3 hover:bg-primary/10 rounded"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {index + 1}. {t(child.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
              <Button
                className="md:px-2 py-1.5 w-full"
                variant="contained"
                text={t("btn-platform-demo-label")}
              />
            </div>
          </div>
        )}
      </div>
      <ContactFormModal
        open={openContactModal}
        onClose={() => setOpenContactModal(false)}
      />
    </>
  );
};

export default Header;
