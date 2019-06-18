import { Translate } from "./translations";

export const t = key => {
  const lang = (navigator.language || navigator.userLanguage || "en").split(
    "-"
  )[0];
  return Translate[lang] ? Translate[lang][key] || key : key;
};
