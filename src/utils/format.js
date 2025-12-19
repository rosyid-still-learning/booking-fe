export function formatCategory(category) {
  if (!category) return "-";

  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
