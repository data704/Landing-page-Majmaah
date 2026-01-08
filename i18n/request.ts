import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale: Locale = hasLocale(routing.locales, requested)
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
