"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useDebouncedValue } from "@/shared/lib/hooks/use-debounced-value";

import type { UseUrlSearchOptions } from "./filter-items.types";

export function useUrlSearch({
  paramKey = "q",
  debounceMs = 300,
}: UseUrlSearchOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const urlValue = searchParams.get(paramKey) ?? "";
  const [inputValue, setInputValue] = useState(urlValue);
  const debouncedValue = useDebouncedValue(inputValue, debounceMs);

  useEffect(() => {
    setInputValue(urlValue);
  }, [urlValue]);

  useEffect(() => {
    const normalizedInput = debouncedValue.trim();
    const normalizedUrl = urlValue.trim();

    if (normalizedInput === normalizedUrl) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (normalizedInput) {
      params.set(paramKey, normalizedInput);
    } else {
      params.delete(paramKey);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  }, [debouncedValue, paramKey, pathname, router, searchParams, urlValue]);

  return {
    query: inputValue,
    setQuery: setInputValue,
    isPending,
  };
}
