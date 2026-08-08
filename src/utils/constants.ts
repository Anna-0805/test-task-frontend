export const DAYS_EN: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface MenuItem {
  to: string;
  label: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { to: "/orders", label: "Orders" },
  { to: "/groups", label: "Groups" },
  { to: "/products", label: "Products" },
  { to: "/users", label: "Users" },
  { to: "/settings", label: "Settings" },
];