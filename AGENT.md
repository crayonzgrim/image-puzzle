# Agent Guidelines for Image Puzzle Game

이 문서는 AI 에이전트가 이 프로젝트에서 코드를 작성할 때 따라야 할 가이드라인입니다.

## Code Style

- TypeScript strict mode 준수
- Functional components with hooks
- Tailwind CSS for styling
- No inline styles (style prop 사용 금지)
- ESLint/Prettier 규칙 준수

## Component Rules

### 파일 구조
- 하나의 파일에 하나의 컴포넌트
- Props 타입은 별도 interface로 정의
- `'use client'` 지시문은 필요한 경우에만 사용

### 네이밍 컨벤션
- 컴포넌트: PascalCase (`GameBoard.tsx`)
- 훅: camelCase with `use` prefix (`useGame.ts`)
- 타입: PascalCase (`GameState`, `CardProps`)
- 상수: SCREAMING_SNAKE_CASE (`DEFAULT_GRID_SIZE`)

### 예시
```tsx
// components/Card.tsx
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
      className={`
        w-full aspect-square rounded-lg transition-all duration-300
        ${isRevealed ? 'opacity-0' : 'bg-blue-500 hover:bg-blue-600'}
      `}
    >
      {!isRevealed && <span className="text-white font-bold">{index + 1}</span>}
    </button>
  );
}
```

## State Management

- React `useState`/`useReducer` for local state
- Custom hooks for complex logic (`useGame`, `useTranslation`)
- No external state library (keep it simple)
- URL state for shareable game settings (optional)

## i18n Pattern

### 구조
```
i18n/
├── ko.json    # 한국어 (기본)
└── en.json    # 영어
```

### 사용법
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function Component() {
  const { t, locale, setLocale } = useTranslation();
  return <h1>{t('game.title')}</h1>;
}
```

### JSON 구조
```json
{
  "game": {
    "title": "이미지 퍼즐",
    "setup": {
      "uploadImage": "이미지 업로드",
      "enterAnswer": "정답 입력",
      "gridSize": "그리드 크기"
    }
  }
}
```

## Animation Guidelines

### 우선순위
1. Tailwind CSS transitions (간단한 효과)
2. CSS keyframes (복잡한 애니메이션)
3. `canvas-confetti` (축하 효과)

### 카드 플립 애니메이션
```css
.card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.card.revealed {
  transform: scale(0.95);
  opacity: 0;
}
```

### 오답 애니메이션 (X 표시)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.wrong-answer {
  animation: shake 0.3s ease-in-out;
}
```

## Testing Approach

### 필수 테스트
- 게임 로직 (`useGame` hook)
- 정답 검증 로직
- 그리드 생성 로직

### 선택적 테스트
- 컴포넌트 렌더링 (스토리북 또는 수동 테스트)
- E2E 테스트 (Playwright)

### 테스트 파일 위치
```
__tests__/
├── hooks/
│   └── useGame.test.ts
└── utils/
    └── validation.test.ts
```

## Performance Considerations

- 이미지 최적화: Next.js `Image` 컴포넌트 사용
- 그리드 렌더링: 큰 그리드(10x10+)에서 virtualization 고려
- 애니메이션: `transform`/`opacity` 사용 (layout thrashing 방지)

## Accessibility

- 키보드 네비게이션 지원 (Tab, Enter, Space)
- ARIA labels for interactive elements
- 충분한 색상 대비
- 스크린 리더 지원
