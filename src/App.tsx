import StockTicker from './components/Navigation/StockTicker';
import HeroSection from './components/Hero/HeroSection';
import Header from './components/Navigation/Header';

function App() {
  return (
    <div className="antialiased bg-[var(--pure-white)] text-night">
      <Header />
      <main>
        <HeroSection />
      </main>
      <StockTicker />
    </div>
  );
}

export default App;