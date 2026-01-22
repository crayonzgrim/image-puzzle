'use client';

import { useState, useCallback } from 'react';
import type { Card, GameConfig, GamePhase } from '@/app/types/game';

interface UseGameOptions {
  totalCards: number;
  answer: string;
}

interface UseGameReturn {
  cards: Card[];
  phase: GamePhase;
  revealedCount: number;
  revealCard: (index: number) => void;
  checkAnswer: (userAnswer: string) => boolean;
  revealAll: () => void;
  reset: () => void;
}

function createCards(count: number): Card[] {
  return Array.from({ length: count }, (_, i) => ({
    index: i,
    isRevealed: false,
  }));
}

export function useGame({ totalCards, answer }: UseGameOptions): UseGameReturn {
  const [cards, setCards] = useState<Card[]>(() => createCards(totalCards));
  const [phase, setPhase] = useState<GamePhase>('playing');

  const revealedCount = cards.filter((c) => c.isRevealed).length;

  const revealCard = useCallback((index: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.index === index ? { ...card, isRevealed: true } : card
      )
    );
  }, []);

  const checkAnswer = useCallback(
    (userAnswer: string): boolean => {
      const normalizedUser = userAnswer.trim().toLowerCase();
      const normalizedAnswer = answer.trim().toLowerCase();
      const isCorrect = normalizedUser === normalizedAnswer;

      if (isCorrect) {
        setPhase('success');
        setCards((prev) => prev.map((card) => ({ ...card, isRevealed: true })));
      }

      return isCorrect;
    },
    [answer]
  );

  const revealAll = useCallback(() => {
    setCards((prev) => prev.map((card) => ({ ...card, isRevealed: true })));
  }, []);

  const reset = useCallback(() => {
    setCards(createCards(totalCards));
    setPhase('playing');
  }, [totalCards]);

  return {
    cards,
    phase,
    revealedCount,
    revealCard,
    checkAnswer,
    revealAll,
    reset,
  };
}

// Game config store for passing between pages
let gameConfigStore: GameConfig | null = null;

export function setGameConfig(config: GameConfig) {
  gameConfigStore = config;
}

export function getGameConfig(): GameConfig | null {
  return gameConfigStore;
}

export function clearGameConfig() {
  gameConfigStore = null;
}
