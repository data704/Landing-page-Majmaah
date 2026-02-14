export type NavbarProps = {
  label: string;
  href: string;
  id: number;
  children?: NavbarProps[];
  modalOpen?: boolean;
};

export const navbarItems: NavbarProps[] = [
  { id: 1, label: "contact-label", href: "/", modalOpen: true },
  {
    id: 2,
    label: "solutions-label",
    href: "/",
    children: [
      { id: 2.1, label: "solutions-emission-management-label", href: "/" },
      { id: 2.2, label: "solutions-nature-based-solutions-label", href: "/" },
    ],
  },
  { id: 3, label: "see-forest-label", href: "/" },
];

export function getIsDesktop() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return !/Android|iPhone|iPad/i.test(ua);
}
