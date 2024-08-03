import { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsRight from "../../components/admin/adminProducts/AdminProductsRight";

export default function AdminProducts() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col container min-h-screen">
      <AdminSideBar />
      <AdminProductsRight />
    </div>
  );
}

{
  /* <a href="https://aadl3inscription2024.dz" target="_blank">here adl</a> */
}
