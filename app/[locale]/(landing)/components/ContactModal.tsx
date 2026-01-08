import { useTranslations } from "next-intl";
import MultiSelect from "./MutliSelectDropdown";
import Button from "./Button";
import Image from "next/image";
import { useParams } from "next/navigation";

const ContactModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    const params = useParams();
    const t = useTranslations("ContactModal");

    if (!open) return null;

    const industryOptions = t.raw("industry_options") as { label: string, value: string }[];
    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-200 overflow-hidden"
            onClick={onClose}
        >
            <div
                className="bg-white relative rounded-3xl p-6 w-[90%] md:max-w-3xl shadow-xl animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
                <div className={`absolute top-6 ${params.locale === "ar" ? "left-5" : "right-5"} `}>
                    <Image src={"/icons/cross-icon.svg"} alt="cross-icon" width={24} height={24} onClick={onClose} className="cursor-pointer" />
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
                    <input
                        type="text"
                        placeholder={t("name_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                    />
                    <input
                        type="email"
                        placeholder={t("email_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                    />
                    <input
                        type="text"
                        placeholder={t("company_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                    />
                    <MultiSelect
                        placeholder={t("industry_placeholder")}
                        options={industryOptions}
                    />
                    <input
                        type="text"
                        placeholder={t("job_role_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                    />
                    <input
                        type="text"
                        placeholder={t("country_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full"
                    />
                    <textarea
                        placeholder={t("message_placeholder")}
                        className="bg-primary/10 border border-black/20 rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full col-span-2 h-24"
                    />
                    <Button text={t("submit_button")} variant="contained" className="col-span-2" />
                </form>
            </div>
        </div>
    );
}

export default ContactModal;
