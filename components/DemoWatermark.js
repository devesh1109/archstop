'use client';

export default function DemoWatermark() {
  return (
    <>
      <div className="demo-watermark" aria-hidden="true" />
      <style jsx>{`
        .demo-watermark {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 200px,
            rgba(0, 0, 0, 0.015) 200px,
            rgba(0, 0, 0, 0.015) 201px
          );
          background-size: 100% 100%;
          mix-blend-mode: multiply;
        }
        .demo-watermark::after {
          content: 'DEMO — ArchStop Confidential';
          position: fixed;
          bottom: 70px;
          right: 16px;
          font-size: 10px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.08);
          letter-spacing: 0.5px;
          pointer-events: none;
          z-index: 9999;
        }
        @media (min-width: 769px) {
          .demo-watermark::after {
            bottom: 16px;
          }
        }
      `}</style>
    </>
  );
}
