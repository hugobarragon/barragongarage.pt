/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar para o conteúdo</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <Services />
        <Gallery />
        <About />
        <Social />
      </main>
      <Footer />
    </>
  );
}
window.App = App;
