"use client";

import { useEffect, useRef } from "react";

interface KakaoAdFitProps {
  unit: string;
  width: number;
  height: number;
  className?: string;
}

export function KakaoAdFit({ unit, width, height, className }: KakaoAdFitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;

    container.appendChild(script);
    isLoaded.current = true;

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none", width: "100%" }}
        data-ad-unit={unit}
        data-ad-width={width.toString()}
        data-ad-height={height.toString()}
      />
    </div>
  );
}
