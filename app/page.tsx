import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <Section>
      <p className="py-20">
        Foundation in place. <Link href="/campaigns?package=membership-drive#planner">planner link</Link>
      </p>
    </Section>
  );
}
