export type GamePhase = 'setup' | 'playing' | 'success';

export interface GridSize {
  rows: number;
  cols: number;
}

export interface GameConfig {
  imageUrl: string;
  answer: string;
  gridSize: GridSize;
}

export interface Card {
  index: number;
  isRevealed: boolean;
}

export interface GameState {
  phase: GamePhase;
  cards: Card[];
  config: GameConfig | null;
  revealedCount: number;
}

export type Locale = 'ko' | 'en';
