/** @jsxRuntime classic */
/** @jsx React.createElement */
function About() {
  const a = window.CONTENT.about;
  return (
    <section className="about" id="sobre">
      <h2>{a.title}</h2>
      {a.body.map((t, i) => <p key={i} className="lead">{t}</p>)}
    </section>
  );
}
function Services() {
  const s = window.CONTENT.services;
  return (
    <section id="servicos">
      <h2>{s.title}</h2>
      <p className="svc-sub">{s.subtitle}</p>
      <div className="svc-grid">
        {s.groups.map((g) => (
          <div className="svc" key={g.title}>
            <h3>{g.title}</h3>
            <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="svc-more">{s.more}</p>
    </section>
  );
}
window.About = About;
window.Services = Services;
