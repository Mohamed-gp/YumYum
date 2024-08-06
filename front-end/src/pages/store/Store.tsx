import { useEffect, useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import ProductCard from "../../components/productCard/ProductCard";
import { productsActions } from "../../redux/slices/productsSlice";

const Store = () => {
  const products = useSelector((state: IRootState) => state.products.products);
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(`/products/listed`);
      dispatch(productsActions.setProducts(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    getProducts();
  }, []);

  return (
    <div className="container pt-6 mt-6">
      {products?.length == 0 ? (
        <>
          <div className="flex justify-between items-center ">
            <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
              Menu Items
            </p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <div
              className="container flex flex-col  items-center justify-center gap-4 py-14"
              style={{ minHeight: `calc(100vh - 170.94px)` }}
            >
              <div className="w-40 h-40 rounded-full animate-spin  border-transparent border-[5px] border-r-mainColor "></div>
              <p className="mb-2 text-3xl font-bold text-center">
                There Is No Product Yet :(
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container my-6 flex flex-col gap-12">
            {products?.map((categoryElements: any) => (
              <>
                {categoryElements?.elements?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-center font-bold text-mainColor text-xl">
                      {categoryElements?.category}
                    </p>

                    <div className="flex justify-evenly flex-wrap gap-6 ">
                      {categoryElements?.elements.map((product: any) => (
                        <ProductCard product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Store;
