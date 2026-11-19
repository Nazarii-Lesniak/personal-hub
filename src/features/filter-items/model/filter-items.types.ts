export interface UseUrlSearchOptions {
  paramKey?: string;
  debounceMs?: number;
}

export interface UrlSearchBarProps extends UseUrlSearchOptions {
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}
