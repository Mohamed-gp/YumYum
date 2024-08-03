import { useEffect, useState } from "react";
import ProductComp from "../../components/product/Product";
import customAxios from "../../utils/axios/customAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/dbInterfaces";

interface Query {
  search: string | null;
  category: string | null;
}

const Store = () => {
  const [products, setProducts] = useState([]);
  // const [savedProducts, setSavedProducts] = useState([]);
  // const location = useLocation();
  // const urlParams = new URLSearchParams(window.location.search);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(`/products/listed`);
      setProducts(data.data);
      console.log(data);
      // setSavedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    getProducts();
  }, []);
  // const [filter, setFilter] = useState({ order: "", category: "" });
  // useEffect(() => {
  //   let sortedProducts = [...savedProducts];
  //   if (filter.order == "highToLow") {
  //     sortedProducts.sort(
  //       (a: Product, b: Product) =>
  //         b.price * (1 - b.promoPercentage / 100) -
  //         a.price * (1 - a.promoPercentage / 100)
  //     );
  //   } else if (filter.order == "lowToHigh") {
  //     sortedProducts.sort(
  //       (a: Product, b: Product) =>
  //         a.price * (1 - a.promoPercentage / 100) -
  //         b.price * (1 - b.promoPercentage / 100)
  //     );
  //   }
  //   if (filter.category != "") {
  //     sortedProducts = sortedProducts.filter(
  //       (product: Product) => product.category.name == filter.category
  //     );
  //   }

  //   setProducts(sortedProducts);
  // }, [filter]);

  // const removeFiltersHandler = async () => {
  //   try {
  //     const { data } = await customAxios.get(`/products`);
  //     setProducts(data.data);
  //     setSavedProducts(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="container pt-6 mt-6">
      {products.length == 0 ? (
        <>
          <div className="flex justify-between items-center">
            <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
              Menu Items
            </p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <div
              className="container flex flex-col  items-center justify-center py-14"
              style={{ minHeight: `calc(100vh - 70.94px)` }}
            >
              <p className="mb-2 text-3xl font-bold text-center">
                There Is No Product Yet :(
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-8 flex-wrap my-12 justify-center">
          {products?.map((categoryElements: any) => (
            <>
              {categoryElements.elements.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-center font-bold text-mainColor text-xl">
                    {categoryElements?.category}
                  </p>
                  {categoryElements.elements.map((product) => (
                    <>
                      <div
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        }}
                        className=" bg-white p-6 pt-0 text-center rounded-xl flex flex-col  justify-center items-center"
                      >
                        <img
                          src={product?.image}
                          className="w-[200px]"
                          alt=""
                        />
                        <p className="font-bold text-lg sm:text-xl line-clamp-3">
                          {product?.name}
                        </p>
                        <p className="opacity-50 line-clamp-3 ">
                          {product?.description}
                        </p>
                        <button className="text-white bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl">
                          {(product.sizes.length > 1 ||
                            product.extras.length > 0) &&
                            `start from ${product?.basePrice}`}
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
