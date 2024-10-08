interface SectionHeadersProps {
  title: string;
}

const SectionHeaders = ({ title }: SectionHeadersProps) => {
  return (
    <p className="text-xl sm:text-5xl  font-bold text-center  text-mainColor">{title}</p>
  );
};
export default SectionHeaders;
