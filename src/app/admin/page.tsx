import { getServerSession } from "@/lib/next-auth";
import { Display } from "../_components/global/text";

export default async function Dashboard() {
  const session = await getServerSession();

  return (
    <Display>
      Hello There,{" "}
      <span className="text-primary-400">
        {session?.user?.name.split(" ")[0]}
      </span>
      !
    </Display>
  );
}
