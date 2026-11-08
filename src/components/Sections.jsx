/** @jsxRuntime classic */
/** @jsx React.createElement */
function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      <span className="section-label-line" aria-hidden="true"></span>
      {children}
    </p>
  );
}
function Introduction() {
  const intro = window.CONTENT.introduction;
  return (
    <section className="introduction section-light" id="introducao">
      <SectionLabel number="01">A oficina</SectionLabel>
      <div className="intro-layout">
        <h2>{intro.title}</h2>
        <p>{intro.body}</p>
      </div>
      <span className="intro-mark" aria-hidden="true">BG</span>
    </section>
  );
}
function About() {
  const a = window.CONTENT.about;
  return (
    <section className="about" id="sobre">
      <SectionLabel number="04">Sobre a oficina</SectionLabel>
      <div className="about-layout">
        <h2>{a.title}</h2>
        <div className="about-copy">
          {a.body.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      </div>
    </section>
  );
}
function Services() {
  const s = window.CONTENT.services;
  return (
    <section className="services" id="servicos">
      <SectionLabel number="02">O que fazemos</SectionLabel>
      <div className="section-heading">
        <h2>{s.title}</h2>
        <p className="svc-sub">{s.subtitle}</p>
      </div>
      <div className="svc-list">
        {s.groups.map((g) => (
          <article className="svc" key={g.title}>
            <span className="svc-number">{g.number}</span>
            <div className="svc-content">
            <h3>{g.title}</h3>
              <p>{g.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="svc-more">{s.more}</p>
    </section>
  );
}
function Social() {
  const social = window.CONTENT.social;
  const links = window.CONTACT.social;
  return (
    <section className="social-section" id="redes">
      <SectionLabel number="05">Acompanha-nos</SectionLabel>
      <div className="social-layout">
        <h2>{social.title}</h2>
        <div className="social-copy">
          <div className="social-links">
            {links.instagram && (
              <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden="true">↗</span>
              </a>
            )}
            {links.facebook && (
              <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                Facebook <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <span className="social-stamp" aria-hidden="true">BARRAGON<br />GARAGE</span>
    </section>
  );
}
window.About = About;
window.Services = Services;
window.Introduction = Introduction;
window.Social = Social;
