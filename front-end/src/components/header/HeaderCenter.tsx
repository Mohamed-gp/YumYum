import { Link } from "react-router-dom";

export default function HeaderCenter() {
  return (
    <ul className="hidden md:flex items-center text-gray-500 font-bold gap-4 rounded-2xl  text-base md:text-lg">
      <Link className="hover:text-mainColor duration-300" to={""}>
        <li>Menu</li>
      </Link>
      <Link className="hover:text-mainColor duration-300" to={""}>
        <li>About</li>
      </Link>
      <Link className="hover:text-mainColor duration-300" to={""}>
        <li>Contact</li>
      </Link>
    </ul>
  );
}
