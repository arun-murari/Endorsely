/**
 * Original sports-inspired graphics, authored as inline SVG. No photography, no
 * identifiable athletes, schools or teams — abstract track lanes, court
 * geometry, halftone geometry and non-identifiable motion marks.
 */

/** Abstract track-lane field with a curve, used as the hero graphic. */
export function LaneField({ className = "" }: { className?: string }) {
  const lanes = [0, 1, 2, 3, 4, 5];
  return (
    <svg
      viewBox="0 0 420 320"
      className={className}
      role="img"
      aria-label="Abstract graphic of curving running-track lanes crossed by a marked start line."
    >
      <rect width="420" height="320" fill="var(--color-paper-tint)" />
      {lanes.map((lane) => (
        <path
          key={lane}
          d={`M-10 ${70 + lane * 30} C 120 ${40 + lane * 30}, 240 ${150 + lane * 26}, 430 ${
            96 + lane * 30
          }`}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={lane === 2 ? 0.55 : 0.18}
          strokeWidth={lane === 2 ? 1.6 : 1}
        />
      ))}
      {/* start line */}
      <g>
        <path d="M96 40 L118 300" stroke="var(--color-ink)" strokeWidth="1.4" strokeOpacity="0.5" />
        {lanes.map((lane) => (
          <rect
            key={`tick-${lane}`}
            x={98 + lane * 3.4}
            y={62 + lane * 30}
            width="16"
            height="3"
            fill="var(--color-ink)"
            opacity="0.35"
          />
        ))}
      </g>
      {/* the point mark on lane three */}
      <rect x="240" y="150" width="18" height="18" fill="var(--color-lime)" />
      <text
        x="240"
        y="186"
        fill="var(--color-ink)"
        opacity="0.55"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="2"
      >
        LANE 03
      </text>
      <rect x="0" y="300" width="420" height="1" fill="var(--color-ink)" opacity="0.25" />
    </svg>
  );
}

/** Court geometry: baseline, service line, centre mark. */
export function CourtDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label="Abstract court diagram with baseline, service line and a marked centre point."
    >
      <rect width="320" height="220" fill="none" />
      <g stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1" fill="none">
        <rect x="30" y="20" width="260" height="180" />
        <path d="M30 110h260M100 20v180M220 20v180" />
        <path d="M160 20v14M160 186v14" />
      </g>
      <rect x="152" y="102" width="16" height="16" fill="var(--color-lime)" />
      <g stroke="var(--color-ink)" strokeOpacity="0.7" strokeWidth="2" fill="none">
        <path d="M30 20h26M30 20v26" />
        <path d="M290 200h-26M290 200v-26" />
      </g>
    </svg>
  );
}

/** Halftone/duotone geometric composition — a dot field fading across a block. */
export function HalftoneBlock({
  className = "",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const rows = 9;
  const cols = 16;
  const dotColor = invert ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <svg
      viewBox="0 0 320 180"
      className={className}
      role="img"
      aria-label="Abstract halftone composition of dots fading across a rectangle."
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((__, col) => {
          const progress = col / (cols - 1);
          const radius = 1 + (1 - progress) * 5.5;
          return (
            <circle
              key={`${row}-${col}`}
              cx={12 + col * 19.4}
              cy={14 + row * 19.4}
              r={radius}
              fill={dotColor}
              opacity={0.1 + (1 - progress) * 0.5}
            />
          );
        }),
      )}
      <rect x="276" y="70" width="14" height="14" fill="var(--color-lime)" />
    </svg>
  );
}

/**
 * Stylised, deliberately non-identifiable motion marks: three abstract figures
 * reduced to geometry. Not portraits, not any real person.
 */
export function MotionMarks({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 160"
      className={className}
      role="img"
      aria-label="Three abstract geometric marks suggesting athletes in motion."
    >
      <g stroke="var(--color-ink)" strokeWidth="2" fill="none" strokeOpacity="0.75">
        {/* stride */}
        <path d="M24 136 L52 92 L74 110 L96 58" />
        <circle cx="102" cy="44" r="9" fill="var(--color-ink)" stroke="none" />
        {/* reach */}
        <path d="M150 136 L162 86 L186 96 L176 52 L204 40" />
        <circle cx="168" cy="36" r="9" fill="var(--color-lime)" stroke="none" />
        {/* crouch */}
        <path d="M250 136 L268 104 L300 112 L316 74" />
        <circle cx="324" cy="60" r="9" fill="var(--color-ink)" stroke="none" />
      </g>
      <path
        d="M0 144h360"
        stroke="var(--color-ink)"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Bracketed hand-off diagram used for the school workflow section. */
export function HandoffDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 170"
      className={className}
      role="img"
      aria-label="Diagram: campaign brief leads to an evidence packet, which is handed to the school's existing workflow."
    >
      <g fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5">
        {[
          { x: 8, label: "01", title: "CAMPAIGN BRIEF", sub: "MatchPoint + merchant" },
          { x: 224, label: "02", title: "EVIDENCE PACKET", sub: "MatchPoint prepares" },
          { x: 440, label: "03", title: "EXISTING WORKFLOW", sub: "School's own process" },
        ].map((box, index) => (
          <g key={box.label}>
            <rect
              x={box.x}
              y="36"
              width="192"
              height="86"
              fill="none"
              stroke="var(--color-ink)"
              strokeOpacity={index === 2 ? 0.3 : 0.55}
              strokeDasharray={index === 2 ? "5 4" : undefined}
            />
            {/* corner brackets */}
            <path
              d={`M${box.x} 44 v-8 h8`}
              stroke={index === 0 ? "var(--color-lime-deep)" : "var(--color-ink)"}
              strokeWidth="2"
              fill="none"
            />
            <text x={box.x + 12} y="62" fill="var(--color-ink)" opacity="0.5">
              {box.label}
            </text>
            <text
              x={box.x + 12}
              y="84"
              fill="var(--color-ink)"
              fontSize="14"
              letterSpacing="0.5"
            >
              {box.title}
            </text>
            <text x={box.x + 12} y="104" fill="var(--color-ink)" opacity="0.6" fontSize="10">
              {box.sub}
            </text>
          </g>
        ))}
        <g stroke="var(--color-ink)" strokeOpacity="0.6" strokeWidth="1.4" fill="none">
          <path d="M204 79h12M212 74l6 5-6 5" />
          <path d="M420 79h12M428 74l6 5-6 5" />
        </g>
        <rect x="196" y="74" width="0" height="0" fill="var(--color-lime)" />
      </g>
    </svg>
  );
}
