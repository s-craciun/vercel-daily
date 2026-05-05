import { CONTAINER_PADDING } from "@/constants/constants";
import Image from "next/image";
import { Button } from "../button/button";

export const HeroSection = () => {
  return (
    <section
      className={`${CONTAINER_PADDING} md:flex justify-between items-center`}
    >
      <div className="w-[100%] md:w-[50%] mb-10 md:mb-0">
        <div className="mb-10">
          <h3 className="uppercase mb-5">The Vercel Daily</h3>
          <h1 className="mb-5 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            News and insights for modern web developers.
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Changelogs, engeneering deep dives, customer stories, and community
            updates - all in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button href="/articles">Browse Articles</Button>
        </div>
      </div>
      <div className="relative w-full max-w-[40rem] aspect-[4/3] mx-auto">
        <Image
          className="rounded-md mx-auto object-cover"
          src="/hero-daily-news.webp"
          alt="Laptop"
          fill
          priority
          sizes="(max-width: 540px) 100vw, 40vw"
        />
      </div>
    </section>
  );
};
