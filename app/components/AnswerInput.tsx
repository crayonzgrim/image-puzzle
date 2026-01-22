'use client';

import { useState } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

interface AnswerInputProps {
  onSubmit: (answer: string) => boolean;
  disabled?: boolean;
}

export function AnswerInput({ onSubmit, disabled }: AnswerInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isWrong, setIsWrong] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;

    const isCorrect = onSubmit(value.trim());
    if (!isCorrect) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('game.play.answerPlaceholder')}
            disabled={disabled}
            className={`
              w-full px-4 py-3 sm:py-4
              text-base sm:text-lg
              rounded-2xl
              bg-white/90 backdrop-blur-sm
              border-3
              outline-none
              transition-all duration-300
              placeholder:text-gray-400
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                isWrong
                  ? 'border-red-500 animate-shake bg-red-50'
                  : 'border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200'
              }
            `}
            style={{
              boxShadow: isWrong
                ? '0 0 20px rgba(239, 68, 68, 0.5)'
                : '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
          />

          {/* Wrong answer X mark */}
          {isWrong && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-2xl animate-bounce">
              ✕
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="
            px-6 sm:px-8 py-3 sm:py-4
            bg-gradient-to-r from-green-400 to-emerald-500
            text-white font-bold
            text-base sm:text-lg
            rounded-2xl
            transition-all duration-300
            hover:scale-105 hover:shadow-lg
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
          style={{
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
          }}
        >
          {t('game.play.submitAnswer')}
        </button>
      </div>
    </form>
  );
}
