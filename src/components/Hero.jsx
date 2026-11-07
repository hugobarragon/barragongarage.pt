/** @jsxRuntime classic */
/** @jsx React.createElement */
function Hero() {
  const h = window.CONTENT.hero;
  const img = window.IMAGES.hero;
  return (
    <section className="hero" id="top">
      <img className="hero-img" src={img.src} alt={img.alt} style={{ objectPosition: img.focal }} />
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="hero-text">
        <p className="eyebrow">{h.eyebrow}</p>
        <h1>{h.title}</h1>
        <p className="lead">{h.body}</p>
      </div>
    </section>
  );
}
window.Hero = Hero;
