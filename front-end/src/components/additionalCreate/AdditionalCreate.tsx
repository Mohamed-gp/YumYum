import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa6";

const AdditionalCreate = ({ data, setData, name }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [ExtraPrice, setExtraPrice] = useState(0);

  const deleteSizeHandler = (index: number) => {
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      if (index == i) {
        continue;
      }
      newArray.push(data[i]);
    }
    setData(newArray);
  };
  return (
    <div className="bg-white p-2 rounded-md mb-2 ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 border-0 justify-start w-full"
      >
        {isOpen && <FaChevronUp />}
        {!isOpen && <FaChevronDown />}
        <span>{name}s</span>
        <span>({data.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {data?.length > 0 ? (
          <>
            <div className="flex items-center w-full gap-6">
              <label className="flex-1">Name</label>
              <label className="flex-1">Extra price</label>
            </div>
            {data.map((size: any, index: number) => (
              <div
                key={index + size.name}
                className="flex items-center w-full my-2 gap-6"
              >
                <div className="flex flex-col flex-1">
                  <input
                    type="text"
                    placeholder="Size name"
                    readOnly
                    className="border p-2 rounded-xl border-mainColor focus:outline-none"
                    value={size.name}
                  />
                </div>
                <div className="flex flex-1 items-center">
                  <div className="flex flex-col flex-1 ">
                    <input
                      type="text"
                      placeholder="Extra price"
                      readOnly
                      value={size?.price}
                      className="border p-2 rounded-xl border-mainColor focus:outline-none"
                      // onChange={(ev) => editProp(ev, index, "price")}
                    />
                  </div>
                  <FaTrash
                    onClick={() => deleteSizeHandler(index)}
                    className="m-2 text-red-600 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-mainColor">
            there is no {name} created, You must enter a size
          </p>
        )}

        <div className="flex gap-6 my-4">
          <div className=" flex-col flex-1 ">
            <label htmlFor="sizeName">name</label>
            <input
              type="text"
              id="sizeName"
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
              }}
              placeholder="name"
              className="flex-1 w-full pl-4 py-2 focus-within:outline-none border p-2 rounded-xl border-mainColor focus:outline-none"
            />
          </div>
          <div className=" flex-col flex-1 ">
            <label htmlFor="extraPriceSize">Extra Price</label>
            <input
              id="extraPriceSize"
              type="number"
              value={ExtraPrice}
              onChange={(e) => setExtraPrice(+e.target.value)}
              placeholder="extra price"
              className="flex-1 w-full pl-4 py-2 focus-within:outline-none border p-2 rounded-xl border-mainColor focus:outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          disabled={typeName == "" || ExtraPrice < 0}
          onClick={() => {
            setData([...data, { name: typeName, price: +ExtraPrice }]);
            setExtraPrice(0);
            setTypeName("");
          }}
          className="bg-mainColor disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white items-center w-full flex justify-center gap-2 py-2"
        >
          <span>add Item {name}</span>
          <FaPlus className=" h-4" />
        </button>
      </div>
    </div>
  );
};
export default AdditionalCreate;
