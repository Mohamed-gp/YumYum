import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import customAxios from "../../utils/axios/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import FlyingItem from "../flyingItem/FlyingItem";

interface MenuModelProps {
  product: any;
  setIsModelOpen: any;
}
const MenuModel = ({ product, setIsModelOpen }: MenuModelProps) => {
  const [quantity, setQuantity] = useState(1);
  const [sizeName, setSizeName] = useState({ name: "", price: 0 });
  const [extras, setExtras] = useState<any[]>([]);

  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center bg-black/80  z-50 "
      onClick={() => setIsModelOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[400px] sm:w-[50vw] p-6    h-[80vh]      text-center overflow-auto rounded-2xl container fixed  bg-white  mt-6  "
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <img src={product?.image} className="w-[200px]" alt="" />
          <p className="font-bold text-lg sm:text-xl ">{product?.name}</p>
          <p className="opacity-50  ">{product?.description}</p>
          <p>Pick Your Size</p>
          {product?.sizes?.map((size, ind: number) => (
            <div className="flex gap-2 border-2 w-full rounded-lg p-2">
              <input
                type="radio"
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
              <label className="flex-1 text-left" htmlFor={`radio${ind}`}>
                {size?.name}
              </label>
              <span className="text-mainColor font-bold">
                ${(product?.basePrice + size?.price).toFixed(2)}
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
                      return ele.name == JSON.parse(e.target.value).name;
                    });
                    if (!isExist) {
                      return [
                        ...tmp,
                        {
                          name: JSON.parse(e.target.value).name as string,
                          price: JSON.parse(e.target.value).price as number,
                        },
                      ];
                    } else {
                      tmp = tmp.filter(
                        (ele) => ele.name != JSON.parse(e.target.value).name
                      );
                    }
                    return tmp;
                  });
                }}
                value={JSON.stringify(extra)}
              />
              <label className="flex-1 text-left" htmlFor={`checkbox${ind}`}>
                {extra?.name}
              </label>
              <span className="text-mainColor font-bold">${extra?.price}</span>
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
          <div className="w-full">
            <FlyingItem
              targetTop={"5%"}
              targetLeft={"95%"}
              src={product?.image}
              product={product}
              extras={extras}
              quantity={quantity}
              sizeName={sizeName}
            />
          </div>
          <FaX
            onClick={() => setIsModelOpen(false)}
            className="text-mainColor  absolute top-6 right-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default MenuModel;
