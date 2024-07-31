import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <header className={`bg-white sticky z-[20] left-0 top-0`}>
      <div className="container flex items-center justify-between gap-2 py-4">
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </div>
    </header>
  );
}
