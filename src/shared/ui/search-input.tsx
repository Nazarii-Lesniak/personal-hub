"use client";

import { Search, X } from "lucide-react";
import type { ComponentProps, KeyboardEvent } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export interface SearchInputProps
  extends Omit<ComponentProps<typeof Input>, "value" | "onChange" | "type"> {
  value: string;
  onValueChange: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  containerClassName?: string;
}

export function SearchInput({
  value,
  onValueChange,
  onClear,
  clearLabel = "Clear",
  placeholder = "Search...",
  className,
  containerClassName,
  onKeyDown,
  ...props
}: SearchInputProps) {
  const hasValue = value.length > 0;

  const handleClear = () => {
    onValueChange("");
    onClear?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && hasValue) {
      event.preventDefault();
      handleClear();
    }

    onKeyDown?.(event);
  };

  return (
    <div
      className={cn("relative flex w-full items-center", containerClassName)}
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        {...props}
      />
      {hasValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          aria-label={clearLabel}
          className="absolute right-1 size-7 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
