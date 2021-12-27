import { format } from "date-fns";

const getLocale = (locale: string) =>
  import(`date-fns/locale/${locale}/index.js`);

export const formatDate = async (date: Date | number, formatStyle: string, locale = "en-US") => {
  return format(date, formatStyle, {
    locale: await getLocale(locale),
  });
};
