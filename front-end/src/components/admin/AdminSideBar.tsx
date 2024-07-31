import { Link, NavLink } from "react-router-dom";
import AdminSideBarLink from "./AdminSideBarLink";
// import AdminLogoutButton from "./AdminLogoutButton";
import { MdDashboard } from "react-icons/md";
import { HiArchiveBox } from "react-icons/hi2";
import { FaLinesLeaning } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
const AdminSideBar = () => {
  return (
    <nav
      className={
        "text-gray-500 p-2 lg:pl-6 lg:py-8   my-6 flex  gap-2 text-lg justify-center "
      }
    >
      <AdminSideBarLink link="Profile" />
      <AdminSideBarLink link="categories" />
      <AdminSideBarLink link="dashboard" />
      <AdminSideBarLink link="Menu" />
      {/* <AdminSideBarLink link="coupons" icon={<RiCoupon3Fill />} /> */}
      {/* <AdminSideBarLink link="orders" icon={<FaBasketShopping />} /> */}
      <AdminSideBarLink link="admins" />
      {/* <AdminLogoutButton /> */}
    </nav>
  );
};
export default AdminSideBar;
