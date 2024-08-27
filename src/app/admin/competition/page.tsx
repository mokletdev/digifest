import { H2, P } from "@/app/_components/global/text";
import { findCompetitions } from "@/database/competition.query";
import CompetitionTable from "./_components/table";

export default async function Users() {
  const competitions = await findCompetitions();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Competition List</H2>
          <P>Create and edit competitions</P>
        </div>
      </div>
      <CompetitionTable data={competitions} />
    </div>
  );
}
