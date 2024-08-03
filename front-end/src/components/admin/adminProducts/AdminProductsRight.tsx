import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { Product } from "../../../interfaces/dbInterfaces";

const AdminProductsRight = () => {
  const [products, setProducts] = useState<Product[]>();
  const getAllProducts = async () => {
    try {
      const { data } = await customAxios.get("/products");
      setProducts(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`/products/${id}`);
      getAllProducts();
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
      <div className="p-3 mt-2 flex justify-evenly">
        {products?.length == 0 ? (
          <p className="text-center my-6">There Is No Menu Item</p>
        ) : (
          products?.map((product) => (
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="lg:w-[24%] relative bg-white p-6  text-center rounded-xl flex flex-col  justify-center items-center"
            >
              <img src={product.image} className="w-[200px] " alt="" />
              <p className="font-bold text-xl line-clamp-3">{product?.name}</p>
              <p className="opacity-50">{product.price}</p>
              <FaX
                className="absolute -right-2 -top-2 p-1 text-3xl cursor-pointer bg-white rounded-full text-red-500"
                onClick={() => deleteHandler(product._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AdminProductsRight;
