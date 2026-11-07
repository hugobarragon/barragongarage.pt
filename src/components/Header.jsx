/** @jsxRuntime classic */
/** @jsx React.createElement */
function Header() {
  const { nav } = window.CONTENT;
  const logo = window.IMAGES.logo;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="logo"><img src={logo.src} alt={logo.alt} /></a>
      <nav>
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <SocialIcons />
    </header>
  );
}
window.Header = Header;
