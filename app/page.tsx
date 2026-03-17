import { Button } from "./components/button";

export default function Home() {
  return (
    <div>
      <section className="py-15 px-40">
        <div className="w-[50%] mb-10">
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
          <Button>Browse Articles</Button>
          <Button>Subscribe</Button>
        </div>
      </section>
      <section className="py-15 px-40">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
          Featured
        </h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">
          Handpicked stories from the team.
        </p>
        <div></div>
      </section>
    </div>
  );
}
