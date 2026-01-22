'use client';

import { useTranslation } from '@/app/hooks/useTranslation';

interface ResultModalProps {
  type: 'success' | 'gaveUp';
  answer?: string;
  onPlayAgain: () => void;
}

export function ResultModal({ type, answer, onPlayAgain }: ResultModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`
          relative
          w-full max-w-md
          p-6 sm:p-8
          rounded-3xl
          text-center
          animate-pop-in
          ${
            type === 'success'
              ? 'bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100'
              : 'bg-gradient-to-br from-gray-100 to-blue-100'
          }
        `}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Decorative elements */}
        {type === 'success' && (
          <>
            <div className="absolute -top-6 -left-6 text-5xl animate-bounce">🎉</div>
            <div className="absolute -top-6 -right-6 text-5xl animate-bounce delay-100">🎊</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl animate-bounce delay-200">
              ⭐
            </div>
          </>
        )}

        {/* Icon */}
        <div className="text-6xl sm:text-7xl mb-4">
          {type === 'success' ? '🏆' : '😢'}
        </div>

        {/* Title */}
        <h2
          className={`
            text-2xl sm:text-3xl font-black mb-2
            ${type === 'success' ? 'text-purple-600' : 'text-gray-600'}
          `}
        >
          {t(`game.result.${type}.title`)}
        </h2>

        {/* Message */}
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          {type === 'success' ? (
            t('game.result.success.message')
          ) : (
            <>
              {t('game.result.gaveUp.message')}{' '}
              <span className="font-bold text-purple-600">&quot;{answer}&quot;</span>
              {t('game.result.gaveUp.was')}
            </>
          )}
        </p>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="
            w-full py-4
            bg-gradient-to-r from-pink-500 to-purple-500
            text-white font-bold text-lg sm:text-xl
            rounded-2xl
            transition-all duration-300
            hover:scale-105 hover:shadow-lg
            active:scale-95
          "
        >
          {t(`game.result.${type}.playAgain`)} 🔄
        </button>
      </div>
    </div>
  );
}
