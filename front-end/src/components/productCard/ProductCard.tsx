import { useSelector } from "react-redux";
import MenuModel from "../../components/MenuModel/MenuModel";
import { useState } from "react";
import { IRootState } from "../../redux/store";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: any;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.auth.user);
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      className=" bg-white lg:w-[24%] p-6 pt-0 text-center rounded-xl flex flex-col  justify-center items-center"
    >
      <img id="haha" className="w-[170px] flex-1" src={product?.image} alt="" />
      <p className="font-bold text-lg sm:text-xl line-clamp-3">
        {product?.name}
      </p>
      <p className="opacity-50 line-clamp-3 ">{product?.description}</p>
      {user ? (
        <button
          onClick={() => setIsModelOpen(true)}
          className="text-white bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl"
        >
          {(product.sizes.length > 1 || product.extras.length > 0) &&
            `start from $${product?.basePrice}`}
        </button>
      ) : (
        <Link
          to={"/register"}
          className="text-white bg-mainColor w-full sm:text-base text-sm mt-2 py-2 rounded-xl"
        >
          {(product.sizes.length > 1 || product.extras.length > 0) &&
            `start from ${product?.basePrice}`}
        </Link>
      )}

      {isModelOpen && (
        <MenuModel product={product} setIsModelOpen={setIsModelOpen} />
      )}
    </div>
  );
};
export default ProductCard;
