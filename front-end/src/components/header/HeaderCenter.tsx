import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function HeaderCenter() {
  return (
    <ul className="hidden md:flex items-center text-gray-500 font-bold gap-4 rounded-2xl  text-base md:text-lg">
      <Link className="hover:text-mainColor duration-300" to={"/store"}>
        <li>Menu</li>
      </Link>
      <HashLink
        scroll={(el) => el.scrollIntoView({ behavior: "auto", block: "end" })}
        className="hover:text-mainColor duration-300"
        to={"/#aboutUs"}
      >
        <li>About</li>
      </HashLink>
      <HashLink
        scroll={(el) => el.scrollIntoView({ behavior: "auto", block: "end" })}
        className="hover:text-mainColor duration-300"
        to={"/#contactUs"}
      >
        <li>Contact</li>
      </HashLink>
    </ul>
  );
}
