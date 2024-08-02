import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import toast from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";
import { authActions } from "../../redux/slices/authSlice";

export default function HeaderRight() {
  const dispatch = useDispatch();
  const user: any = useSelector((state: IRootState) => state.auth.user);
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      toast.success(data.message);
      dispatch(authActions.logout(null));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 text-sm md:text-lg ">
      {user?.role != "admin" ? (
        <Link to={user ? `/profile` : `/register`} className=" md:text-xl ">
          <FaUser />
        </Link>
      ) : (
        <Link to="/admin/profile" className=" md:text-xl ">
          <RiAdminFill />
        </Link>
      )}
      {/* <div className="border-r-2 py-2 pr-3 ">
        <Link
          to={user?._id ? `/wishlist` : "/register"}
          className=" md:text-xl"
        >
          <FaHeart />
        </Link>
      </div> */}
      {user && (
        <button
          onClick={() => logoutHandler()}
          className="text-white bg-mainColor px-6 py-1 rounded-xl"
        >
          Logout
        </button>
      )}
      <Link
        to={user?._id ? `/cart` : "/register"}
        className="cart-icon relative md:text-xl border-l-2  pl-3"
      >
        <FaCartShopping />
        {user && user?.cart?.length != 0 && (
          <span className="absolute  bg-mainColor -right-1 -top-1 w-[13px] h-[13px] rounded-full"></span>
        )}
      </Link>
    </div>
  );
}
