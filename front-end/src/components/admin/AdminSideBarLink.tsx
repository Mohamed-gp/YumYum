import { NavLink } from "react-router-dom";
import { ReactElement } from "react";

interface AdminSideBarLinkProps {
  link: string;
}

const AdminSideBarLink = ({ link }: AdminSideBarLinkProps) => {
  return (
    <NavLink
      to={`/admin/${link}`}
      className="flex lg:flex lg:justify-normal justify-center lg:gap-1 p-2 admin-nav-link items-center  rounded-xl"
    >
      {link}
    </NavLink>
  );
};
export default AdminSideBarLink;
