export function Logo({ onClick }: { onClick: () => void }) {
  return <button className="logo" onClick={onClick} aria-label="Strona główna kursu">
    <span className="logo-mark"><span /><span /><span /></span>
    <span>wytrzymałość<small>interaktywnie</small></span>
  </button>
}
