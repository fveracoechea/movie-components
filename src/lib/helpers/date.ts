import { format } from "date-fns";

const getLocale = (locale: string) =>
  import(`date-fns/locale/${locale}/index.js`);

export const formatDate = async (
  date: Date | number,
  formatStyle: string,
  locale = "en-US"
) => {
  return format(date, formatStyle, {
    locale: await getLocale(locale),
  });
};

export function timeConvert(n: number) {
  const hours = n / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
}
