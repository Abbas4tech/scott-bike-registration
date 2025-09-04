import Link from "next/link";
import { JSX } from "react";

import { Button } from "@/components/ui/button";

export default function Home(): JSX.Element {
  return (
    <Button>
      <Link href={"/registeration"}>Registeration</Link>
    </Button>
  );
}
