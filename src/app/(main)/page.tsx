import prisma from "@/lib/prisma";
import { About, Competition, Hero, Timeline } from "./parts";

export default async function Home() {
  const [competitions] = await prisma.$transaction([
    prisma.competition.findMany({
      include: {
        competitionCategories: {
          include: { registrationBatches: true, stages: true },
        },
      },
    }),
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
      <Competition competitions={competitions} />
      <Timeline competitions={competitions} />
    </>
  );
}
