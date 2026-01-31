"use client";

import { useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { LANGUAGE_NAMES } from "@/config/config";
import { useLanguageSwitcher } from "@/hooks/use-language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const { currentLocale, switchLocale } = useLanguageSwitcher();

  return (
    <DropdownMenu>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                aria-label={t("changeLanguage")}
              >
                <Languages className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={10}>
            <p>{t("changeLanguage")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(LANGUAGE_NAMES).map(([locale, { name, icon }]) => (
          <DropdownMenuItem
            key={locale}
            className="flex items-center justify-between cursor-pointer"
            onClick={() =>
              switchLocale(locale as keyof typeof LANGUAGE_NAMES)
            }
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span>{name}</span>
            </span>
            {currentLocale === locale && (
              <span className="text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}