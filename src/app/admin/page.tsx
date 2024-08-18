import { getServerSession } from "@/lib/next-auth";
import { FaTrophy, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Display } from "../_components/global/text";
import StatsCard from "./_components/stats-card";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession();
  const [usersCount, teamsCount, competitionsCount] = await prisma.$transaction(
    [
      prisma.user.count({ where: { role: "USER" } }),
      prisma.registered_team.count(),
      prisma.competition.count(),
    ],
  );

  return (
    <>
      <Display>
        Hello There,{" "}
        <span className="text-primary-400">
          {session?.user?.name.split(" ")[0]}
        </span>
        !
      </Display>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard title="Registran" count={usersCount} Icon={FaUser} />
        <StatsCard title="Tim" count={teamsCount} Icon={FaUserGroup} />
        <StatsCard
          title="Kompetisi"
          count={competitionsCount}
          Icon={FaTrophy}
        />
      </div>
    </>
  );
}
