import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Product } from "../../../interfaces/dbInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { productsActions } from "../../../redux/slices/productsSlice";

const AdminProductsRight = () => {
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

  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`/products/${id}`);
      getProducts();
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className=" flex-1">
      <div className="flex w-full justify-end">
        <Link
          to="/admin/products/add"
          className="bg-mainColor w-full text-center text-white px-6 py-2 rounded-lg mt-4 "
        >
          Add New Product
        </Link>
      </div>
      <div className="p-3 mt-2 flex justify-evenly flex-wrap gap-6">
        {products?.length == 0 ? (
          <p className="text-center my-6">There Is No Menu Item</p>
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
                          <div
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                            className="lg:w-[24%] relative bg-white p-6  text-center rounded-xl flex flex-col  justify-center items-center"
                          >
                            <img
                              src={product.image}
                              className="w-[200px] "
                              alt=""
                            />
                            <p className="font-bold text-xl line-clamp-3">
                              {product?.name}
                            </p>
                            <p className="opacity-50">{product.price}</p>
                            <FaX
                              className="absolute -right-2 -top-2 p-1 text-3xl cursor-pointer bg-white rounded-full text-red-500"
                              onClick={() => deleteHandler(product._id)}
                            />
                          </div>
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
    </div>
  );
};
export default AdminProductsRight;
