'use client';

import { useRouter } from 'next/navigation';
import { GameSetup } from '@/app/components/GameSetup';
import { KakaoAdFit } from '@/app/components/KakaoAdFit';
import { LanguageToggle } from '@/app/components/LanguageToggle';
import { useTranslation } from '@/app/hooks/useTranslation';
import { setGameConfig } from '@/app/hooks/useGame';
import type { GameConfig } from '@/app/types/game';

export default function Home() {
  const router = useRouter();
  const { t, isHydrated } = useTranslation();

  const handleStart = (config: GameConfig) => {
    setGameConfig(config);
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-cyan-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-cyan-300/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-purple-300/30 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 sm:pt-8 px-4">
        <div className="max-w-lg mx-auto flex justify-end">
          <LanguageToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-lg mx-auto">
          {/* Title */}
          <div className="text-center py-8 sm:py-12">
            <h1
              className="
                text-4xl sm:text-5xl md:text-6xl
                font-black
                bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
                bg-clip-text text-transparent
                animate-gradient-x
                drop-shadow-sm
              "
            >
              {isHydrated ? t('game.title') : '이미지 퍼즐'}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-purple-600 font-medium">
              {isHydrated ? t('game.subtitle') : '숨겨진 이미지를 맞춰보세요!'}
            </p>

            {/* Cute decorations */}
            <div className="flex justify-center gap-3 mt-4 text-2xl sm:text-3xl">
              <span className="animate-bounce">🧩</span>
              <span className="animate-bounce delay-100">🎨</span>
              <span className="animate-bounce delay-200">✨</span>
            </div>
          </div>

          {/* Setup form */}
          <GameSetup onStart={handleStart} />

          {/* Ad banner */}
          <div className="mt-8 flex justify-center">
            <KakaoAdFit
              unit="DAN-OcTSWfyo9pmOfUWQ"
              width={320}
              height={100}
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </main>

      {/* Vertical ad - desktop only */}
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-20">
        <KakaoAdFit
          unit="DAN-DRr5ft19fdYTymgX"
          width={160}
          height={600}
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>

      {/* Footer decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400" />
    </div>
  );
}
