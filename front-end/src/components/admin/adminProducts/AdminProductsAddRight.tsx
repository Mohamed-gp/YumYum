import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import customAxios from "../../../utils/axios/customAxios";
import ZoomedImageStatic from "../../zooomedImage/ZoomedImageStatic";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaTrash,
  FaX,
} from "react-icons/fa6";

const AdminProductsAddRight = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [sizes, setSizes] = useState([]);
  const [extras, setExtras] = useState([]);
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    basePrice: 0,
    isFeatured: false,
    image: null,
    loading: false,
    sizes: sizes,
    extras: extras,
  });
  const createProductHandler = async () => {
    try {
      setData({ ...data, loading: true });
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      if (data.image == null) {
        setData({ ...data, loading: false });
        return toast.error("you must enter the image of the product");
      }
      formData.append("images", data.image);
      formData.append("description", data.description);
      formData.append("basePrice", data.basePrice.toString());
      // formData.append("isFeatured", data.isFeatured.toString());
      const response = await customAxios.post("/products", formData);
      console.log(response.data);
      toast.success(response.data.message);
      setData({ ...data, loading: false });
    } catch (error: any) {
      setData({ ...data, loading: false });
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 flex-1">
      <p className="lg:text-2xl">Add A New Product</p>
      <div className="my-3">
        <p>Product Name</p>
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          placeholder="Enter Your Product Name"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Category</p>
        <select
          name=""
          id=""
          defaultValue={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        >
          <option
            value={""}
            selected={data.category == ""}
            className="disabled:opacity-50"
            disabled
          >
            Enter The Category That Match Your Product
          </option>
          {categories?.map((category) => (
            <option value={category?._id}>{category?.name}</option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <p>Image</p>
        <div className="my-4 flex flex-col items-center gap-y-4 justify-center">
          {data.image ? (
            <>
              <ZoomedImageStatic imageSrc={data.image} />
              <button
                onClick={() => setData({ ...data, image: null })}
                className="bg-mainColor text-white px-6 py-2 rounded-xl"
              >
                Remove Image
              </button>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex w-full justify-end">
        {data.image == null && (
          <label
            htmlFor="admin-products-add"
            className="w-full text-center border-2  py-6  rounded-lg cursor-pointer "
          >
            You Must Enter An Image Of Your Product
          </label>
        )}
        <input
          multiple={false}
          onChange={(e) => {
            if (e.target.files != null) {
              setData({ ...data, image: e.target.files[0] as any });
            }
          }}
          className="hidden"
          type="file"
          name=""
          id="admin-products-add"
        />
      </div>
      <div className="my-3">
        <p>Description</p>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="enter the description of your new product"
          className="w-full px-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="my-3">
        <p>Base Price</p>
        <input
          onChange={(e) => setData({ ...data, basePrice: +e.target.value })}
          type="text"
          placeholder="$12"
          className="w-full pl-4 py-2 bg-white focus:outline-none my-2 border-2"
        />
      </div>
      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 p-1 border-0 justify-start"
          type="button"
        >
          {isOpen && <FaChevronUp />}
          {!isOpen && <FaChevronDown />}
          <span>{"sizes"}</span>
          <span>({sizes.length})</span>
        </button>
        <div className={isOpen ? "block" : "hidden"}>
          {sizes.length > 0 && (
            <>
              <div className="flex items-end gap-2">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Size name"
                    value={20}
                    // onChange={(ev) => editProp(ev, index, "name")}
                  />
                </div>
                <div>
                  <label>Extra price</label>
                  <input
                    type="text"
                    placeholder="Extra price"
                    value={20}
                    // onChange={(ev) => editProp(ev, index, "price")}
                  />
                </div>
                <div>
                  <button type="button" className="bg-white mb-2 px-2">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex gap-6 my-4">
            <input type="text" placeholder="name" className="flex-1" />
            <input type="text" placeholder="size" className="flex-1"/>
          </div>
          <button
            type="button"
            // onClick={addProp}
            className="bg-white items-center w-full flex justify-center gap-2 py-2"
          >
            <FaPlus className=" h-4" />
            <span>{"add Item Size"}</span>
          </button>
        </div>
      </div>

      {/* <div className="my-3 mt-6 flex justify-between items-center">
        <p className="">Is Featured</p>
        <div
          onClick={() => setData({ ...data, isFeatured: !data.isFeatured })}
          className={`relative justify-center items-center ${
            data.isFeatured ? "bg-mainColor" : "bg-mainColor/20"
          } w-[70px] h-[30px] rounded-xl py-1`}
        >
          <span
            className={`w-4 h-4 rounded-full absolute ${
              data.isFeatured ? "right-2" : "right-10"
            } top-1/2 -translate-y-1/2 ${
              data.isFeatured ? "bg-white" : "bg-mainColor"
            } duration-300`}
          ></span>
        </div>
      </div> */}
      <div className="flex w-full justify-end">
        <button
          disabled={
            data.category == "" ||
            data.description == "" ||
            data.image == null ||
            data.loading
          }
          onClick={() => createProductHandler()}
          className="bg-mainColor disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg mt-4 "
        >
          {data.loading == true ? "Loading..." : "Add Product"}
        </button>
      </div>
    </div>
  );
};
export default AdminProductsAddRight;
