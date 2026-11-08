/** @jsxRuntime classic */
/** @jsx React.createElement */
function Footer() {
  const { footer, nav } = window.CONTENT;
  const logo = window.IMAGES.logo;
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a href="#top" aria-label="Barragon Garage — início"><img src={logo.src} alt={logo.alt} /></a>
        <p>{footer.copy}</p>
      </div>
      <nav aria-label="Navegação de rodapé">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <SocialIcons className="footer-social" />
    </footer>
  );
}
window.Footer = Footer;
