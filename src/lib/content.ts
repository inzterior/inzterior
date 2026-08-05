export const PAYMENT_STAGES = [
  {
    n: 1,
    title: "Design Deposit (~10%)",
    body: "Starts the design phase. This is the only payment due before any design work begins — nothing is asked for upfront beyond it.",
  },
  {
    n: 2,
    title: "Design Sign-off",
    body: "Due once you've approved the final design and material selections — not before.",
  },
  {
    n: 3,
    title: "Materials & Carpentry",
    body: "Due when materials are ordered and carpentry production begins.",
  },
  {
    n: 4,
    title: "On-Site Installation",
    body: "Due as on-site work is carried out — matched to what's physically been installed.",
  },
  {
    n: 5,
    title: "Handover",
    body: "The final payment, due at practical completion and handover of the finished space.",
  },
] as const;
