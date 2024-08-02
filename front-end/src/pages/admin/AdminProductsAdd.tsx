import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminProductsAddRight from "../../components/admin/adminProducts/AdminProductsAddRight";

const AdminProductsAdd = () => {
  return (
    <div className="flex flex-col container min-h-screen">
      <AdminSideBar />
      <AdminProductsAddRight />
    </div>
  );
};
export default AdminProductsAdd;
