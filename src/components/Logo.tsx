export function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Granica — strona główna kursu">
      <svg className="logo-mark" viewBox="0 0 44 44" aria-hidden="true">
        <rect width="44" height="44" rx="12" fill="currentColor" />
        <path d="M11 30.5V13M11 30.5h22" fill="none" stroke="#8d9aa8" strokeWidth="1.25" />
        <path
          d="M13 28.5 21 15l5 3 7 10"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="18" r="3.25" fill="#ff6b45" stroke="#17202a" strokeWidth="1.5" />
      </svg>
      <span className="logo-type">
        granica<span className="logo-dot">.</span>
        <small>wytrzymałość materiałów</small>
      </span>
    </button>
  )
}
