// import SectionHeaders from "@/components/layout/SectionHeaders";
// import MenuItem from "@/components/menu/MenuItem";
// import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import customAxios from "../../utils/axios/customAxios";
import ProductCard from "../productCard/ProductCard";

export default function HomeMenu() {
  const [ourBest, setOurBest] = useState([]);
  const getOurBest = async () => {
    try {
      const { data } = await customAxios.get("/products/featured");
      setOurBest(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOurBest();
    scrollTo(0, 0);
  }, []);

  return (
    <section className="container my-12">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <img src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10 rotate-180">
          <img src={"/sallad1.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders title={"Our Bests"} />
      </div>
      <div className="my-12 relative container flex gap-6 lg:flex-row lg:justify-evenly flex-col">
        {ourBest.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}
