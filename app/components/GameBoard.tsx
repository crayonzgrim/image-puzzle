'use client';

import { Card } from './Card';
import type { Card as CardType } from '@/app/types/game';

interface GameBoardProps {
  imageUrl: string;
  cards: CardType[];
  gridSize: { rows: number; cols: number };
  onCardClick: (index: number) => void;
  disabled?: boolean;
}

export function GameBoard({
  imageUrl,
  cards,
  gridSize,
  onCardClick,
  disabled,
}: GameBoardProps) {
  const allRevealed = cards.every((c) => c.isRevealed);
  const totalCards = gridSize.rows * gridSize.cols;

  // Adjust gap and padding based on grid size
  const maxDimension = Math.max(gridSize.rows, gridSize.cols);
  const gap = maxDimension <= 3 ? '6px' : maxDimension <= 5 ? '4px' : maxDimension <= 7 ? '3px' : '2px';
  const padding = maxDimension <= 3 ? 'p-3 sm:p-4' : maxDimension <= 5 ? 'p-2 sm:p-3' : 'p-1.5 sm:p-2';

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Aspect ratio container */}
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
        {/* Background image */}
        <div
          className={`
            absolute inset-0
            bg-cover bg-center bg-no-repeat
            transition-all duration-700
            ${allRevealed ? 'scale-100' : 'scale-105 blur-[2px]'}
          `}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Gradient overlay for better card visibility */}
        {!allRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        )}

        {/* Card grid overlay */}
        <div
          className={`relative w-full h-full ${padding}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            gap,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.index}
              index={card.index}
              isRevealed={card.isRevealed}
              onClick={() => onCardClick(card.index)}
              disabled={disabled}
              totalCards={totalCards}
            />
          ))}
        </div>

        {/* Decorative border */}
        <div className="absolute inset-0 rounded-3xl border-4 border-white/20 pointer-events-none" />
      </div>
    </div>
  );
}
