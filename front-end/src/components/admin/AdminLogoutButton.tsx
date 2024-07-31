import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const { data } = await customAxios.post("/auth/logout");
      dispatch(authActions.logout(null));
      navigate("/");
      toast.success(data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <button
      onClick={() => logoutHandler()}
      className="flex items-center admin-logout-button p-1 lg:p-2 justify-center lg:justify-normal rounded-xl lg:rounded-l-lg"
    >
      Logout
    </button>
  );
};
export default AdminLogoutButton;
