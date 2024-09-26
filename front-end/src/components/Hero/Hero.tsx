import { MdFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className=" ">
      <div
        className="container relative  flex h-full w-[100vw] flex-col-reverse f items-center justify-center gap-2 gap-y-6 py-12 lg:flex-row lg:justify-between"
        style={{
          minHeight: "calc(100vh - 76.5px)",
        }}
      >
        <div className="w-full  text-center leading-loose lg:w-1/2 lg:text-left sm:px-16">
          <div className="mb-2 text-xl md:text-5xl font-bold">
            <p>Taste the Difference </p>
            With <span className="text-mainColor">YumYum</span>
          </div>
          <p className="opacity-50 md:text-base text-sm ">
            Get your favorite meals delivered fresh and fast. Discover
            deliciousness at your doorstep with YumYum's top-rated food delivery
            service!
          </p>
          <div className=" flex-wrap my-6 flex items-center justify-center gap-3 font-bold lg:justify-normal">
            <Link
              to={`/store`}
              className="text-center rounded-xl bg-white px-3 py-1 text-[#201F20] border-2"
            >
              Get Some Food
            </Link>
            {/* <a
              href="/zCV.pdf"
              download
              className="flex items-center justify-center w-full bg-mainColor text-white gap-2 px-3 py-1  font-semibold duration-300  border rounded-full  group hover:scale-105 sm:w-auto sm:justify-normal"
            >
              <p>Download Our APK</p>
              <MdFileDownload className="duration-500 group-hover:translate-y-[3px] " />
            </a> */}
            <Link
              to={`/inprogressapp`}
              className="flex items-center justify-center w-full bg-mainColor text-white gap-2 px-3 py-1  font-semibold duration-300  border rounded-full  group hover:scale-105 sm:w-auto sm:justify-normal"
            >
              <p>Download Our APK</p>
              <MdFileDownload className="duration-500 group-hover:translate-y-[3px] " />
            </Link>
          </div>
        </div>

        <img src="/landing.png" alt="" width={500} />
        {/* <img src="/pizza.png" alt="" width={500} /> */}
      </div>
    </div>
  );
}
