import SectionHeaders from "../SectionHeaders/SectionHeaders";

const Features = () => {
  return (
    <div>
      <SectionHeaders title="Features" />
      <div className="my-12 container flex lg:flex-row lg:justify-evenly flex-col">
        <div className="lg:w-[30%] flex flex-col gap-2 justify-center items-center">
          <img src="/5739256 1.png" alt="" />
          <p className="font-bold text-xl">Easy To Order</p>
          <p className="opacity-50 text-center">
            You only need a few steps in ordering food
          </p>
        </div>
        <div className="lg:w-[30%] flex flex-col justify-center items-center">
          <img src="/Take Away-rafiki 1.png" alt="" />
          <p className="font-bold text-xl">Fastest Delivery</p>
          <p className="opacity-50 text-center">
            Delivery that is always ontime even faster
          </p>
        </div>
        <div className="lg:w-[30%] flex flex-col justify-center items-center">
          <img src="/Waiters-rafiki 1.png" alt="" />
          <p className="font-bold text-xl">Best Quality</p>
          <p className="opacity-50 text-center">
            Not only fast for us quality is also number one
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
export default Features;
