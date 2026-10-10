'use client';

import React, { useRef, useEffect } from 'react';

export default function TopographicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.008;
      // Smooth lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle warm golden-hour radial gradient behind
      const grad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(200, 90, 50, 0.09)');
      grad.addColorStop(0.5, 'rgba(30, 58, 47, 0.04)');
      grad.addColorStop(1, 'rgba(251, 249, 245, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw topographic elevation contours
      const lineCount = 18;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount;
        ctx.beginPath();

        // Subtle gradient stroke for contour lines
        const alpha = 0.12 + Math.sin(time + progress * Math.PI) * 0.06;
        if (i % 3 === 0) {
          ctx.strokeStyle = `rgba(200, 90, 50, ${alpha * 1.5})`; // terracotta contour
        } else {
          ctx.strokeStyle = `rgba(30, 58, 47, ${alpha})`; // forest contour
        }

        const baseRadius = 40 + i * (Math.min(width, height) / (lineCount * 1.6));

        for (let angle = 0; angle <= Math.PI * 2; angle += 0.08) {
          // Topographic noise displacement
          const noise =
            Math.sin(angle * 3 + time + i * 0.4) * 14 +
            Math.cos(angle * 5 - time * 0.7 + i) * 9 +
            Math.sin(angle * 2 + (mouseX / width) * 4) * 8;

          const r = baseRadius + noise;
          const x = width / 2 + Math.cos(angle) * r + (mouseX - width / 2) * (0.05 + progress * 0.08);
          const y = height / 2 + Math.sin(angle) * (r * 0.72) + (mouseY - height / 2) * (0.05 + progress * 0.08);

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      // Draw subtle elevation markers / landmark points (representing Vetal Tekdi, Fergusson hill, Shaniwar Wada)
      const landmarks = [
        { label: 'VETAL TEKDI · 800M', xRel: 0.32, yRel: 0.38, elev: '2600 FT' },
        { label: 'FERGUSSON RIDGE', xRel: 0.48, yRel: 0.52, elev: 'COLLEGE HILL' },
        { label: 'OLD PETHS · 560M', xRel: 0.68, yRel: 0.64, elev: 'MUTHA BASIN' }
      ];

      landmarks.forEach((lm, idx) => {
        const px = width * lm.xRel + Math.sin(time + idx) * 3;
        const py = height * lm.yRel + Math.cos(time + idx) * 3;

        // Pulse dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#C85A32' : '#1E3A2F';
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(px, py, 7 + Math.sin(time * 2 + idx) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? 'rgba(200, 90, 50, 0.4)' : 'rgba(30, 58, 47, 0.3)';
        ctx.stroke();

        // Small typographic badge
        ctx.font = '9px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#54524D';
        ctx.fillText(lm.label, px + 10, py - 2);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] flex items-center justify-center overflow-hidden rounded-3xl border border-[#E8E4DA] bg-gradient-to-b from-[#F5F0E6]/50 to-[#FBF9F5] shadow-editorial">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 pointer-events-none"
        aria-label="Interactive stylized topographic contour map of Pune elevation and hills"
      />
      <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E8E4DA] text-[10px] text-[#75726C]">
        <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
        <span className="font-medium tracking-wide">PUNE ELEVATION TOPOGRAPHY · INTERACTIVE RADIAL MAP</span>
      </div>
    </div>
  );
}
