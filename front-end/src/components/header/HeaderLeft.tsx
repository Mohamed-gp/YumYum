import { Link } from "react-router-dom";
import { FaBagShopping, FaShop, FaStore } from "react-icons/fa6";

export default function HeaderLeft() {
  return (
    <Link
      to="/"
      className="text-mainColor text-base sm:min-w-[170px] sm:text-xl font-bold   items-center gap-1"
    >
      YumYum
    </Link>
  );
}
