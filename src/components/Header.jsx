/** @jsxRuntime classic */
/** @jsx React.createElement */
function Header() {
  const { nav } = window.CONTENT;
  const logo = window.IMAGES.logo;
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="logo" aria-label="Barragon Garage — início">
        <img src={logo.src} alt={logo.alt} />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Navegação principal">
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>
        ))}
      </nav>
      <SocialIcons className="header-social" />
    </header>
  );
}
window.Header = Header;
