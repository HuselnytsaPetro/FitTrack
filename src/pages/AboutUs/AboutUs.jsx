import { HowItWorks } from "./components/HowItWorks/HowItWorks";
import { HeroSection } from "./components/MainHero/HeroSection";
import { WhyChoose } from "./components/WhyChooseBlock/WhyChoose";
import { Testimonials } from "./components/Testimonials/Testimonials";

export default function AboutUsPage() {
    return (
        <>
            <HeroSection />
            <WhyChoose />
            <HowItWorks />
            <Testimonials />
        </>
    )
}