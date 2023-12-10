import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function DashboardButton(){
    return(
        <Link href={"/dashboard"}>
            <Button size="xl" className="w-full font-bold" variant="brand">
                Get Started
            </Button>
        </Link>
    )
}