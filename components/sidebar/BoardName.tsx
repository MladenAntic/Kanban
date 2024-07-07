import Image from "next/image";
import Link from "next/link";

const BoardName = ({ name }: { name: string }) => {
  return (
    <Link
      href={`/dashboard/${name}`}
      type="button"
      className="group flex w-full items-center gap-2 rounded-r-full py-4 pl-8 transition-colors duration-200 hover:bg-darkBlue"
    >
      <Image
        src="/board-icon-regular.svg"
        width={16}
        height={16}
        alt="Board Icon"
      />
      <span className="text-[15px] font-bold text-mediumGray group-hover:text-white">
        {name}
      </span>
    </Link>
  );
};

export default BoardName;
