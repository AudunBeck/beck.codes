import { SmallAbout } from "@/components/SmallAbout";

export default async function AboutPage() {
  return (
    <main className="px-16 py-8">
      <SmallAbout>About</SmallAbout>
      <h1 className="text-3xl md:text-6xl mb-6 font-semibold">
        Audun Sagstuen Beck
      </h1>
      <h2 className="text-2xl md:text-4xl">
        Software Developer,{" "}
        <span className="text-green-700 dark:text-green-400 italic">
          and full-time nerd.
        </span>
      </h2>
      <div className="prose md:prose-xl dark:prose-invert mt-8">
        <p className="">I am not sure what to put here yet.</p>
      </div>
    </main>
  );
}
