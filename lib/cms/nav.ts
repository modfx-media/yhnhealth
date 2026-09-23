import type { NavChild, NavItem } from "@/lib/navigation";
import type { Header } from "@/payload-types";

export function headerToNavItems(header: Header | null): NavItem[] | undefined {
  if (!header?.nav?.length) return undefined;
  return header.nav
    .filter((item) => item.label)
    .map((item) => ({
      label: item.label as string,
      href: item.href || null,
      children: (item.children || []).flatMap((child): NavChild[] => {
        if (!child.label) return [];
        const nested = (child.children || []).flatMap((leaf) =>
          leaf.label && leaf.href ? [{ label: leaf.label, href: leaf.href }] : [],
        );
        if (nested.length) {
          return [{ label: child.label, href: child.href || undefined, children: nested }];
        }
        if (!child.href) return [];
        return [{ label: child.label, href: child.href }];
      }),
    }));
}
