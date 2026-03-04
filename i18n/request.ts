// import { getRequestConfig } from 'next-intl/server';
// import { hasLocale } from 'next-intl';
// import { routing } from './routing';

// type Locale = (typeof routing.locales)[number];

// export default getRequestConfig(async ({ requestLocale }) => {
//   const requested = await requestLocale;

//   const locale: Locale = hasLocale(routing.locales, requested)
//     ? (requested as Locale)
//     : routing.defaultLocale;
//   // console.log('locale :>> ', locale);
//   const messages = (await import(`../messages/${locale}/${locale}.json`)).default;
//     const commonMessages = await import(`../messages/${locale}/common.json`)
//   // console.log('messages :>> ', messages);
//   // console.log('commonMessages :>> ', commonMessages);
//   return {
//     locale,
//     messages: {
//       ...messages,
//       ...commonMessages
//     }
//   };
// });

import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale: Locale = hasLocale(routing.locales, requested)
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
  };
});
