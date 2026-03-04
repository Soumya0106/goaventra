export function stripPackageTitleSuffix(title: string): string {
  return title
    .replace(/\s*-\s*International/gi, "")
    .replace(/\s*-\s*Advance Booking/gi, "")
    .trim();
}

export function packageTitleToSlug(title: string): string {
  return stripPackageTitleSuffix(title)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function packageToDetailsPath(pkg: {
  title: string;
}): string {
  const slug = packageTitleToSlug(pkg.title);
  if (
    slug === "chardham-yatra" ||
    slug === "chardham-yatra-2026" ||
    slug === "char-dham"
  ) {
    return "/chardham-yatra";
  }
  return `/packages/${slug}`;
}
