import Image from "next/image"
import LocaleSwitcher from "./components/localSwticher"
import { useParams } from "next/navigation"
import { useState } from "react";
import { useTranslations } from "next-intl";
import ContactModal from "./components/ContactModal";

export type Locale = "en" | "ar";
const Navbar = () => {
    const t = useTranslations();
    const navbar = t.raw("Navbar") as { label: string; id: string }[];

    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [openContactModal, setOpenContactModal] = useState<boolean>(false)
    // console.log('openContactModal', openContactModal)
    const params = useParams();
    const supportedLocales: Locale[] = ["en", "ar"];
    const locale: Locale = supportedLocales.includes(params.locale as Locale)
        ? (params.locale as Locale)
        : "en";
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const topPos = element.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ behavior: "smooth", top: topPos });
        }
    };
    return (
        <>
            <div className="w-full h-18 flex items-center justify-center backdrop-blur-lg fixed top-0 left-0 bg-white shadow-xs border-b border-white/20 z-99">
                <div className="max-w-7xl mx-auto w-full px-4 md:px-0">
                    <div className="flex items-center justify-between">
                        <Image
                            src="/URIMPACT_LOGO.png"
                            alt="logo-image"
                            width={200}
                            height={40}
                            className="object-contain cursor-pointer w-35 md:w-50 md:h-16 "
                            onClick={() => scrollToSection("hero-section")}
                        />
                        <div className="flex items-center justify-center gap-4 md:gap-8">
                            <div className="hidden lg:flex items-center justify-center">
                                <div className="flex items-center gap-4">
                                    {navbar.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => item.label === "Contact Us" || item.label === "تواصل معنا" ? setOpenContactModal(true) : scrollToSection(item.id)}
                                            className="text-md tracking-tight hover:text-background cursor-pointer"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <LocaleSwitcher currentLocale={locale} />
                            <button className="block lg:hidden cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
                                <Image
                                    src="/images/menu.png" alt="menu-icon" width={24} height={24}
                                />
                            </button>
                        </div>
                    </div>
                    <div style={{
                        clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
                        background: "linear-gradient(90deg, rgba(21, 194, 179, 0) 0%, rgba(36, 194, 181, 1) 50%, rgba(36, 194, 181, 1) 100%)"
                    }} className={`absolute  ${params.locale === 'ar' ? "left-0 scale-x-[-1]" : "right-0"} top-0 -z-40 h-full md:w-210 w-50`}></div>
                </div>
                {openMenu && (
                    <div className="absolute top-20 bg-primary w-full rounded-xl">
                        <div className="flex flex-col items-start gap-4 p-4">
                            {navbar.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.label === "Contact Us" || item.label === "تواصل معنا") {
                                            setOpenContactModal(true);
                                        } else {
                                            scrollToSection(item.id);
                                            setOpenMenu(false);
                                        }
                                    }}
                                    className="text-white text-md hover:text-secondary cursor-pointer"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ContactModal open={openContactModal} onClose={() => setOpenContactModal(false)} />
        </>

    )
}

export default Navbar