import prisma from "@/lib/prisma";
import { About, Competition, FAQ, Hero, Timeline } from "./parts";
import Wrapper from "./_components/wrapper";

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
    <Wrapper value={{ competitions }}>
      <Hero />
      <About />
      <Competition />
      <Timeline />
      <FAQ />
    </Wrapper>
  );
}
