import { LayoutDashboard, LucideHouse } from "lucide-react";
import NavigationItem from "@/components/navigation-item";

export default function Navigation() {
    return (
        <nav className="flex flex-col gap-1.5">
            <NavigationItem page="" icon={<LucideHouse />} alt="Home" hideLabel>
                Home
            </NavigationItem>
            <NavigationItem page="board" icon={<LayoutDashboard />} alt="Board" hideLabel>
                Board
            </NavigationItem>
        </nav>
    );
}
