import { H2, P } from "@/app/_components/global/text";
import { findUsers } from "@/database/user.query";
import { getServerSession } from "@/lib/next-auth";
import UserTable from "./_components/table";

export default async function Users() {
  const session = await getServerSession();
  const users = await findUsers({
    NOT: { role: "USER" },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">User Managements</H2>
          <P>Change user's roles and permission</P>
        </div>
      </div>
      <UserTable data={users} />
    </div>
  );
}
