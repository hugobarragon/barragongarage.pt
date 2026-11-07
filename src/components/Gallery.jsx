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
  // same photo at most twice, never adjacent; repeats use different crops
  const tiles = [
    { img: I.exterior, pos: '51% 48%', cls: 't-big' },
    { img: I.chrome, pos: '30% 40%', cls: '' },
    { img: I.bench, pos: '25% 50%', cls: '' },
    { img: I.lift, pos: '55% 52%', cls: 't-wide' },
    { img: I.chrome, pos: '75% 55%', cls: 't-wide' },
    { img: I.bench, pos: '80% 50%', cls: 't-wide' },
  ];
  return (
    <section className="gallery" id="galeria" aria-label="Galeria">
      <div className="wall">
        {tiles.map((t, i) => (
          <GalleryTile key={i} img={t.img} pos={t.pos} cls={t.cls} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}
window.Gallery = Gallery;
