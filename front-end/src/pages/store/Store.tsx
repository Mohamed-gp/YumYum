import { useEffect, useState } from "react";
import ProductComp from "../../components/product/Product";
import customAxios from "../../utils/axios/customAxios";
import { json, useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/dbInterfaces";
import { FaX } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";

const Store = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await customAxios.get(`/products/listed`);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollTo(0, 0);
    getProducts();
  }, []);

  const [product, setProduct] = useState<any>({});
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [sizeName, setSizeName] = useState({ name: "", price: 0 });
  const [extras, setExtras] = useState<any[]>([]);
  const openProductInfoHandler = async (id: string) => {
    try {
      getProductHandler(id);
      setIsModelOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductHandler = async (id: string) => {
    try {
      const { data } = await customAxios.get(`/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addToCartHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        sizeName: sizeName.name,
        extrasName: extras.map((extra) => extra.name),
        quantity,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container pt-6 mt-6">
      {products?.length == 0 ? (
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
        <>
          <div className="container my-6 flex flex-col gap-12">
            {products?.map((categoryElements: any) => (
              <>
                {categoryElements.elements.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-center font-bold text-mainColor text-xl">
                      {categoryElements?.category}
                    </p>
                    <div className="flex justify-evenly">
                      {categoryElements.elements.map((product) => (
                        <>
                          <div
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                            className=" bg-white lg:w-[24%] p-6 pt-0 text-center rounded-xl flex flex-col  justify-center items-center"
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
                            <button
                              onClick={() =>
                                openProductInfoHandler(product._id)
                              }
                              className="text-white bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl"
                            >
                              {(product.sizes.length > 1 ||
                                product.extras.length > 0) &&
                                `start from ${product?.basePrice}`}
                            </button>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          {isModelOpen && (
            <div
              className="fixed w-screen h-screen left-0 top-0  bg-black/85 z-50 "
              onClick={() => setIsModelOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[400px] sm:w-[50vw] p-6  left-[50%] -translate-x-1/2  h-[80vh]  top-1/2 -translate-y-1/2    text-center overflow-auto rounded-2xl container fixed  bg-white  mt-6  "
              >
                <div className="flex flex-col justify-center items-center gap-2">
                  <img src={product?.image} className="w-[200px]" alt="" />
                  <p className="font-bold text-lg sm:text-xl ">
                    {product?.name}
                  </p>
                  <p className="opacity-50  ">{product?.description}</p>
                  <p>Pick Your Size</p>
                  {product?.sizes?.map((size, ind: number) => (
                    <div className="flex gap-2 border-2 w-full rounded-lg p-2">
                      <input
                        type="radio"
                        defaultChecked
                        onClick={(e) => {
                          setSizeName({
                            name: JSON.parse(e.target.value).name,
                            price: JSON.parse(e.target.value).price,
                          });
                        }}
                        name="radio"
                        value={JSON.stringify(size)}
                        id={`radio` + ind}
                      />
                      <label
                        className="flex-1 text-left"
                        htmlFor={`radio${ind}`}
                      >
                        {size?.name}
                      </label>
                      <span className="text-mainColor font-bold">
                        ${product?.basePrice + size?.price}
                      </span>
                    </div>
                  ))}
                  <p>Any Extras?</p>
                  {product?.extras?.map((extra, ind: number) => (
                    <div className="flex gap-2 border-2 w-full rounded-lg p-2">
                      <input
                        type="checkbox"
                        name="checkbox"
                        id={`checkbox` + ind}
                        onClick={(e: any) => {
                          setExtras((tmp) => {
                            const isExist = tmp.find((ele: any) => {
                              return (
                                ele.name == JSON.parse(e.target.value).name
                              );
                            });
                            if (!isExist) {
                              return [
                                ...tmp,
                                {
                                  name: JSON.parse(e.target.value)
                                    .name as string,
                                  price: JSON.parse(e.target.value)
                                    .price as number,
                                },
                              ];
                            } else {
                              tmp = tmp.filter(
                                (ele) =>
                                  ele.name != JSON.parse(e.target.value).name
                              );
                            }
                            return tmp;
                          });
                        }}
                        value={JSON.stringify(extra)}
                      />
                      <label
                        className="flex-1 text-left"
                        htmlFor={`checkbox${ind}`}
                      >
                        {extra?.name}
                      </label>
                      <span className="text-mainColor font-bold">
                        ${extra?.price}
                      </span>
                    </div>
                  ))}
                  <div className="flex w-full mt-6 justify-between">
                    <p>Quantity</p>
                    <div className="flex  bg-white border-2 border-solid  rounded-xl items-center gap-2">
                      <button
                        onClick={() => setQuantity((prev) => prev - 1)}
                        disabled={quantity == 1}
                        className="bg-mainColor text-white disabled:cursor-not-allowed w-[35px] h-[35px] rounded-xl flex justify-center items-center disabled:opacity-20"
                      >
                        -
                      </button>
                      <span className="text-sm">{quantity}</span>
                      <button
                        onClick={() => {
                          setQuantity((prev) => prev + 1);
                        }}
                        className="bg-mainColor text-white w-[35px] h-[35px]  rounded-xl flex justify-center items-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full mt-2 mb-2 justify-between">
                    <p className="">Total: </p>
                    <span>
                      $
                      {
                        +(
                          (product?.basePrice +
                            sizeName?.price +
                            extras?.reduce((acc, curr) => {
                              return acc + curr?.price;
                            }, 0)) *
                          quantity
                        ).toFixed(2)
                      }
                    </span>
                  </div>
                  <div className="flex w-full">
                    <button
                      onClick={() => addToCartHandler()}
                      disabled={isLoading}
                      className="text-white flex-1 disabled:cursor-not-allowed disabled:opacity-50 bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl"
                    >
                      {isLoading ? "Loading..." : "Add To Cart"}
                    </button>
                  </div>
                  <FaX
                    // onClick={() => setIsPostPhotosModelOpen(false)}
                    className="text-redColor  absolute top-6 right-6 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Store;
