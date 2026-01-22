'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import ko from '@/app/i18n/ko.json';
import en from '@/app/i18n/en.json';
import type { Locale } from '@/app/types/game';

type Translations = typeof ko;

const translations: Record<Locale, Translations> = { ko, en };

function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'ko';

  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('ko') ? 'ko' : 'en';
}

// For hydration detection
function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

interface TranslationContextValue {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isHydrated: boolean;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const isHydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'ko';
    return getBrowserLocale();
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: unknown = translations[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      if (typeof value !== 'string') {
        return key;
      }

      if (params) {
        return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
          return String(params[paramKey] ?? `{{${paramKey}}}`);
        });
      }

      return value;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'ko' ? 'en' : 'ko');
  }, [locale, setLocale]);

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale, toggleLocale, isHydrated }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
