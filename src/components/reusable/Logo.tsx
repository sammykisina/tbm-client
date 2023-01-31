import Link from "next/link";
import type { FC } from "react";

interface LogoProps {
  logo_styles?: string;
  dot_styles?: string;
}

const Logo: FC<LogoProps> = ({ logo_styles, dot_styles }) => {
  return (
    <Link
      href="/"
      className={`flex cursor-pointer  items-center gap-1 font-bold  ${logo_styles}`}
    >
      <div className="text-shadow relative whitespace-nowrap font-semibold leading-tight tracking-wider text-[2.5rem] text-c_white">
        Tbm
        <div
          className={`absolute  bottom-[0.2rem] -right-[0.2rem] self-end  rounded-full ${dot_styles}`}
        />
      </div>
    </Link>
  );
};

export default Logo;
