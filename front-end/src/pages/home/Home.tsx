import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import NewArrivals from "../../components/arrivals/NewArrivals";
import CategoryProductLine from "../../components/categoryProductLine/CategoryProductLine";
import StoreProducts from "../../components/store/StoreProducts";
import customAxios from "../../utils/axios/customAxios";
import HomeMenu from "../../components/homeMenu/HomeMenu";
import AboutUs from "../../components/aboutus/AboutUs";
import ContactUs from "../../components/contactUs/ContactUs";
import Features from "../../components/Features/Features";

export default function Home() {
  useEffect(() => {
    scrollTo(0, 0);
    getAllCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* disabled */}
      <Hero />
      <HomeMenu />
      <Features/>
      <AboutUs />
      <ContactUs/>
      

    </>
  );
}
