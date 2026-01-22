'use client';

import { useTranslation } from '@/app/hooks/useTranslation';
import type { GameConfig, GridSize } from '@/app/types/game';
import { useRef, useState } from 'react';

interface GameSetupProps {
  onStart: (config: GameConfig) => void;
}

const MIN_GRID = 2;
const MAX_GRID = 10;

export function GameSetup({ onStart }: GameSetupProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [gridSize, setGridSize] = useState<GridSize>({ rows: 3, cols: 3 });
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview && answer.trim()) {
      onStart({
        imageUrl: imagePreview,
        answer: answer.trim(),
        gridSize,
      });
    }
  };

  const totalCards = gridSize.rows * gridSize.cols;
  const isValid = imagePreview && answer.trim();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6 sm:space-y-8">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-lg sm:text-xl font-bold text-purple-700">
          {t('game.setup.uploadImage')}
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative cursor-pointer
            rounded-3xl overflow-hidden
            transition-all duration-300
            ${isDragging
              ? 'ring-4 ring-pink-400 scale-[1.02]'
              : 'hover:ring-4 hover:ring-purple-300'
            }
          `}
        >
          {imagePreview ? (
            <div className="relative aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {t('game.setup.changeImage')}
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`
                aspect-video
                flex flex-col items-center justify-center gap-4
                bg-linear-to-br from-purple-100 to-pink-100
                border-3 border-dashed rounded-3xl
                ${isDragging ? 'border-pink-400 bg-pink-50' : 'border-purple-300'}
              `}
            >
              <div className="text-5xl sm:text-6xl animate-bounce">🖼️</div>
              <p className="text-purple-600 text-center px-4 text-sm sm:text-base">
                {t('game.setup.uploadHint')}
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Answer Input */}
      <div className="space-y-2">
        <label className="block text-lg sm:text-xl font-bold text-purple-700">
          {t('game.setup.enterAnswer')}
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={t('game.setup.answerPlaceholder')}
          className="
            w-full px-4 py-3 sm:py-4
            text-base sm:text-lg
            rounded-2xl
            bg-white
            border-3 border-purple-200
            outline-none
            transition-all duration-300
            focus:border-purple-500 focus:ring-4 focus:ring-purple-100
            placeholder:text-gray-400
          "
        />
        <p className="text-sm text-purple-500 pl-2">
          {t('game.setup.answerHint')}
        </p>
      </div>

      {/* Grid Size */}
      <div className="space-y-4">
        <label className="block text-lg sm:text-xl font-bold text-purple-700">
          {t('game.setup.gridSize')}
        </label>

        {/* Labels row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <span className="w-32 sm:w-36 text-center text-sm text-purple-600 font-medium">
            {t('game.setup.rows')}
          </span>
          <span className="w-6" />
          <span className="w-32 sm:w-36 text-center text-sm text-purple-600 font-medium">
            {t('game.setup.cols')}
          </span>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {/* Rows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() =>
                setGridSize((prev) => ({
                  ...prev,
                  rows: Math.max(MIN_GRID, prev.rows - 1),
                }))
              }
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-400 text-white font-bold text-xl hover:bg-pink-500 active:scale-95 transition-all"
            >
              -
            </button>
            <span className="w-8 sm:w-10 text-center text-xl sm:text-2xl font-bold text-purple-700">
              {gridSize.rows}
            </span>
            <button
              type="button"
              onClick={() =>
                setGridSize((prev) => ({
                  ...prev,
                  rows: Math.min(MAX_GRID, prev.rows + 1),
                }))
              }
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-400 text-white font-bold text-xl hover:bg-cyan-500 active:scale-95 transition-all"
            >
              +
            </button>
          </div>

          {/* X symbol */}
          <span className="text-2xl font-bold text-purple-400">×</span>

          {/* Cols */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() =>
                setGridSize((prev) => ({
                  ...prev,
                  cols: Math.max(MIN_GRID, prev.cols - 1),
                }))
              }
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pink-400 text-white font-bold text-xl hover:bg-pink-500 active:scale-95 transition-all"
            >
              -
            </button>
            <span className="w-8 sm:w-10 text-center text-xl sm:text-2xl font-bold text-purple-700">
              {gridSize.cols}
            </span>
            <button
              type="button"
              onClick={() =>
                setGridSize((prev) => ({
                  ...prev,
                  cols: Math.min(MAX_GRID, prev.cols + 1),
                }))
              }
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-400 text-white font-bold text-xl hover:bg-cyan-500 active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* Preview badge */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-yellow-200 to-orange-200 rounded-full">
            <span className="text-orange-600 font-medium">{t('game.setup.preview')}:</span>
            <span className="text-orange-700 font-bold text-lg">
              {totalCards} {t('game.setup.cards')}
            </span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`
          w-full py-4 sm:py-5
          text-xl sm:text-2xl font-bold
          rounded-3xl
          transition-all duration-300
          ${isValid
            ? 'bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] animate-gradient-x'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
        style={{
          boxShadow: isValid ? '0 8px 30px rgba(168, 85, 247, 0.4)' : 'none',
        }}
      >
        {t('game.setup.startGame')} 🎮
      </button>
    </form>
  );
}
