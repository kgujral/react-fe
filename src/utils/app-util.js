import Bro from "brototype";
import { NotificationManager } from "react-notifications";
import { t } from "./i18n";

export const DEFAULT_ERROR_CALLBACK = error => {
  NotificationManager.error(
    Bro(error).iCanHaz("response.data.errorMessage") || t("error.generic"),
    "",
    8000
  );
};

export const SHOW_ERROR_NOTIFICATION = error => {
  NotificationManager.error(error, "", 8000);
};

export const SHOW_INFO_NOTIFICATION = (msg, time = 8000) => {
  NotificationManager.info(msg, "", time);
};

export const SHOW_SUCCESS_NOTIFICATION = msg => {
  NotificationManager.success(msg, "", 8000);
};

export const SCROLL_TO_ELEMENT = elemid => {
  const target = window.$(elemid);
  window.$("html, body").animate(
    {
      scrollTop: target.offset().top
    },
    400
  );
  return null;
};

export const SCROLL_TO_BOTTOM = () => {
  window.$("html, body").animate(
    {
      scrollTop: window.$(document).height()
    },
    400
  );
  return null;
};

export const SCROLL_TO_TOP = () => {
  window.scrollTo(0, 0);
  return null;
};
