/** @jsxRuntime classic */
/** @jsx React.createElement */
function Footer() {
  const { footer, nav, links } = window.CONTENT;
  const logo = window.IMAGES.logo;
  return (
    <footer className="footer">
      <div>
        <img src={logo.src} alt={logo.alt} />
        <p>{footer.copy}</p>
      </div>
      <nav>
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <SocialIcons />
    </footer>
  );
}
window.Footer = Footer;
