/** @jsxRuntime classic */
/** @jsx React.createElement */
function Hero() {
  const h = window.CONTENT.hero;
  const img = window.IMAGES.hero;
  const instagram = window.CONTACT.social.instagram;
  return (
    <section className="hero" id="top">
      <img className="hero-img" src={img.src} alt={img.alt} style={{ objectPosition: img.focal }} />
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="hero-text">
        <p className="eyebrow">{h.eyebrow}</p>
        <h1>{h.title}</h1>
        <div className="hero-actions">
          <a className="button button-primary" href="#galeria">{h.primaryAction}</a>
          {instagram && (
            <a className="button button-text" href={instagram} target="_blank" rel="noopener noreferrer">
              {h.secondaryAction}<span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
