/** @jsxRuntime classic */
/** @jsx React.createElement */
function GalleryTile({ img, pos, cls, delay }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure ref={ref} className={'tile ' + cls + (seen ? ' in' : '')} style={{ transitionDelay: seen ? delay + 'ms' : '0ms' }}>
      <img src={img.src} alt={img.alt} loading="lazy" style={{ objectPosition: pos }} />
    </figure>
  );
}

function Gallery() {
  const I = window.IMAGES;
  const tiles = [
    { img: I.exterior, pos: '52% 50%', cls: 'tile-tall', number: '01' },
    { img: I.lift, pos: '55% 52%', cls: '', number: '02' },
    { img: I.chrome, pos: '72% 54%', cls: 'tile-wide', number: '03' },
  ];
  return (
    <section className="gallery" id="galeria">
      <div className="gallery-heading">
        <p className="section-label">
          <span>03</span><span className="section-label-line" aria-hidden="true"></span>Galeria
        </p>
        <h2>Um olhar sobre<br /><span>a oficina.</span></h2>
      </div>
      <div className="wall" role="group" aria-label="Fotografias da oficina e dos trabalhos">
        {tiles.map((t, i) => (
          <GalleryTile key={t.number} img={t.img} pos={t.pos} cls={t.cls} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}
window.Gallery = Gallery;
