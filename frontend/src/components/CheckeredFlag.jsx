// Checkered race flag icon on a pole — matches the Daily Race Tasks reference.
export default function CheckeredFlag({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <pattern id="checker" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#ffffff" />
          <rect x="4" y="4" width="4" height="4" fill="#ffffff" />
          <rect x="4" y="0" width="4" height="4" fill="#0a0a10" />
          <rect x="0" y="4" width="4" height="4" fill="#0a0a10" />
        </pattern>
      </defs>
      {/* Pole */}
      <rect x="6" y="3" width="2.5" height="34" fill="#8a8a96" />
      <circle cx="7.25" cy="3" r="1.8" fill="#c0c0c8" />
      {/* Flag waving */}
      <path
        d="M 8.5 5
           Q 18 3 26 6
           Q 32 8 36 6
           L 36 22
           Q 32 24 26 22
           Q 18 19 8.5 21
           Z"
        fill="url(#checker)"
        stroke="#0a0a10"
        strokeWidth="1"
      />
    </svg>
  );
}
