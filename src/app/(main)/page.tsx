import prisma from "@/lib/prisma";
import { About, Hero } from "./parts";

export default async function Home() {
  const [competitions] = await prisma.$transaction([
    prisma.competition.findMany(),
  ]);

  return (
    <>
      <Hero
        competitions={competitions.map(({ name, logo, description }) => ({
          name,
          logo,
          description,
        }))}
      />
      <About competitionsCount={competitions.length} />
    </>
  );
}
