import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  localePrefix: "always",
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },

  publicRoutes: [
    "/:locale/sign-in",
    "/:locale/sign-up",
    "/:locale/sign-in/sso-callback",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
