import Image from "next/image";
import Button from "./Button";
import { useParams } from "next/navigation";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  listData: string[];
}

const Modal = ({ open, onClose, title, listData }: ModalProps) => {
  const params = useParams();
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-200 overflow-hidden"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative w-[90%] md:max-w-3xl rounded-xl p-6 shadow-xl max-h-[80vh] overflow-y-auto animate-fade-in"
      >
        <div
          className={`absolute top-6 ${params.locale === "ar" ? "left-5" : "right-5"} `}
        >
          <Image
            src={"/icons/cross-icon.svg"}
            alt="cross-icon"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>

        <ul className="space-y-3 text-gray-700 leading-relaxed list-disc">
          {listData.map((item, i) => (
            <li
              key={i}
              className={`relative pl-2 ${params.locale === "ar" ? "mr-4" : "ml-4"}  marker:text-primary marker:text-xl`}
            >
              {item}
            </li>
          ))}
        </ul>

        <Button onClick={onClose} text="Close" className="mt-6 w-full" />
      </div>
    </div>
  );
};

export default Modal;
