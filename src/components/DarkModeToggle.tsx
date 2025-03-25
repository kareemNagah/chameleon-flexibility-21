
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle = ({ className = "" }: DarkModeToggleProps) => {
  const { isDarkMode, toggleDarkMode } = useAuth();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className={`rounded-full ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-yellow-200" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DarkModeToggle;
