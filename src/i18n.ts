import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "de"] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === "en"
        ? import("../messages/en.json")
        : import(`../messages/${locale}.json`))
    ).default,
  };
});
