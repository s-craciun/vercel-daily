import { CONTAINER_PADDING } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "../subscribe-form";
import { checkSubscriptionStatus } from "@/lib/subscription";

export const Header = async () => {
  const isSubscribed = await checkSubscriptionStatus();

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-background/80 backdrop-blur-md flex flex-col md:flex-row gap-3 items-center ${CONTAINER_PADDING} !py-4`}
    >
      <div className="flex gap-8">
        <Link className="flex flex-row items-center gap-2" href="/">
          <div className="relative w-5 h-5">
            <Image
              className="fill-text-foreground"
              src="/vercel.svg"
              alt="Vercel logo"
              fill
            />
          </div>
          Vercel Daily
        </Link>
        <nav className="flex flex-row items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
        </nav>
      </div>
      <div className="md:ml-auto">
        <SubscribeForm withLabel isSubscribed={isSubscribed} />
      </div>
    </header>
  );
};
