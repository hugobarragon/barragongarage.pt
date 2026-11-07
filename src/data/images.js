// Keep image paths relative so they work from a local browser tab.
const ASSET = (file) => `img/${file}`;

window.IMAGES = {
  logo: {
    src: ASSET("logo.png"),
    alt: "Logótipo Barragon Garage — Peças e Reparações desde 1990",
  },
  hero: {
    src: ASSET("hero-workshop-interior.jpg"),
    alt: "Oficina de motas com porta de aço levantada, luz cinzenta sobre o chão de betão e uma mota no elevador",
    focal: "43% 55.4%",
  },
  exterior: {
    src: ASSET("workshop-exterior-dusk.jpg"),
    alt: "Exterior da oficina ao entardecer, com parede de chapa ondulada e uma porta iluminada",
  },
  lift: {
    src: ASSET("frame-on-lift.jpg"),
    alt: "Quadro de mota desmontado num elevador, com soldaduras brilhantes sobre o chão escuro",
  },
  chrome: {
    src: ASSET("chrome-tank-detail.jpg"),
    alt: "Pormenor de um escape cromado junto a um depósito escuro com pintura laranja",
  },
  bench: {
    src: ASSET("hero-workshop-interior.jpg"),
    alt: "Interior da oficina com uma mota no elevador",
  },
};
