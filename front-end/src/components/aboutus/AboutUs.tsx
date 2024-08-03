import SectionHeaders from "../SectionHeaders/SectionHeaders";

const AboutUs = () => {
  return (
    <section id="aboutUs" className="my-12 container text-center">
      <SectionHeaders title={"About Us"} />
      <p className="max-w-[600px] mx-auto leading-relaxed opacity-50 mt-2">
        The idea for YumYum was born from our love for food and a desire to
        share the world's culinary delights. As passionate food enthusiasts, we
        enjoyed exploring new recipes and cuisines but struggled to find
        authentic, diverse recipes and reliable cooking information. This
        inspired us to create YumYum – an app designed to revolutionize how
        people discover, cook, and enjoy food.
      </p>
      {/* <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div> */}
    </section>
  );
};
export default AboutUs;
