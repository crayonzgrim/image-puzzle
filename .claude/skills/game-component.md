# Game Component Generation Skill

게임 관련 컴포넌트를 생성할 때 따라야 할 패턴과 가이드라인입니다.

## Component Templates

### GameSetup Component
이미지, 정답, 그리드 크기를 입력받는 설정 컴포넌트

```tsx
'use client';

import { useState, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface GameSetupProps {
  onStart: (config: GameConfig) => void;
}

interface GameConfig {
  imageUrl: string;
  answer: string;
  gridSize: { rows: number; cols: number };
}

export function GameSetup({ onStart }: GameSetupProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview && answer.trim()) {
      onStart({
        imageUrl: imagePreview,
        answer: answer.trim(),
        gridSize: { rows, cols },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image upload */}
      {/* Answer input */}
      {/* Grid size selectors */}
      {/* Start button */}
    </form>
  );
}
```

### GameBoard Component
그리드 카드를 표시하고 게임 상태를 관리하는 컴포넌트

```tsx
'use client';

import { Card } from './Card';
import { useGame } from '@/hooks/useGame';

interface GameBoardProps {
  imageUrl: string;
  answer: string;
  gridSize: { rows: number; cols: number };
}

export function GameBoard({ imageUrl, answer, gridSize }: GameBoardProps) {
  const { cards, revealCard, checkAnswer, gameState } = useGame({
    totalCards: gridSize.rows * gridSize.cols,
    answer,
  });

  return (
    <div className="relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Card grid overlay */}
      <div
        className="relative grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            isRevealed={card.isRevealed}
            onClick={() => revealCard(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Card Component
개별 카드 컴포넌트 (클릭 시 사라지는 애니메이션)

```tsx
'use client';

interface CardProps {
  index: number;
  isRevealed: boolean;
  onClick: () => void;
}

export function Card({ index, isRevealed, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={`
        w-full aspect-square rounded-lg
        transition-all duration-300 ease-out
        ${isRevealed
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 shadow-lg'
        }
      `}
      aria-label={`Card ${index + 1}`}
    >
      {!isRevealed && (
        <span className="text-white font-bold text-xl">
          {index + 1}
        </span>
      )}
    </button>
  );
}
```

### AnswerInput Component
정답 입력 폼 (항상 표시, 무제한 시도)

```tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

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
    const isCorrect = onSubmit(value.trim());
    if (!isCorrect) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('game.answerPlaceholder')}
        disabled={disabled}
        className={`
          flex-1 px-4 py-2 rounded-lg border-2
          ${isWrong ? 'animate-shake border-red-500' : 'border-gray-300'}
        `}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {t('game.submit')}
      </button>
    </form>
  );
}
```

## useGame Hook Pattern

```tsx
// hooks/useGame.ts
import { useState, useCallback } from 'react';

interface Card {
  index: number;
  isRevealed: boolean;
}

type GameState = 'playing' | 'success';

interface UseGameOptions {
  totalCards: number;
  answer: string;
}

export function useGame({ totalCards, answer }: UseGameOptions) {
  const [cards, setCards] = useState<Card[]>(
    Array.from({ length: totalCards }, (_, i) => ({
      index: i,
      isRevealed: false,
    }))
  );
  const [gameState, setGameState] = useState<GameState>('playing');

  const revealCard = useCallback((index: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.index === index ? { ...card, isRevealed: true } : card
      )
    );
  }, []);

  const checkAnswer = useCallback(
    (userAnswer: string): boolean => {
      const isCorrect = userAnswer.toLowerCase() === answer.toLowerCase();
      if (isCorrect) {
        setGameState('success');
        setCards((prev) => prev.map((card) => ({ ...card, isRevealed: true })));
      }
      return isCorrect;
    },
    [answer]
  );

  const revealAll = useCallback(() => {
    setCards((prev) => prev.map((card) => ({ ...card, isRevealed: true })));
  }, []);

  return {
    cards,
    gameState,
    revealCard,
    checkAnswer,
    revealAll,
  };
}
```

## Animation CSS Classes

```css
/* globals.css에 추가 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
```

## Confetti Integration

```tsx
// components/Confetti.tsx
'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
}

export function Confetti({ trigger }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [trigger]);

  return null;
}
```
