import customAxios from "../../utils/axios/customAxios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import GoogleSignIn from "../../components/oauth/GoogleSignInButton";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [isHiddenPassword, setisHiddenPassword] = useState(true);
  const loginHandler = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const { email, password } = formData;
    if (email.trim() == "") {
      setLoading(false);
      return toast.error("email Shouldn't be empty");
    }
    if (password.trim() == "") {
      setLoading(false);
      return toast.error("password Shouldn't be empty");
    }
    try {
      const { data } = await customAxios.post("/auth/login", formData);
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          style={{
            minHeight: "calc(100vh - 70.94px)",
          }}
          className="flex h-full w-full flex-col justify-center  px-6 md:w-1/2"
        >
          <p className="text-xl font-bold text-center text-mainColor">LOGIN</p>

          <form action="" className="flex flex-col" onSubmit={loginHandler}>
            <label htmlFor="email">Email : </label>
            <input
              value={formData.email}
              onChange={(e) => {
                setformData({ ...formData, email: e.target.value });
              }}
              type="email"
              id="email"
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />
            <div className="flex justify-between">
              <label htmlFor="email" className="">
                Password
              </label>
              <div className="mr-2 flex cursor-pointer gap-2 text-lg opacity-60">
                {isHiddenPassword && (
                  <FaEyeSlash onClick={() => setisHiddenPassword(false)} />
                )}
                {!isHiddenPassword && (
                  <FaEye onClick={() => setisHiddenPassword(true)} />
                )}
              </div>
            </div>
            <input
              type={isHiddenPassword ? "password" : "text"}
              id="password"
              value={formData.password}
              onChange={(e) => {
                setformData({ ...formData, password: e.target.value });
              }}
              className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
            />
            <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <div className="or-sign-up relative my-2 text-center  ">
              <span className="relative z-10 mx-auto  bg-[#F4ECE1] px-2 font-bold">
                OR
              </span>
            </div>
            <GoogleSignIn />
            <button
              type="submit"
              disabled={loading}
              className="mx-auto disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl bg-mainColor px-6 py-2 text-xl font-bold text-white"
            >
              {loading ? "Loading" : "Login"}
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="opacity-50">Don't Have An Account ? </p>
              <Link to="/register" className="text-mainColor underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
