import { Link } from "react-router-dom";

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
