import React, { useRef, ReactNode, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import customAxios from "../../utils/axios/customAxios";
import { authActions } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const DEFAULT_TARGET_TOP = "5%";
const DEFAULT_TARGET_LEFT = "5%";
const DEFAULT_ANIMATION_DURATION = 0.9;
const DEFAULT_ITEM_STYLING: React.CSSProperties = {
  borderRadius: "4rem",
  width: "8rem",
};

interface FlyingItemProps {
  src?: string;
  targetTop?: string;
  targetLeft?: string;
  customAnimation?: string;
  animationDuration?: number;
  flyingItemStyling?: React.CSSProperties;
  product: any;
  quantity: number;
  sizeName: any;
  extras: any;
}

const FlyingItem: React.FC<FlyingItemProps> = ({
  src = "",
  targetTop = DEFAULT_TARGET_TOP,
  targetLeft = DEFAULT_TARGET_LEFT,
  customAnimation = "",
  animationDuration = DEFAULT_ANIMATION_DURATION,
  flyingItemStyling = DEFAULT_ITEM_STYLING,
  product,
  sizeName,
  extras,
  quantity,
}) => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const addToCartHandler = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setIsLoading(true);
    try {
      const { data } = await customAxios.post("/cart/add", {
        userId: user?._id,
        productId: product?._id,
        sizeName: sizeName.name,
        extrasName: extras.map((extra: any) => extra.name),
        quantity,
      });
      dispatch(authActions.setCart(data.data));
      toast.success(data.message);
      initFlight(e);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const flyingImage = useRef<HTMLImageElement | null>(null);

  const initFlight = (e: MouseEvent<HTMLButtonElement>) => {
    if (flyingImage.current) {
      flyingImage.current.style.setProperty(
        "--target-position-x",
        e.clientX + "px"
      );
      flyingImage.current.style.setProperty(
        "--target-position-y",
        e.clientY + "px"
      );
      flyingImage.current.style.setProperty("display", "");
      flyingImage.current.src = src;
      setTimeout(() => {
        if (flyingImage.current) {
          flyingImage.current.style.setProperty("display", "none");
        }
      }, animationDuration * 1000 - 100);
    }
  };

  const customStyling = `
    .flying_image {
      --target-position-x: 0px;
      --target-position-y: 0px;
      width : 100%
      display: block;
      position: fixed;
      top: var(--target-position-y);
      left: var(--target-position-x);
      translate: -50% -50%;
      animation: fly ${animationDuration}s 1;
    }
    @keyframes fly {
      0% {
        top: var(--target-position-y);
        left: var(--target-position-x);
        opacity: 1;
      }
      ${customAnimation}
      100% {
        top: ${targetTop};
        left: ${targetLeft};
        opacity: 0;
      }
    }
  `;

  return (
    <div className="w-full">
      <style>{customStyling}</style>
      <button
        className="w-full disabled:opacity-50 bg-mainColor py-2 rounded-xl text-white"
        id={`flyingButton${product?._id}`}
        disabled={isLoading}
        onClick={(e) => addToCartHandler(e)}
      >
        Add To Cart
      </button>
      <img
        src=""
        alt=""
        className="flying_image"
        style={{
          display: "none",
          ...DEFAULT_ITEM_STYLING,
          ...flyingItemStyling,
        }}
        ref={flyingImage}
      />
    </div>
  );
};

export default FlyingItem;
