import { getServerSession } from "@/lib/next-auth";
import { FaTrophy, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Display } from "../_components/global/text";
import StatsCard from "./_components/stats- card";

export default async function Dashboard() {
  const session = await getServerSession();

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
        <StatsCard title="Registran" count={20} Icon={FaUser} />
        <StatsCard title="Tim" count={20} Icon={FaUserGroup} />
        <StatsCard title="Kompetisi" count={2} Icon={FaTrophy} />
      </div>
    </>
  );
}
