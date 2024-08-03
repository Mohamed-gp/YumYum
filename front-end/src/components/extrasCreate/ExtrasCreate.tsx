import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa6";

const ExtrasCreate = ({ extras, setExtras, name }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeName, setSizeName] = useState("");
  const [sizeExtraPrice, setSizeExtraPrice] = useState("");

  const deleteSizeHandler = (index: number) => {
    let newArray = [];
    for (let i = 0; i < extras.length; i++) {
      if (index == i) {
        continue;
      }
      newArray.push(extras[i]);
    }
    setExtras(newArray);
  };
  return (
    <div className="bg-white p-2 rounded-md mb-2 ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 border-0 justify-start w-full"
      >
        {isOpen && <FaChevronUp />}
        {!isOpen && <FaChevronDown />}
        <span>{"Extras"}</span>
        <span>({extras.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {extras?.length > 0 ? (
          <>
            <div className="flex items-center w-full gap-6">
              <label className="flex-1">Name</label>
              <label className="flex-1">Extra price</label>
            </div>
            {extras.map((size: any, index: number) => (
              <div className="flex items-center w-full my-2 gap-6">
                <div className="flex flex-col flex-1">
                  <input
                    type="text"
                    placeholder="Size name"
                    className="border p-2 rounded-xl border-mainColor focus:outline-none"
                    value={size.name}
                  />
                </div>
                <div className="flex flex-1 items-center">
                  <div className="flex flex-col flex-1 ">
                    <input
                      type="text"
                      placeholder="Extra price"
                      value={size?.price}
                      className="border p-2 rounded-xl border-mainColor focus:outline-none"
                      // onChange={(ev) => editProp(ev, index, "price")}
                    />
                  </div>
                  <FaTrash
                    onClick={() => deleteSizeHandler(index)}
                    className="m-2 text-red-600"
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-mainColor">
            there is no extras created, You can enter some extras
          </p>
        )}

        <div className="flex gap-6 my-4">
          <div className=" flex-col flex-1 ">
            <label htmlFor="sizeName">name</label>
            <input
              type="text"
              id="sizeName"
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              placeholder="name"
              className="flex-1 w-full pl-4 py-2 focus-within:outline-none border p-2 rounded-xl border-mainColor focus:outline-none"
            />
          </div>
          <div className=" flex-col flex-1 ">
            <label htmlFor="extraPriceSize">Extra Price</label>
            <input
              id="extraPriceSize"
              type="text"
              value={sizeExtraPrice}
              onChange={(e) => setSizeExtraPrice(e.target.value)}
              placeholder="extra price"
              className="flex-1 w-full pl-4 py-2 focus-within:outline-none border p-2 rounded-xl border-mainColor focus:outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setExtras((sizes: any) => {
              sizes = [...sizes, { name: sizeName, price: sizeExtraPrice }];
              return sizes;
            });
          }}
          className="bg-mainColor rounded-xl text-white items-center w-full flex justify-center gap-2 py-2"
        >
          <span>{"add Item Size"}</span>
          <FaPlus className=" h-4" />
        </button>
      </div>
    </div>
  );
};
export default ExtrasCreate;
