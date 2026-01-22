'use client';

import { TranslationProvider } from '@/app/hooks/useTranslation';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
