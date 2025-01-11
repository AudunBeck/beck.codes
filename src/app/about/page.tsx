import { SmallAbout } from "@/components/SmallAbout";

export default async function AboutPage() {
  return (
    <main className="px-4 md:px-16">
      <SmallAbout>About</SmallAbout>
      <h1 className="mt-8 mb-6 font-semibold text-3xl md:text-6xl">
        Audun Sagstuen Beck
      </h1>
      <h2 className="text-2xl md:text-4xl">
        Software Developer,{" "}
        <em className="text-accent italic dark:text-accent-dark">
          and full-time nerd.
        </em>
      </h2>
      <div className="prose prose-slate md:prose-lg dark:prose-invert mt-8">
        <p className="">I am not sure what to put here yet.</p>
      </div>
    </main>
  );
}
