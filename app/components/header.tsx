import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="px-40 sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md flex flex-row items-center gap-8 py-4">
      <Link className="flex flex-row items-center gap-2" href="/">
        <Image
          className="text-foreground"
          src="vercel.svg"
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
    </header>
  );
};
