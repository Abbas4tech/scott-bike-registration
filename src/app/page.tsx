import Link from "next/link";
import { JSX } from "react";

import { Button } from "@/components/ui/button";

export default function Home(): JSX.Element {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button>
        <Link href={"/registeration"}>Registeration</Link>
      </Button>
    </div>
  );
}
