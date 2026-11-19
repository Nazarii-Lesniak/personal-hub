"use client";

import { cn } from "@/shared/lib/utils";
import { SearchInput } from "@/shared/ui/search-input";

import type { UrlSearchBarProps } from "../model/filter-items.types";
import { useUrlSearch } from "../model/use-url-search";

export function UrlSearchBar({
  paramKey = "q",
  debounceMs = 300,
  placeholder = "Search...",
  ariaLabel = "Search",
  className,
}: UrlSearchBarProps) {
  const { query, setQuery, isPending } = useUrlSearch({
    paramKey,
    debounceMs,
  });

  return (
    <SearchInput
      value={query}
      onValueChange={setQuery}
      placeholder={placeholder}
      aria-label={ariaLabel}
      containerClassName={cn("max-w-sm", className)}
      className={cn(isPending && "opacity-50")}
    />
  );
}
