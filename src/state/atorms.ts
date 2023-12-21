import { atom } from "recoil";

export const applyThemeState = atom<"light" | "dark">({
  key: "applyTheme",
  default: "light",
});
