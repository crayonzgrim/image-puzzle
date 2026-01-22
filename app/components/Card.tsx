'use client';

interface CardProps {
  index: number;
  isRevealed: boolean;
  onClick: () => void;
  disabled?: boolean;
  totalCards: number;
}

const NEON_COLORS = [
  'from-pink-400 to-pink-600',
  'from-cyan-400 to-cyan-600',
  'from-yellow-400 to-yellow-500',
  'from-lime-400 to-lime-600',
  'from-purple-400 to-purple-600',
  'from-orange-400 to-orange-600',
];

export function Card({ index, isRevealed, onClick, disabled, totalCards }: CardProps) {
  const colorIndex = index % NEON_COLORS.length;
  const gradientClass = NEON_COLORS[colorIndex];

  // Adjust styles based on grid size
  const isMediumGrid = totalCards <= 25; // 5x5 or smaller
  const isLargeGrid = totalCards > 25;

  const borderRadius = isLargeGrid ? 'rounded-lg' : isMediumGrid ? 'rounded-xl' : 'rounded-2xl';
  const fontSize = isLargeGrid ? 'text-xs' : isMediumGrid ? 'text-sm' : 'text-lg sm:text-xl';

  return (
    <button
      onClick={onClick}
      disabled={isRevealed || disabled}
      className={`
        relative w-full h-full ${borderRadius}
        flex items-center justify-center
        transition-all duration-500 ease-out
        transform-gpu
        ${
          isRevealed
            ? 'opacity-0 scale-75 pointer-events-none'
            : `bg-gradient-to-br ${gradientClass}
               hover:scale-110
               active:scale-95
               shadow-lg hover:shadow-2xl
               cursor-pointer`
        }
      `}
      style={{
        boxShadow: isRevealed
          ? 'none'
          : `0 0 15px rgba(255, 255, 255, 0.2),
             0 4px 10px rgba(0, 0, 0, 0.2)`,
      }}
      aria-label={`Card ${index + 1}`}
    >
      {!isRevealed && (
        <>
          {/* Shine effect */}
          <div className={`absolute inset-0 ${borderRadius} overflow-hidden`}>
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-shine" />
          </div>

          {/* Card number */}
          <span
            className={`
              relative z-10
              text-white font-black
              ${fontSize}
              drop-shadow-lg
            `}
            style={{
              textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
            }}
          >
            {index + 1}
          </span>

          {/* Border glow */}
          <div
            className={`
              absolute inset-0 ${borderRadius}
              border border-white/30
            `}
          />
        </>
      )}
    </button>
  );
}
