import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import customAxios from "../../../utils/axios/customAxios";
import toast from "react-hot-toast";

const AdminCategoriesRight = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const createCategoryHandler = async () => {
    try {
      const { data } = await customAxios.post("/categories", {
        name: category,
      });
      toast.success(data.message);
      setCategory("");
      getCategories();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await customAxios.delete(`categories/${id}`);
      toast.success(data.message);
      getCategories();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="p-6 flex-1">
      <div className="flex w-full gap-2 items-center mt-4 justify-between">
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="new category"
          className="pl-4 py-2 bg-white w-full rounded-xl focus:outline-none  border-2"
        />
        <button
          onClick={() => createCategoryHandler()}
          disabled={category == "" || loading == true}
          className="bg-mainColor text-white px-6 py-2 rounded-lg  disabled:opacity-50"
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </div>
      <div className=" p-3 mt-2">
        <p className="mb-6  pb-2 ">Categories Names</p>

        {categories.length == 0 ? (
          <p className="text-center text-mainColor">There Is No Categories,Try Adding one</p>
        ) : (
          categories.map((category) => (
            <div
              className="flex justify-between mb-4 p-2 rounded-xl bg-white"
              id={category?._id}
            >
              <div className="flex items-center">
                <p className="pl-4">{category?.name}</p>
              </div>
              <div className="flex items-center gap-4 pr-4 ">
                <button
                  onClick={() => deleteHandler(category._id)}
                  className="flex rounded-xl items-center gap-2 bg-red-500 py-2 px-4 text-white"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default AdminCategoriesRight;
