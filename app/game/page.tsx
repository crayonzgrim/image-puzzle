'use client';

import { AnswerInput } from '@/app/components/AnswerInput';
import { Confetti } from '@/app/components/Confetti';
import { GameBoard } from '@/app/components/GameBoard';
import { LanguageToggle } from '@/app/components/LanguageToggle';
import { ResultModal } from '@/app/components/ResultModal';
import { clearGameConfig, getGameConfig, useGame } from '@/app/hooks/useGame';
import { useTranslation } from '@/app/hooks/useTranslation';
import type { GameConfig } from '@/app/types/game';
import { useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';

// For getting config synchronously
function subscribeToConfig() {
  return () => { };
}

function getConfigSnapshot(): GameConfig | null {
  return getGameConfig();
}

function getConfigServerSnapshot(): GameConfig | null {
  return null;
}

export default function GamePage() {
  const router = useRouter();
  const { t, isHydrated } = useTranslation();
  const config = useSyncExternalStore(subscribeToConfig, getConfigSnapshot, getConfigServerSnapshot);
  const [showGaveUpModal, setShowGaveUpModal] = useState(false);

  // Redirect if no config (client-side only)
  if (isHydrated && !config) {
    router.replace('/');
  }

  const totalCards = config ? config.gridSize.rows * config.gridSize.cols : 0;

  const { cards, phase, revealedCount, revealCard, checkAnswer, revealAll } = useGame({
    totalCards,
    answer: config?.answer || '',
  });

  const handlePlayAgain = () => {
    clearGameConfig();
    router.push('/');
  };

  const handleGiveUp = () => {
    revealAll();
    setShowGaveUpModal(true);
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-200 via-pink-100 to-cyan-100 flex items-center justify-center">
        <div className="text-2xl text-purple-600 animate-pulse">
          {isHydrated ? t('common.loading') : '로딩 중...'}
        </div>
      </div>
    );
  }

  const remainingCards = totalCards - revealedCount;
  const isGameOver = phase === 'success' || showGaveUpModal;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-200 via-pink-100 to-cyan-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-cyan-300/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-300/30 rounded-full blur-3xl animate-float" />
      </div>

      {/* Confetti */}
      <Confetti trigger={phase === 'success'} />

      {/* Header */}
      <header className="relative z-10 pt-4 sm:pt-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handlePlayAgain}
            className="
              flex items-center gap-2
              px-3 py-2
              bg-white/80 backdrop-blur-sm
              rounded-full
              border-2 border-purple-200
              text-purple-600 font-medium
              transition-all duration-300
              hover:border-purple-400 hover:scale-105
              active:scale-95
            "
          >
            <span>←</span>
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Cards remaining badge */}
          <div
            className="
              flex items-center gap-2
              px-4 py-2
              bg-linear-to-r from-yellow-200 to-orange-200
              rounded-full
              shadow-md
            "
          >
            <span className="text-xl">🃏</span>
            <span className="text-orange-700 font-bold">
              {isHydrated ? t('game.play.cardsRemaining') : '남은 카드'}:{' '}
              <span className="text-2xl">{remainingCards}</span>
              {isHydrated ? t('game.play.cards') : '개'}
            </span>
          </div>

          {/* Language toggle */}
          <LanguageToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Hint */}
          <p className="text-center text-purple-600 font-medium animate-pulse">
            {isHydrated ? t('game.play.hint') : '카드를 터치해서 이미지를 확인하세요!'} 👆
          </p>

          {/* Game board */}
          <GameBoard
            imageUrl={config.imageUrl}
            cards={cards}
            gridSize={config.gridSize}
            onCardClick={revealCard}
            disabled={isGameOver}
          />

          {/* Answer input */}
          <div className="pt-4">
            <AnswerInput onSubmit={checkAnswer} disabled={isGameOver} />
          </div>

          {/* Give up button */}
          {!isGameOver && (
            <div className="text-center pt-4">
              <button
                onClick={handleGiveUp}
                className="
                  group
                  inline-flex items-center gap-2
                  px-5 py-2.5
                  text-sm font-medium
                  text-gray-400 hover:text-white
                  bg-gray-100 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500
                  border-2 border-gray-200 hover:border-transparent
                  rounded-full
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                  hover:scale-105 active:scale-95
                "
              >
                <span className="group-hover:animate-pulse">🏳️</span>
                {isHydrated ? t('game.play.giveUp') : '포기하기'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      {phase === 'success' && (
        <ResultModal type="success" onPlayAgain={handlePlayAgain} />
      )}

      {/* Gave Up Modal */}
      {showGaveUpModal && phase !== 'success' && (
        <ResultModal
          type="gaveUp"
          answer={config.answer}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {/* Footer decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400" />
    </div>
  );
}
