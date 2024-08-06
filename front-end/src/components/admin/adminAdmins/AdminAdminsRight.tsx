import { FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";

const AdminAdminsRight = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const [admins, setAdmins] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const getAdmins = async () => {
    try {
      const { data } = await customAxios.get("/admin/admins");
      setAdmins(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const addAdminHandler = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await customAxios.post("/admin/admins", {
        adminEmail,
      });
      toast.success(data.message);
      setAdminEmail("");
      getAdmins();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`/admin/admins/${id}`);
      toast.success(data.message);
      getAdmins();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAdmins();
  }, []);
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-6 flex-1">
      <div className="flex w-full gap-2 items-center mt-4 justify-between">
        <input
          type="text"
          value={adminEmail}
          onChange={(e) => {
            setAdminEmail(e.target.value);
          }}
          placeholder="new Admin"
          className="pl-4 py-2 bg-white w-full rounded-xl focus:outline-none  border-2"
        />
        <button
          onClick={(e) => addAdminHandler(e)}
          disabled={adminEmail == "" || loading == true}
          className="bg-mainColor text-white px-6 py-2 rounded-lg  disabled:opacity-50"
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </div>
      <div className=" p-3 mt-2">
        <p className="mb-6  pb-2 ">Admins Emails</p>

        {admins.length == 0 ? (
          <p className="text-center text-mainColor">
            There Is No Categories,Try Adding one
          </p>
        ) : (
          admins.map((admin: any) => (
            <div
              className="flex justify-between mb-4 p-2 rounded-xl bg-white"
              id={admin?._id}
            >
              <div className="flex items-center">
                <p className="pl-4">
                  {admin?.email} ({user._id == admin._id && "this is you"})
                </p>
              </div>
              <div className="flex items-center gap-4 pr-4 ">
                {user._id != admin._id && (
                  <button
                    onClick={() => deleteHandler(admin._id)}
                    className="flex rounded-xl items-center gap-2 bg-red-500 py-2 px-4 text-white"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AdminAdminsRight;
