import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import GlobalFixedImage from "./(landing)/components/GlobalFixedImage";
import localFont from "next/font/local";
import Head from "next/head";

const ffShamel = localFont({
  src: "../../public/fonts/FFShamelOneBook.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-ffShamel",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type MetaDataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages();

  return {
    title: messages.TabTitle?.title ?? "URIMPACT",
    description: messages.TabTitle?.description ?? "Urimpact landing page",
    icons: {
      icon: "/favicon.png",
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={locale === "ar" ? ffShamel.variable : inter.variable}>
        <GlobalFixedImage />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
