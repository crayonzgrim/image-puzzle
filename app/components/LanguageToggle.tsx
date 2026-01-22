'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

export function LanguageToggle() {
  const { locale, toggleLocale, isHydrated } = useTranslation();

  if (!isHydrated) {
    return (
      <div className="w-16 h-8 rounded-full bg-purple-200 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleLocale}
      className="
        flex items-center gap-1.5
        px-3 py-1.5
        bg-white/80 backdrop-blur-sm
        rounded-full
        border-2 border-purple-200
        transition-all duration-300
        hover:border-purple-400 hover:scale-105
        active:scale-95
      "
      aria-label="Toggle language"
    >
      <span className={`text-sm transition-opacity ${locale === 'ko' ? 'opacity-100' : 'opacity-50'}`}>
        🇰🇷
      </span>
      <div
        className={`
          w-8 h-5 rounded-full
          bg-gradient-to-r from-pink-400 to-purple-400
          relative
          transition-all duration-300
        `}
      >
        <div
          className={`
            absolute top-0.5 w-4 h-4
            bg-white rounded-full
            shadow-md
            transition-all duration-300
            ${locale === 'en' ? 'left-3.5' : 'left-0.5'}
          `}
        />
      </div>
      <span className={`text-sm transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-50'}`}>
        🇺🇸
      </span>
    </button>
  );
}
