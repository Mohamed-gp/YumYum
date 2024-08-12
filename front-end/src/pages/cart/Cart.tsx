import { useEffect, useState } from "react";
import { FaArrowRight, FaRegTrashCan, FaTrash, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";

export default function Cart() {
  const cart: any[] = useSelector((state: IRootState) => state.auth.user?.cart);
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const removeFromCartHandler = async (userId: string, cartId: string) => {
    try {
      const { data } = await customAxios.delete(
        `/cart/delete/${userId}/${cartId}`
      );
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const checkoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/checkout", { cart });
      // window.open(data.data, "_blank");
      window.open(data.data, "_self");

      // to do when the payement is successfull
      // dispatch(authActions.setCart([]));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const addToCartHandler = async (
    quantity: number,
    productId: string,
    sizeName: string,
    extrasName: string[]
  ) => {
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user._id,
        productId,
        sizeName,
        extrasName,
        quantity,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // const couponHandler = () => {
  //   toast.error("invalid copoun");
  //   setCoupon("");
  // };
  const calculateAmountHandler = (ele: any) => {
    let amount = ele?.product?.basePrice;

    ele.product.sizes.map((size: any) => {
      if (size.name == ele.sizeName) {
        amount = amount + size.price;
      }
    });
    ele.product.extras.map((extra: any) => {
      ele.extrasName.map((exName: string) => {
        if (extra.name == exName) {
          amount = amount + extra.price;
        }
      });
    });

    return amount;
  };

  return (
    <>
      {cart?.length != 0 ? (
        <>
          <div className="" style={{ minHeight: "calc(100vh - 250px)" }}>
            <p className="my-6 mt-12 text-center  sm:text-xl font-bold">
              My Shopping Cart
            </p>
            <div className="min-w-[100px]  overflow-auto text-[10px] sm:text-base">
              <table className="w-full ">
                <tbody>
                  {cart?.map((ele) => (
                    <tr className="relative">
                      <td>
                        <div className="mx-auto w-fit">
                          {/* <ZoomedImageStatic imageSrc={ele?.product?.images[0]} /> */}
                          <img
                            src={ele?.product?.image}
                            alt="mac"
                            width={100}
                            height={100}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <p>
                            {ele?.product?.name} ({ele?.sizeName})
                          </p>
                          <p className="phone ">
                            {ele?.extrasName?.map((size) => {
                              return ` +${size}`;
                            })}
                          </p>
                        </div>
                      </td>
                      <td>${calculateAmountHandler(ele).toFixed(2)}</td>

                      <td className="">
                        <div className="flex w-fit mx-auto  bg-white border-2 border-solid p-2 rounded-3xl items-center gap-2">
                          <button
                            onClick={() =>
                              addToCartHandler(
                                ele?.quantity - 1,
                                ele?.product?._id,
                                ele.sizeName,
                                ele.extrasName
                              )
                            }
                            disabled={ele?.quantity == 1}
                            className="bg-mainColor text-white   w-7 h-7 disabled:cursor-not-allowed  rounded-full flex justify-center items-center disabled:opacity-20"
                          >
                            -
                          </button>
                          <span>{ele?.quantity}</span>
                          <button
                            onClick={() =>
                              addToCartHandler(
                                ele?.quantity + 1,
                                ele?.product?._id,
                                ele.sizeName,
                                ele.extrasName
                              )
                            }
                            className="bg-mainColor text-white w-7 h-7  rounded-full flex justify-center items-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        $
                        {(calculateAmountHandler(ele) * ele?.quantity).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        <div className="mx-auto w-fit cursor-pointer bg-white p-2 rounded-xl  text-bgColorDanger">
                          <FaRegTrashCan
                            onClick={() =>
                              removeFromCartHandler(user?._id, ele?._id)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => checkoutHandler()}
            className="my-12 animation-right-arrow-father mx-auto flex items-center gap-2 rounded-xl bg-mainColor px-4 py-2 text-sm text-white"
          >
            <p>Proceed To Checkout</p>
            <div className="animation-right-arrow">
              <FaArrowRight />
            </div>
          </button>
        </>
      ) : (
        <>
          <div
            className="container flex flex-col  items-center justify-center py-14"
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <img
              src="/cart-empty-photo.png"
              alt="cart-empty"
              width={300}
              height={300}
            />
            <p className="my-6 text-mainColor mb-2 text-3xl font-bold">
              Your cart is empty :(
            </p>
            <p className="opacity-60">Hungry? Add Some Product</p>
            <Link
              to="/store"
              className="mt-6 rounded-xl bg-mainColor px-6 py-2  text-white"
            >
              Browse Menu
            </Link>
          </div>
        </>
      )}
    </>
  );
}
