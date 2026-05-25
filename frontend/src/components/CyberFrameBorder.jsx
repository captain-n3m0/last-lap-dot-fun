/**
 * Cyber frame border — refined version matching reference exactly:
 *  - Single purple stroked outline
 *  - Top-right & bottom-left diagonal notch cuts
 *  - Inner L-bracket accent on every corner (tight, hugging the geometry)
 */
export default function CyberFrameBorder() {
  return (
    <svg
      className="cyber-frame-svg"
      viewBox="0 0 1000 1200"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="purpleGlow2" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer frame */}
      <path
        d="M 6 6 L 950 6 L 994 50 L 994 1194 L 50 1194 L 6 1150 Z"
        stroke="#8B5CF6"
        strokeWidth="3.5"
        vectorEffect="non-scaling-stroke"
        filter="url(#purpleGlow2)"
      />

      {/* Top-left corner — inner L bracket */}
      <path
        d="M 22 70 L 22 22 L 70 22"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Top-right corner — inner accent following the notch */}
      <path
        d="M 920 22 L 962 22 L 978 38"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 978 64 L 978 100"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Bottom-left corner — inner accent following the notch */}
      <path
        d="M 22 1100 L 22 1162 L 38 1178"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 64 1178 L 80 1178"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Bottom-right corner — inner L bracket */}
      <path
        d="M 930 1178 L 978 1178 L 978 1130"
        stroke="#A78BFA"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
