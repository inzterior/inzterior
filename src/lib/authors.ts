export type AuthorId = "billy-yeap" | "jackie-yap";

export const AUTHORS: Record<AuthorId, { name: string; role: string; href: string }> = {
  "billy-yeap": {
    name: "Billy Yeap",
    role: "Founder & Principal Designer",
    href: "/team",
  },
  "jackie-yap": {
    name: "Jackie Yap",
    role: "Co-founder",
    href: "/team",
  },
};
