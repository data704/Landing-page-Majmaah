"use client";

import { useTranslations } from "next-intl";
// import ProblemAndSoution from "./ProblemAndSoution";
// import Hero from "./Hero";
// import Services from "./Services";
// import ServicesDetails from "./ServicesDetails";
// import Trusted from "./Trusted";
// import SeeForest from "./SeeForest";
// import CTA from "./CTA";

export default function LandingContent() {
  const t = useTranslations("landing");

  return (
    <div className="overflow-hidden">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, suscipit?
      Impedit ex, laboriosam, aspernatur asperiores ipsa necessitatibus facilis
      quo aut temporibus minima aliquam corporis error quae deserunt nihil,
      dolorem praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quidem, suscipit? Impedit ex, laboriosam, aspernatur asperiores ipsa
      necessitatibus facilis quo aut temporibus minima aliquam corporis error
      quae deserunt nihil, dolorem praesentium. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Quidem, suscipit? Impedit ex, laboriosam,
      aspernatur asperiores ipsa necessitatibus facilis quo aut temporibus
      minima aliquam corporis error quae deserunt nihil, dolorem praesentium.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, suscipit?
      Impedit ex, laboriosam, aspernatur asperiores ipsa necessitatibus facilis
      quo aut temporibus minima aliquam corporis error quae deserunt nihil,
      dolorem praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quidem, suscipit? Impedit ex, laboriosam, aspernatur asperiores ipsa
      necessitatibus facilis quo aut temporibus minima aliquam corporis error
      quae deserunt nihil, dolorem praesentium.
      <h1>{t("title")}</h1>
      {/* <Hero /> */}
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
