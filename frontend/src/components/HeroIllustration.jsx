// Detailed cyberpunk wasteland biker illustration matching the Figma reference.
// Red/orange mesa desert + spiked gas-mask rider + saguaro cactus + motorcycle.
export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a1a35" />
          <stop offset="0.5" stopColor="#5a2030" />
          <stop offset="1" stopColor="#a04020" />
        </linearGradient>
        <linearGradient id="mesa1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7a2818" />
          <stop offset="1" stopColor="#4a1410" />
        </linearGradient>
        <linearGradient id="mesa2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5a1f14" />
          <stop offset="1" stopColor="#3a0e0a" />
        </linearGradient>
        <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a1a10" />
          <stop offset="1" stopColor="#1a0a08" />
        </linearGradient>
        <radialGradient id="sun" cx="0.78" cy="0.18" r="0.42">
          <stop offset="0" stopColor="#ffc080" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#ff8050" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff8050" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff2020" />
          <stop offset="0.6" stopColor="#ff2020" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ff2020" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bike" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a2a32" />
          <stop offset="1" stopColor="#0a0a10" />
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ===== Sky ===== */}
      <rect width="800" height="360" fill="url(#sky)" />
      <rect width="800" height="360" fill="url(#sun)" />

      {/* Distant haze line */}
      <rect x="0" y="320" width="800" height="40" fill="#3a1818" opacity="0.5" />

      {/* ===== Far mesa silhouettes ===== */}
      <g fill="url(#mesa2)">
        <polygon points="0,300 0,210 60,210 80,200 130,200 150,215 170,215 180,205 230,205 250,220 250,300" />
        <polygon points="540,300 540,180 600,180 620,170 700,170 720,185 800,185 800,300" />
      </g>

      {/* ===== Mid mesa (right cluster — main backdrop behind rider) ===== */}
      <g fill="url(#mesa1)">
        {/* Big mesa */}
        <polygon points="430,360 430,150 470,150 490,140 580,140 600,150 660,150 680,160 780,160 800,170 800,360" />
        {/* Striations */}
        <rect x="450" y="180" width="350" height="3" fill="#3a0e08" opacity="0.4" />
        <rect x="450" y="220" width="350" height="2" fill="#3a0e08" opacity="0.4" />
        <rect x="450" y="255" width="350" height="3" fill="#3a0e08" opacity="0.4" />
        <rect x="450" y="290" width="350" height="2" fill="#3a0e08" opacity="0.4" />
      </g>

      {/* Left mesa column */}
      <g fill="url(#mesa1)">
        <polygon points="0,360 0,200 40,200 50,195 90,195 100,205 120,205 130,200 160,200 170,210 180,210 190,220 200,220 210,360" />
        <rect x="20" y="240" width="180" height="3" fill="#3a0e08" opacity="0.4" />
        <rect x="20" y="280" width="180" height="2" fill="#3a0e08" opacity="0.4" />
      </g>

      {/* ===== Saguaro cactus (right side) ===== */}
      <g>
        <rect x="700" y="200" width="24" height="170" rx="8" fill="#1f3a1f" stroke="#0e1f0e" strokeWidth="2" />
        <path d="M 700 250 Q 685 250 685 235 L 685 215 Q 685 205 695 205 L 700 205 Z" fill="#1f3a1f" stroke="#0e1f0e" strokeWidth="2" />
        <path d="M 724 240 Q 740 240 740 225 L 740 200 Q 740 190 730 190 L 724 190 Z" fill="#1f3a1f" stroke="#0e1f0e" strokeWidth="2" />
        {/* Cactus flower */}
        <circle cx="712" cy="195" r="6" fill="#d04040" />
        <circle cx="712" cy="195" r="3" fill="#ff6060" />
        {/* Cactus ribs */}
        <line x1="708" y1="220" x2="708" y2="360" stroke="#0e1f0e" strokeWidth="1" />
        <line x1="716" y1="220" x2="716" y2="360" stroke="#0e1f0e" strokeWidth="1" />
      </g>

      {/* Small cactus left */}
      <g>
        <rect x="50" y="290" width="12" height="60" rx="4" fill="#1a2a18" stroke="#0a1408" strokeWidth="1.5" />
        <path d="M 50 310 Q 42 310 42 302 L 42 296 Q 42 292 46 292 L 50 292 Z" fill="#1a2a18" stroke="#0a1408" strokeWidth="1.5" />
        <path d="M 62 304 Q 70 304 70 296 L 70 290 Q 70 286 66 286 L 62 286 Z" fill="#1a2a18" stroke="#0a1408" strokeWidth="1.5" />
      </g>

      {/* ===== Ground ===== */}
      <rect y="360" width="800" height="180" fill="url(#ground)" />
      {/* Horizon line */}
      <line x1="0" y1="362" x2="800" y2="362" stroke="#1a0808" strokeWidth="2" />
      {/* Ground texture rocks */}
      <g fill="#2a1208" opacity="0.6">
        <ellipse cx="120" cy="400" rx="14" ry="3" />
        <ellipse cx="240" cy="420" rx="20" ry="4" />
        <ellipse cx="380" cy="440" rx="28" ry="5" />
        <ellipse cx="620" cy="430" rx="22" ry="4" />
      </g>

      {/* ===== Motorcycle ===== */}
      <g transform="translate(280, 320)">
        {/* Shadow under bike */}
        <ellipse cx="160" cy="170" rx="180" ry="12" fill="#000" opacity="0.55" />

        {/* Rear wheel */}
        <circle cx="40" cy="140" r="50" fill="#0a0a10" stroke="#3a3a4a" strokeWidth="3" />
        <circle cx="40" cy="140" r="34" fill="#1a1a22" />
        <circle cx="40" cy="140" r="26" fill="none" stroke="#5a5a66" strokeWidth="2" />
        {/* Spokes */}
        <g stroke="#5a5a66" strokeWidth="2">
          <line x1="40" y1="114" x2="40" y2="166" />
          <line x1="14" y1="140" x2="66" y2="140" />
          <line x1="22" y1="122" x2="58" y2="158" />
          <line x1="58" y1="122" x2="22" y2="158" />
        </g>
        <circle cx="40" cy="140" r="6" fill="#8B5CF6" />
        <circle cx="40" cy="140" r="3" fill="#ffffff" opacity="0.7" />

        {/* Front wheel */}
        <circle cx="290" cy="150" r="46" fill="#0a0a10" stroke="#3a3a4a" strokeWidth="3" />
        <circle cx="290" cy="150" r="30" fill="#1a1a22" />
        <circle cx="290" cy="150" r="22" fill="none" stroke="#5a5a66" strokeWidth="2" />
        <g stroke="#5a5a66" strokeWidth="2">
          <line x1="290" y1="126" x2="290" y2="174" />
          <line x1="266" y1="150" x2="314" y2="150" />
          <line x1="272" y1="132" x2="308" y2="168" />
          <line x1="308" y1="132" x2="272" y2="168" />
        </g>
        <circle cx="290" cy="150" r="5" fill="#8B5CF6" />

        {/* Frame */}
        <path d="M 40 140 L 100 90 L 220 85 L 290 150 L 240 130 L 110 135 Z" fill="url(#bike)" stroke="#5a5a66" strokeWidth="2" />

        {/* Fuel tank */}
        <path d="M 120 90 L 220 85 L 230 110 L 130 115 Z" fill="#8B5CF6" stroke="#3a1858" strokeWidth="2" />
        <path d="M 130 92 L 215 88 L 215 96 L 130 100 Z" fill="#A78BFA" opacity="0.7" />
        {/* Tank logo */}
        <text x="175" y="108" fill="#ffffff" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">LL</text>

        {/* Seat */}
        <path d="M 60 90 L 130 80 L 140 95 L 70 100 Z" fill="#1a1a1f" stroke="#3a3a4a" strokeWidth="1.5" />

        {/* Exhaust pipes */}
        <rect x="0" y="125" width="50" height="10" rx="3" fill="#3a3a4a" />
        <rect x="-5" y="138" width="55" height="8" rx="3" fill="#2a2a32" />
        <circle cx="-2" cy="130" r="3" fill="#ff8040" opacity="0.6" />

        {/* Front fork */}
        <line x1="220" y1="100" x2="290" y2="150" stroke="#5a5a66" strokeWidth="6" strokeLinecap="round" />
        <line x1="225" y1="105" x2="288" y2="148" stroke="#8a8a96" strokeWidth="2" />

        {/* Handlebars */}
        <line x1="218" y1="85" x2="245" y2="65" stroke="#3a3a4a" strokeWidth="5" strokeLinecap="round" />
        <line x1="220" y1="65" x2="265" y2="62" stroke="#2a2a32" strokeWidth="4" strokeLinecap="round" />
        <circle cx="265" cy="62" r="4" fill="#1a1a22" />
        <circle cx="220" cy="65" r="4" fill="#1a1a22" />

        {/* Headlight glow */}
        <circle cx="295" cy="120" r="10" fill="#ffe080" opacity="0.4" />
        <circle cx="295" cy="120" r="5" fill="#fff8c0" />
      </g>

      {/* ===== Rider ===== */}
      <g transform="translate(380, 130)">
        {/* Right arm (extends to handlebar) */}
        <path d="M 95 110 Q 130 130 175 160" stroke="#1a1a20" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 95 110 Q 130 130 175 160" stroke="#3a3a4a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
        {/* Glove */}
        <circle cx="175" cy="160" r="11" fill="#0a0a10" stroke="#5a5a66" strokeWidth="1.5" />

        {/* Body / torso (cyberpunk jacket) */}
        <path d="M 30 110 L 100 105 L 110 200 L 20 210 Z" fill="#15151a" stroke="#3a3a4a" strokeWidth="2" />
        {/* Jacket detail straps */}
        <path d="M 35 130 L 100 125" stroke="#3a3a4a" strokeWidth="2" />
        <path d="M 38 155 L 100 150" stroke="#2a2a32" strokeWidth="2" />
        <path d="M 42 180 L 105 175" stroke="#2a2a32" strokeWidth="2" />
        {/* Chest plate */}
        <path d="M 50 130 L 90 127 L 95 175 L 55 180 Z" fill="#0a0a10" stroke="#5a5a66" strokeWidth="1.5" />
        {/* Glowing chest dot */}
        <circle cx="72" cy="152" r="4" fill="#ff3030" />
        <circle cx="72" cy="152" r="8" fill="url(#eyeGlow)" />

        {/* Left arm holding handlebar */}
        <path d="M 28 115 Q 5 135 -10 175" stroke="#1a1a20" strokeWidth="20" strokeLinecap="round" fill="none" />
        <circle cx="-10" cy="175" r="10" fill="#0a0a10" stroke="#5a5a66" strokeWidth="1.5" />

        {/* Shoulder pad spikes */}
        <polygon points="22,108 28,90 34,108" fill="#5a5a66" stroke="#8a8a96" strokeWidth="1" />
        <polygon points="32,103 38,85 44,103" fill="#5a5a66" stroke="#8a8a96" strokeWidth="1" />

        {/* === Helmet === */}
        <g transform="translate(60, 30)">
          {/* Spike base ring */}
          <ellipse cx="0" cy="-5" rx="42" ry="12" fill="#1a1a20" />

          {/* Spikes — multiple on top */}
          <g fill="#6a6a76" stroke="#8a8a96" strokeWidth="1">
            <polygon points="-35,-5 -30,-40 -25,-5" />
            <polygon points="-22,-5 -16,-50 -10,-5" />
            <polygon points="-8,-5 -2,-58 4,-5" />
            <polygon points="8,-5 14,-52 20,-5" />
            <polygon points="22,-5 28,-42 34,-5" />
          </g>
          {/* Spike side */}
          <polygon points="-40,5 -50,-15 -38,8" fill="#6a6a76" stroke="#8a8a96" strokeWidth="1" />
          <polygon points="38,5 50,-12 40,8" fill="#6a6a76" stroke="#8a8a96" strokeWidth="1" />

          {/* Helmet dome */}
          <path d="M -42 5 Q -42 -25 0 -28 Q 42 -25 42 5 L 42 30 Q 40 50 0 52 Q -40 50 -42 30 Z" fill="#0a0a10" stroke="#3a3a4a" strokeWidth="2" />

          {/* Helmet shine */}
          <path d="M -30 -15 Q -25 -22 0 -24" stroke="#5a5a66" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Visor / face area */}
          <path d="M -36 8 L 36 8 L 32 38 L -32 38 Z" fill="#1a1a22" stroke="#3a3a4a" strokeWidth="1.5" />

          {/* Single glowing red eye */}
          <ellipse cx="14" cy="20" rx="20" ry="10" fill="url(#eyeGlow)" />
          <ellipse cx="14" cy="20" rx="10" ry="4" fill="#ff2020" />
          <ellipse cx="14" cy="20" rx="5" ry="2" fill="#ffff80" />

          {/* Other eye area (dark) */}
          <ellipse cx="-18" cy="22" rx="8" ry="4" fill="#000" />

          {/* === Gas mask filter === */}
          <ellipse cx="0" cy="55" rx="22" ry="14" fill="#1a1a22" stroke="#3a3a4a" strokeWidth="2" />
          <ellipse cx="0" cy="55" rx="14" ry="9" fill="#0a0a10" />
          {/* Filter holes pattern */}
          <g fill="#3a3a4a">
            <circle cx="-7" cy="52" r="1.5" />
            <circle cx="-4" cy="56" r="1.5" />
            <circle cx="0" cy="51" r="1.5" />
            <circle cx="3" cy="57" r="1.5" />
            <circle cx="7" cy="53" r="1.5" />
            <circle cx="-3" cy="60" r="1.5" />
            <circle cx="4" cy="61" r="1.5" />
          </g>

          {/* Hose */}
          <path d="M -18 55 Q -30 70 -25 90" stroke="#2a2a30" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M -18 55 Q -30 70 -25 90" stroke="#1a1a20" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="2,2" />

          {/* Straps */}
          <path d="M -36 22 L -42 28 L -38 38" stroke="#3a3a4a" strokeWidth="2" fill="none" />
          <path d="M 36 22 L 42 28 L 38 38" stroke="#3a3a4a" strokeWidth="2" fill="none" />
        </g>
      </g>

      {/* ===== Dust / atmospheric ===== */}
      <ellipse cx="200" cy="490" rx="120" ry="8" fill="#6a3a20" opacity="0.5" />
      <ellipse cx="640" cy="500" rx="100" ry="6" fill="#6a3a20" opacity="0.5" />

      {/* ===== Grain overlay ===== */}
      <rect x="0" y="0" width="800" height="540" filter="url(#grain)" opacity="0.5" />

      {/* ===== Vignette ===== */}
      <radialGradient id="vig" cx="0.5" cy="0.5" r="0.7">
        <stop offset="0.6" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.6" />
      </radialGradient>
      <rect x="0" y="0" width="800" height="540" fill="url(#vig)" />
    </svg>
  );
}
