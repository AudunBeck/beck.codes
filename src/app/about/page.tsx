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
        <p>
          I work as a webdev, focusing on the full experience of the technical
          stack.
          <br />
          Starting at the development team's workflow and choice of tech.
        </p>
        <p>
          I'm a senior consultant at{" "}
          <a href="https://www.netlight.com/" className="text-nl-purple">
            Netlight
          </a>
          , a consultancy that focuses on learning and collective intelligence
          in the technology industry.
        </p>
        <p>
          When I don't work, I enjoy spending my time tinkering with software,
          play board games and tabletop rpgs.
          <br />I do also read a lot, and sometimes write.
        </p>
      </div>
    </main>
  );
}
