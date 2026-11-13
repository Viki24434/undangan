const line = (y, width = 44, x = 50 - width / 2) => (
  <rect x={x} y={y} width={width} height="3" rx="1.5" fill="currentColor" />
);
const portrait = (x, y, width = 25, height = 30) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    rx={width / 2}
    fill="currentColor"
    opacity=".3"
  />
);

export default function DesignVariantThumbnail({ kind, value }) {
  let artwork;
  if (kind === 'intro' || kind === 'closing') {
    artwork = (
      <>
        {value === 3 || (kind === 'closing' && value === 2)
          ? portrait(37, 5, 26, 26)
          : line(12, 22)}
        <rect
          x="18"
          y="8"
          width="64"
          height="62"
          rx={value === 1 ? 20 : 3}
          fill="none"
          stroke="currentColor"
          opacity=".4"
        />
        {line(38, 35)}
        {line(47, 42)}
        {line(55, 29)}
        {line(64, 20)}
      </>
    );
  } else if (kind === 'cover' && value === 4) {
    artwork = (
      <>
        <rect
          x="18"
          y="13"
          width="64"
          height="54"
          rx="2"
          fill="currentColor"
          opacity=".12"
        />
        <rect
          x="65"
          y="7"
          width="16"
          height="21"
          fill="none"
          stroke="currentColor"
          strokeDasharray="2"
        />
        {line(25, 20, 25)}
        {line(36, 34, 25)}
        {line(45, 26, 25)}
        {line(57, 22, 25)}
      </>
    );
  } else if (kind === 'hero' && value === 4) {
    artwork = (
      <>
        <rect
          x="16"
          y="7"
          width="68"
          height="33"
          rx="2"
          fill="currentColor"
          opacity=".3"
        />
        {line(48, 26)}
        {line(56, 43)}
        {line(66, 19)}
      </>
    );
  } else if (kind === 'couple' && value === 4) {
    artwork = (
      <>
        {portrait(16, 9, 20, 26)}
        {line(17, 28, 46)}
        {line(25, 21, 46)}
        {portrait(64, 43, 20, 26)}
        {line(51, 28, 16)}
        {line(59, 21, 16)}
      </>
    );
  } else if (kind === 'story' && value === 3) {
    artwork = [11, 32, 53].map((y, index) => (
      <g key={y}>
        <rect
          x="16"
          y={y}
          width="68"
          height="17"
          rx="2"
          fill="currentColor"
          opacity=".12"
        />
        <text x="22" y={y + 12} fontSize="9" fill="currentColor">
          0{index + 1}
        </text>
        {line(y + 7, 30, 42)}
      </g>
    ));
  } else if (kind === 'countdown' && value === 4) {
    artwork = (
      <>
        <rect
          x="13"
          y="18"
          width="74"
          height="43"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeDasharray="3"
        />
        {[20, 38, 56, 74].map((x) => (
          <g key={x}>
            <text x={x} y="43" fontSize="12" fill="currentColor">
              0
            </text>
            {line(50, 7, x)}
          </g>
        ))}
      </>
    );
  } else if (kind === 'gallery' && value === 5) {
    artwork = (
      <>
        {[7, 42, 77].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="11"
              width="29"
              height="47"
              fill="currentColor"
              opacity=".25"
            />
            {line(64, 17, x + 6)}
          </g>
        ))}
      </>
    );
  } else if (kind === 'gift' && value === 3) {
    artwork = [16, 39, 58].map((y, index) => (
      <g key={y}>
        <rect
          x="17"
          y={y}
          width="66"
          height={index ? 12 : 19}
          rx="3"
          fill="currentColor"
          opacity=".15"
        />
        {line(y + 5, 30, 24)}
        <text x="71" y={y + 9} fontSize="10" fill="currentColor">
          +
        </text>
      </g>
    ));
  } else if (kind === 'wishes' && value === 3) {
    artwork = (
      <>
        <circle cx="50" cy="14" r="8" fill="none" stroke="currentColor" />
        <rect
          x="22"
          y="30"
          width="56"
          height="37"
          rx="2"
          fill="currentColor"
          opacity=".12"
        />
        {line(40, 35)}
        {line(49, 35)}
        {line(59, 20)}
      </>
    );
  } else if (kind === 'cover' || kind === 'hero') {
    artwork =
      value === 3 && kind === 'cover' ? (
        <>
          {line(14, 30)}
          <rect
            x="23"
            y="29"
            width="54"
            height="32"
            rx="3"
            fill="currentColor"
            opacity=".2"
          />
          <path
            d="M23 29 50 48 77 29M23 61 42 44M77 61 58 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="50" cy="46" r="5" fill="currentColor" />
        </>
      ) : (
        <>
          {value !== 1 && (
            <path
              d="M25 65V31a25 25 0 0 1 50 0v34Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          )}
          {value === 1 && (
            <rect
              x="16"
              y="8"
              width="68"
              height="58"
              rx="3"
              fill="currentColor"
              opacity=".08"
            />
          )}
          {line(25, 22)}
          {line(35, 36)}
          {line(43, 28)}
          {line(55, 18)}
          {value === 3 && (
            <path
              d="m10 70 18-19 15 13 15-27 32 33Z"
              fill="currentColor"
              opacity=".3"
            />
          )}
        </>
      );
  } else if (kind === 'couple') {
    artwork =
      value === 1 ? (
        <>
          {portrait(16, 7)}
          {line(20, 24, 52)}
          {portrait(59, 39)}
          {line(53, 24, 15)}
        </>
      ) : value === 2 ? (
        <>
          {portrait(18, 17, 27, 37)}
          {portrait(56, 17, 27, 37)}
          {line(62, 20, 21)}
          {line(62, 20, 59)}
        </>
      ) : (
        <>
          {portrait(39, 5, 22, 27)}
          {line(36, 22)}
          {portrait(39, 43, 22, 27)}
        </>
      );
  } else if (kind === 'gallery') {
    const cells =
      value === 4
        ? [
            [15, 8, 42, 34],
            [61, 8, 24, 23],
            [15, 46, 42, 23],
            [61, 35, 24, 34],
          ]
        : value === 3
          ? [
              [15, 8, 32, 48],
              [53, 20, 32, 48],
            ]
          : value === 2
            ? [
                [15, 10, 70, 35],
                [15, 49, 32, 19],
                [53, 49, 32, 19],
              ]
            : [
                [16, 10, 30, 25],
                [54, 10, 30, 25],
                [16, 43, 30, 25],
                [54, 43, 30, 25],
              ];
    artwork = cells.map(([x, y, width, height], index) => (
      <rect
        key={index}
        x={x}
        y={y}
        width={width}
        height={height}
        rx="3"
        fill="currentColor"
        opacity={index % 2 ? '.2' : '.4'}
      />
    ));
  } else if (kind === 'story') {
    artwork = (
      <>
        <path
          d={`M${value === 1 ? 50 : 22} 9v58`}
          stroke="currentColor"
          opacity=".3"
        />
        {[16, 37, 58].map((y, index) => (
          <g key={y}>
            <circle
              cx={value === 1 ? 50 : 22}
              cy={y}
              r="3"
              fill="currentColor"
            />
            {line(
              y - 1,
              22,
              value === 1 && index % 2 === 0 ? 17 : value === 1 ? 61 : 34,
            )}
          </g>
        ))}
      </>
    );
  } else if (kind === 'countdown') {
    artwork = [17, 40, 63].map((x) => (
      <g key={x}>
        {value === 3 ? (
          <circle
            cx={x + 10}
            cy="38"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        ) : (
          <rect
            x={x}
            y="24"
            width="20"
            height="28"
            rx={value === 1 ? 2 : 10}
            fill="currentColor"
            opacity=".2"
          />
        )}
        {line(36, 8, x + 6)}
        {line(59, 12, x + 4)}
      </g>
    ));
  } else if (kind === 'gift') {
    artwork =
      value === 1 ? (
        <>
          {portrait(18, 17, 29, 40)}
          {portrait(54, 17, 29, 40)}
          {line(35, 17, 24)}
          {line(35, 17, 60)}
        </>
      ) : (
        <>
          <rect
            x="22"
            y="17"
            width="56"
            height="45"
            rx="5"
            fill="currentColor"
            opacity=".15"
          />
          {line(29, 24)}
          {line(40, 36)}
          {line(51, 18)}
        </>
      );
  } else {
    artwork = (
      <>
        {[16, 30, 44].map((y) => (
          <rect
            key={y}
            x={value === 1 ? 18 : 28}
            y={y}
            width={value === 1 ? 64 : 44}
            height="9"
            rx="3"
            fill="currentColor"
            opacity=".2"
          />
        ))}
        {line(63, 25)}
      </>
    );
  }
  return (
    <svg viewBox="0 0 100 78" aria-hidden="true" focusable="false">
      {artwork}
    </svg>
  );
}
