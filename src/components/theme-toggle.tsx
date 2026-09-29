import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEME_STORAGE_KEY = "portfolio-theme-v2";

export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = root.classList.contains("dark") ? "light" : "dark";

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="shrink-0 border-line bg-surface/75 text-ink shadow-none backdrop-blur-xl hover:bg-surface-strong hover:text-blueprint"
    >
      <Sun aria-hidden="true" className="block dark:hidden" />
      <Moon aria-hidden="true" className="hidden dark:block" />
    </Button>
  );
}