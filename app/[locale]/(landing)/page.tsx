"use client"
import ProblemAndSoution from "./ProblemAndSoution"
import Hero from "./Hero"
import Services from "./Services"
import ServicesDetails from "./ServicesDetails"
import Trusted from "./Trusted"
import SeeForest from "./SeeForest"
import CTA from "./CTA"
import Footer from "./Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import gsap from "gsap"
import TabSection from "./TabSection"
import Navbar from "./Navbar"

gsap.registerPlugin(ScrollTrigger, SplitText);

const Landing = () => {
    return (
        <div className=" overflow-hidden">
            <Navbar />
            <Hero />
            <SeeForest />
            <Trusted />
            <TabSection />
            <Services />
            <ServicesDetails />
            <ProblemAndSoution />
            <CTA />
            <Footer />
        </div>
    )
}

export default Landing