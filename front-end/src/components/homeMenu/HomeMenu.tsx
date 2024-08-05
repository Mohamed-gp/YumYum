// import SectionHeaders from "@/components/layout/SectionHeaders";
// import MenuItem from "@/components/menu/MenuItem";
// import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import customAxios from "../../utils/axios/customAxios";

export default function HomeMenu() {
  const [ourBest, setOurBest] = useState([]);
  const getOurBest = async () => {
    try {
      const { data } = await customAxios.get("/products/featured");
      console.log(data);
      setOurBest(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOurBest();
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
          <>
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="lg:w-[30%] bg-white p-6 pt-0 text-center rounded-xl flex flex-col  justify-center items-center"
            >
              <img src={product?.image} className="w-[200px]" alt="" />
              <p className="font-bold text-lg sm:text-xl line-clamp-3">
                {product?.name}
              </p>
              <p className="opacity-50 line-clamp-3 ">{product?.description}</p>
              <button
  
                className="text-white bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl"
              >
                {(product.sizes.length > 1 || product.extras.length > 0) &&
                  `start from ${product?.basePrice}`}
              </button>
            </div>
            <div className="absolute"></div>
          </>
        ))}
        {/* <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="lg:w-[30%] flex flex-col text-center bg-white p-6 pt-0 rounded-xl justify-center items-center"
        >
          <img src="/Pizza-removebg-preview.png" alt="" className="w-[200px]" />
          <p className="font-bold text-xl">Margherita Pizza</p>
          <p className="opacity-50 line-clamp-3">
            Indulge in the simplicity and freshness of a traditional Margherita
            pizza. Featuring a thin, crispy crust topped with vibrant tomato
            sauce,
          </p>
          <p className="text-white bg-mainColor w-full mt-2 py-2 rounded-xl">
            Add To Cart
          </p>
        </div>
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="lg:w-[30%] flex flex-col text-center bg-white p-6 pt-0 rounded-xl justify-center items-center"
        >
          <img
            src="/roastedChicken-removebg-preview.png"
            alt=""
            className="w-[200px]"
          />
          <p className="font-bold text-xl">Roasted Chicken</p>
          <p className="opacity-50 my-1 line-clamp-3">
            Savor the deliciousness of perfectly roasted chicken, featuring a
            crispy golden skin and juicy, tender meat.
          </p>
          <p className="text-white bg-mainColor w-full mt-2 py-2 rounded-xl">
            Add To Cart
          </p>
        </div> */}
      </div>
    </section>
  );
}
