interface isFeaturedProps {
  data: any;
  setData: any;
}

const isFeatured = ({ data, setData }: isFeaturedProps) => {
  return (
    <div className="my-3 mt-6 flex justify-between items-center">
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
    </div>
  );
};
export default isFeatured;
