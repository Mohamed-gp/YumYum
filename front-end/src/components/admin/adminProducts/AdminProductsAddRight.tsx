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
import AdditionalCreate from "../../additionalCreate/AdditionalCreate";
import IsFeatured from "../../../components/isFeatured/isFeatured";

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

  const [sizes, setSizes] = useState<any>([]);
  const [extras, setExtras] = useState<any>([]);
  const [data, setData] = useState({
    name: "",
    category: "",
    description: "",
    basePrice: 0,
    isFeatured: false,
    image: null,
    loading: false,
    sizes,
    extras,
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
      formData.append("image", data.image);
      formData.append("description", data.description);
      formData.append("basePrice", data.basePrice.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("sizes", JSON.stringify(data.sizes));
      formData.append("extras", JSON.stringify(data.extras));
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
  useEffect(() => {
    setData({ ...data, sizes });
  }, [sizes]);
  useEffect(() => {
    setData({ ...data, extras });
  }, [extras]);

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
            defaultValue={""}
            className="disabled:opacity-50"
            disabled
          >
            Enter The Category That Match Your Product
          </option>
          {categories?.map((category, index) => (
            <option key={category?._id + index} value={category?._id}>
              {category?.name}
            </option>
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
            className="w-full text-center border  py-6 border-mainColor rounded-lg cursor-pointer "
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
        <div className="flex justify-between">
          <p>Description</p>
          <span>{data?.description?.length} caracteres</span>
        </div>
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
      <AdditionalCreate data={sizes} setData={setSizes} name={"Size"} />
      <AdditionalCreate
        data={extras}
        setData={setExtras}
        name={"Extra Engredient"}
      />
      <IsFeatured data={data} setData={setData} />
      <div className="flex w-full justify-end">
        <button
          disabled={
            data.category == "" ||
            data.description == "" ||
            data.image == null ||
            data.sizes.length == 0 ||
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
