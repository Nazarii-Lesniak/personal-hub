export function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase();
}

export function getSearchTokens(query: string) {
  const normalized = normalizeSearchQuery(query);

  if (!normalized) {
    return [];
  }

  return normalized.split(/\s+/);
}

export function matchesSearchTokens(
  fields: ReadonlyArray<string | null | undefined>,
  tokens: readonly string[],
) {
  if (tokens.length === 0) {
    return true;
  }

  const haystack = fields
    .filter((field): field is string => Boolean(field?.trim()))
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => haystack.includes(token.toLowerCase()));
}

export function filterItemsByQuery<T>(
  items: readonly T[],
  query: string,
  getSearchFields: (item: T) => ReadonlyArray<string | null | undefined>,
): T[] {
  const tokens = getSearchTokens(query);

  if (tokens.length === 0) {
    return [...items];
  }

  return items.filter((item) =>
    matchesSearchTokens(getSearchFields(item), tokens),
  );
}
