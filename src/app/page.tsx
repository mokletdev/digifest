import { Button } from "./_components/global/button";
import { Display, H1 } from "./_components/global/text";

export default function Home() {
  return (
    <>
      <Display>Test</Display>
      <div className="flex items-center gap-2">
        <Button variant={"primary"}>Sign in</Button>
        <Button variant={"secondary"}>Sign up</Button>
      </div>
    </>
  );
}
