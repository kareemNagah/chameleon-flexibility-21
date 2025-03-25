
// This component is no longer used as the site is now dark theme by default
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle = ({ className = "" }: DarkModeToggleProps) => {
  // No functionality as we're now dark theme by default
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${className} hidden`} // Hidden by default
      aria-label="Theme is set to dark mode"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-200" />
      <span className="sr-only">Dark theme enabled</span>
    </Button>
  );
};

export default DarkModeToggle;
