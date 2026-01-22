# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server (http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** via PostCSS plugin (`@tailwindcss/postcss`)
- **pnpm** as package manager

## Architecture

This is an App Router project using the `app/` directory convention:

- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind v4 `@import "tailwindcss"` and CSS custom properties for theming

## Tailwind CSS v4

This project uses Tailwind v4 with the new CSS-first configuration:
- No `tailwind.config.js` file - configuration is done in `globals.css`
- Uses `@theme inline` directive for custom theme values
- Custom properties `--background`, `--foreground` mapped to Tailwind utilities

## Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`)

---

## Project: Image Puzzle Game

이미지를 그리드 카드로 덮고, 카드를 하나씩 열어가며 이미지를 맞추는 게임

### Core Features
- Image upload + answer + grid size input
- Card flip animation to reveal image
- Answer validation (unlimited attempts)
- Success: Confetti celebration
- Failure: X mark animation
- i18n: Korean/English support

### Component Architecture

```
app/
├── page.tsx              # 게임 설정 화면
├── game/
│   └── page.tsx          # 게임 플레이 화면
├── components/
│   ├── GameSetup.tsx     # 이미지/정답/그리드 설정
│   ├── GameBoard.tsx     # 그리드 카드 보드
│   ├── Card.tsx          # 개별 카드 컴포넌트
│   ├── AnswerInput.tsx   # 정답 입력 폼
│   ├── ResultModal.tsx   # 결과 표시 (성공/실패)
│   └── Confetti.tsx      # 축하 효과
├── hooks/
│   └── useGame.ts        # 게임 상태 관리
├── i18n/
│   ├── ko.json           # 한국어
│   └── en.json           # 영어
└── types/
    └── game.ts           # 타입 정의
```

### Game State Flow

1. **SETUP** → 이미지, 정답, 그리드 크기 입력
2. **PLAYING** → 카드 클릭으로 공개, 정답 시도 가능
3. **SUCCESS** → Confetti + 전체 공개
4. *(FAILED 상태 없음 - 무제한 시도)*

### Key Dependencies

- `canvas-confetti` - 축하 효과
- Custom i18n hook - 다국어 지원
