import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button>
        <Link href={"/registeration"}>Registeration</Link>
      </Button>
    </>
  );
}
