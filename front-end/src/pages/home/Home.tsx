import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import HomeMenu from "../../components/homeMenu/HomeMenu";
import AboutUs from "../../components/aboutus/AboutUs";
import ContactUs from "../../components/contactUs/ContactUs";
import Features from "../../components/Features/Features";

export default function Home() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* disabled */}
      <Hero />
      <HomeMenu />
      <Features />
      <AboutUs />
      <ContactUs />
    </>
  );
}
