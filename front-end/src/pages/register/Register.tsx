import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import customAxios from "../../utils/axios/customAxios";
import GoogleSignInButton from "../../components/oauth/GoogleSignInButton";
import { authActions } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Register() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isHiddenPassword, setisHiddenPassword] = useState(true);
  const submitHandler = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const { username, email, password } = formData;
    if (email.trim() == "") {
      setLoading(false);
      return toast.error("email is required");
    }
    if (username.trim() == "") {
      setLoading(false);
      return toast.error("username is required");
    }
    if (password.trim() == "") {
      setLoading(false);
      return toast.error("password is required");
    }
    try {
      const { data } = await customAxios.post("/auth/register", formData, {
        withCredentials: true,
      });
      dispatch(authActions.login(data.data));
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
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
            // boxShadow: "rgb(255 255 255 / 30%) 0px 0px 74px 55px",
          }}
          className="flex h-full  w-auto flex-col justify-center  px-6 md:w-1/2"
        >
          <p className="text-xl text-center font-bold text-mainColor">
            REGISTER
          </p>

          <form action="" className="flex flex-col" onSubmit={submitHandler}>
            <label htmlFor="username">Username : </label>
            <input
              value={formData.username}
              onChange={(e) => {
                setformData({ ...formData, username: e.target.value });
              }}
              type="text"
              id="username"
              placeholder="Username"
              className="mb-2 mt-1 rounded-lg border-2 py-1 pl-2 focus:outline-none"
            />

            <label htmlFor="email">Email : </label>
            <input
              value={formData.email}
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setformData({ ...formData, email: e.target.value });
              }}
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
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setformData({ ...formData, password: e.target.value });
              }}
              type={isHiddenPassword ? "password" : "text"}
              id="password"
              className="mb-2 mt-1 rounded-lg border-2 py-2 pl-2 focus:outline-none"
            />
            <span className="mb-2 mt-1 text-center text-bgColorDanger opacity-50">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>

            <div className="or-sign-up relative my-2 text-center  ">
              <span className="relative z-[9] mx-auto  bg-[#F4ECE1] px-2 font-bold">
                OR
              </span>
            </div>
            <GoogleSignInButton />
            <button
              type="submit"
              disabled={loading}
              className="mx-auto disabled:cursor-not-allowed w-full rounded-xl bg-mainColor disabled:opacity-50 px-6 py-2 text-xl font-bold text-white"
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="opacity-50">Already Have An Account ? </p>
              <Link to="/login" className="text-mainColor underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
