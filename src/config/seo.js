// SEO structured data (JSON-LD)
// Loads the AutoRepair schema dynamically from CONTACT config.
// Must be loaded after contact.js so window.CONTACT is available.
(function() {
  var c = window.CONTACT || {};
  var phone = c.phone ? '+' + c.phone : '';

  var data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": c.name || "Barragon Garage",
    "description": "Mecânica profissional, restauros e trabalhos personalizados em motas de todas as marcas. Especialistas em mokes portugueses – Famel, Casal e outras marcas clássicas.",
    "telephone": phone,
    "url": "https://barragengarage.pt/",
    "image": "https://barragengarage.pt/img/logo.png",
    "sameAs": [
      c.social && c.social.instagram ? c.social.instagram : "",
      c.social && c.social.facebook ? c.social.facebook : ""
    ].filter(Boolean),
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mecânica e reparações"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Restauros de motocicletas"
        }
      }
    ]
  };

  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
})();
