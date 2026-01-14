export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="288"
      height="42"
      viewBox="0 0 288 42"
      fill="none"
      className={className}
    >
      {/* P (0) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
    M0 36V6H18V24H6V36H0Z
    M6 12H12V18H6V12Z
  "
      />

      {/* R (24) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
    M24 36V6H42V24H30V36H24Z
    M30 12H36V18H30V12Z
    M36 24L42 36H36L30 24H36Z
  "
      />

      {/* A (48) */}
      <path d="M66 24H54V18H66V24Z" fill="currentColor" />
      <path
        d="M48 36V6H54V36H48ZM72 36V6H66V36H72ZM66 12H54V6H66V12Z"
        fill="currentColor"
      />

      {/* B (78) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
    M78 36V6H96V36H78Z
    M84 12H90V18H84V12Z
    M84 24H90V30H84V24Z
  "
      />

      {/* H (102) */}
      <path d="M120 24H108V18H120V24Z" fill="currentColor" />
      <path
        d="M102 36V6H108V36H102ZM126 36V6H120V36H126Z"
        fill="currentColor"
      />

      {/* A (132) */}
      <path d="M150 24H138V18H150V24Z" fill="currentColor" />
      <path
        d="M132 36V6H138V36H132ZM156 36V6H150V36H156ZM150 12H138V6H150V12Z"
        fill="currentColor"
      />

      {/* T (162) */}
      <path d="M162 12V6H186V12H162Z" fill="currentColor" />
      <path d="M171 36V12H177V36H171Z" fill="currentColor" />

      {/* L (192) */}
      <path d="M210 36H198V30H210V36Z" fill="currentColor" />
      <path d="M192 36V6H198V36H192Z" fill="currentColor" />

      {/* A (216) */}
      <path d="M234 24H222V18H234V24Z" fill="currentColor" />
      <path
        d="M216 36V6H222V36H216ZM240 36V6H234V36H240ZM234 12H222V6H234V12Z"
        fill="currentColor"
      />

      {/* B (246) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
    M246 36V6H264V36H246Z
    M252 12H258V18H252V12Z
    M252 24H258V30H252V24Z
  "
      />

      {/* S (270) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
    M270 36V6H288V36H270Z
    M276 12H288V18H276V12Z
    M270 24H282V30H270V24Z
  "
      />
    </svg>
  );
}
