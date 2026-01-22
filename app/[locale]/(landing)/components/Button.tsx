"use client";

import Image from "next/image";
import { ButtonHTMLAttributes, useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useParams } from "next/navigation";
type ButtonProps = {
  variant?: "contained" | "outlined";
  onClick?: () => void;
  text: string;
  icon?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "contained",
  onClick,
  text,
  icon,
  className,
  ...props
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const params = useParams();
  const { locale } = params;

  useGSAP(
    () => {
      if (!btnRef.current) return;
      if (!imageRef.current) return;

      const btn = btnRef.current;

      const tl = gsap.timeline({ paused: true });

      tl.to(
        imageRef.current,
        {
          x: 100,
          duration: 0.4,
          ease: "power2.out",
        },
        0,
      );
      const handleEnter = () => tl.play();
      const handleLeave = () => tl.reverse();

      btn.addEventListener("mouseenter", handleEnter);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        btn.removeEventListener("mouseenter", handleEnter);
        btn.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: btnRef },
  );

  return (
    <button
      ref={btnRef}
      className={`
        ${
          variant === "contained"
            ? "bg-(--color-primary) text-white hover:bg-[#077168]"
            : "text-(--color-primary) border-2 border-(--color-primary) hover:bg-(--color-primary) hover:text-[#FFFFFF]"
        } 
         px-4 md:px-8 py-2.5 text-[clamp(14px,4vw,18px)] leading-7 flex items-center justify-center gap-1 font-semibold cursor-pointer transition-all duration-500 ease-in-out overflow-hidden rounded-xl
      ${className}`}
      onClick={onClick}
      style={
        variant === "contained"
          ? {
              boxShadow:
                "0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)",
            }
          : undefined
      }
      {...props}
    >
      <span>{text}</span>
      {variant === "contained" && icon && (
        <Image
          ref={imageRef}
          src={icon}
          alt="Icon"
          width={24}
          height={24}
          className={`${locale === "ar" ? "rotate-180" : "rotate-0"}`}
        />
      )}
    </button>
  );
};

export default Button;
