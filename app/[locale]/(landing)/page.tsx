import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
// import LandingContent from "./LandingContent";
import Hero from "./Hero";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Landing({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Load page-specific messages
  const landingMessages = (await import(`@/messages/${locale}/landing.json`))
    .default;

  return (
    <NextIntlClientProvider locale={locale} messages={landingMessages}>
      <LandingContent />
    </NextIntlClientProvider>
  );
}

// import ProblemAndSoution from "./ProblemAndSoution";
// import Hero from "./Hero";
// import Services from "./Services";
// import ServicesDetails from "./ServicesDetails";
// import Trusted from "./Trusted";
// import SeeForest from "./SeeForest";
// import CTA from "./CTA";

function LandingContent() {
  return (
    <div>
      <Hero />
      {/* <SeeForest /> */}
      {/* <Trusted /> */}
      {/* <TabSection /> */}
      {/* <Services /> */}
      {/* <ServicesDetails /> */}
      {/* <ProblemAndSoution /> */}
      {/* <CTA /> */}
    </div>
  );
}
