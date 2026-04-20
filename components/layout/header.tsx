import { CONTAINER_PADDING } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "../subscribe-form";

export const Header = async () => {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-background/80 backdrop-blur-md flex flex-row items-center gap-8 ${CONTAINER_PADDING} !py-4`}
    >
      <Link className="flex flex-row items-center gap-2" href="/">
        <Image
          className="fill-text-foreground"
          src="/vercel.svg"
          alt="Vercel logo"
          width={20}
          height={20}
        />
        Vercel Daily
      </Link>
      <nav className="flex flex-row items-center gap-8">
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
      </nav>
      <div className="ml-auto">
        <SubscribeForm withLabel />
      </div>
    </header>
  );
};
