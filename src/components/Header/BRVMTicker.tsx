import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { FaArrowDown, FaArrowUp, FaMinus } from 'react-icons/fa';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockBRVMData: Array<StockData> = [
  { symbol: 'SONATEL', name: 'Sonatel', price: 12500, change: 150, changePercent: 1.21 },
  { symbol: 'BOA', name: 'Bank of Africa', price: 8500, change: -75, changePercent: -0.87 },
  { symbol: 'SGBS', name: 'SGBS', price: 9200, change: 200, changePercent: 2.22 },
  { symbol: 'BOAD', name: 'BOAD', price: 6800, change: 0, changePercent: 0 },
  { symbol: 'NSIA', name: 'NSIA', price: 11500, change: -120, changePercent: -1.03 },
  { symbol: 'SICC', name: 'SICC', price: 4500, change: 50, changePercent: 1.12 },
  { symbol: 'CIC', name: 'CIC', price: 7800, change: 180, changePercent: 2.36 },
  { symbol: 'SDE', name: 'SDE', price: 3200, change: -25, changePercent: -0.77 },
];

export const BRVMTicker: React.FC = () => {
  const location = useLocation();
  const [currentData, setCurrentData] = useState<Array<StockData>>(mockBRVMData);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Check if user is in admin portal
  const isInAdminPortal = location.pathname.startsWith('/admin');
  
  // Hide ticker if in admin portal
  if (isInAdminPortal) {
    return null;
  }

  useEffect(() => {
    // Show ticker after scrolling down from hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate live data updates every 30 seconds
    const interval = setInterval(() => {
      setCurrentData(prevData => 
        prevData.map(stock => {
          const randomChange = Math.random() > 0.5 ? 
            Math.floor(Math.random() * 200) - 100 : 
            Math.floor(Math.random() * 100) - 50;
          
          const newPrice = Math.max(1000, stock.price + randomChange);
          const change = newPrice - stock.price;
          const changePercent = (change / stock.price) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change,
            changePercent
          };
        })
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 bg-[var(--pure-white)]/80 backdrop-blur supports-[backdrop-filter]:glassmorphism border-t border-black/5 py-2.5 [padding-bottom:env(safe-area-inset-bottom)]"
      role="region"
      aria-label="BRVM ticker"
    >
      <div className="mx-auto max-w-6xl px-4 text-[var(--night)]">
        <div className="flex items-center justify-between pb-2">
          {/* BRVM Label - visible on all screen sizes */}
          <div className="flex items-center gap-2 text-secondary">
            <div className="w-2 h-2 bg-[var(--gold-dark)] rounded-full animate-pulse" aria-hidden="true"></div>
            <span className="kicker text-[var(--gold-dark)] pr-2">BRVM</span>
          </div>

          {/* Desktop Ticker - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 overflow-hidden flex-1 mx-4">
            <div
              className="flex items-center gap-6 animate-scroll"
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              aria-hidden
            >
              {currentData.map((stock) => (
                <div key={stock.symbol} className="flex items-center gap-3 whitespace-nowrap min-w-[140px] max-w-[180px]">
                  <div className="text-xs">
                    <div className="font-medium font-display truncate">{stock.symbol}</div>
                    <div className="opacity-80 numeric-tabular">{stock.price.toLocaleString()}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs numeric-tabular ${
                      stock.change > 0
                        ? 'text-[var(--success-green)]'
                        : stock.change < 0
                        ? 'text-[var(--error-red)]'
                        : 'text-secondary'
                    }`}
                  >
                    {stock.change > 0 ? (
                      <FaArrowUp className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : stock.change < 0 ? (
                      <FaArrowDown className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : (
                      <FaMinus className="w-2.5 h-2.5 flex-shrink-0" />
                    )}
                    <span className="truncate">{Math.abs(stock.change).toLocaleString()}</span>
                    <span className="truncate">({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless scrolling */}
              {currentData.map((stock) => (
                <div key={`${stock.symbol}-duplicate`} className="flex items-center gap-3 whitespace-nowrap min-w-[140px] max-w-[180px]">
                  <div className="text-xs">
                    <div className="font-medium font-display truncate">{stock.symbol}</div>
                    <div className="opacity-80 numeric-tabular">{stock.price.toLocaleString()}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs numeric-tabular ${
                      stock.change > 0
                        ? 'text-[var(--success-green)]'
                        : stock.change < 0
                        ? 'text-[var(--error-red)]'
                        : 'text-secondary'
                    }`}
                  >
                    {stock.change > 0 ? (
                      <FaArrowUp className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : stock.change < 0 ? (
                      <FaArrowDown className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : (
                      <FaMinus className="w-2.5 h-2.5 flex-shrink-0" />
                    )}
                    <span className="truncate">{Math.abs(stock.change).toLocaleString()}</span>
                    <span className="truncate">({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tablet Ticker - visible on md screens */}
          <div className="hidden md:flex lg:hidden items-center gap-4 overflow-hidden flex-1 mx-4">
            <div
              className="flex items-center gap-4 animate-scroll"
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              aria-hidden
            >
              {currentData.slice(0, 5).map((stock) => (
                <div key={stock.symbol} className="flex items-center gap-2 whitespace-nowrap min-w-[120px] max-w-[150px]">
                  <div className="text-xs">
                    <div className="font-medium font-display truncate">{stock.symbol}</div>
                    <div className="opacity-80 numeric-tabular">{stock.price.toLocaleString()}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs numeric-tabular ${
                      stock.change > 0
                        ? 'text-[var(--success-green)]'
                        : stock.change < 0
                        ? 'text-[var(--error-red)]'
                        : 'text-secondary'
                    }`}
                  >
                    {stock.change > 0 ? (
                      <FaArrowUp className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : stock.change < 0 ? (
                      <FaArrowDown className="w-2.5 h-2.5 flex-shrink-0" />
                    ) : (
                      <FaMinus className="w-2.5 h-2.5 flex-shrink-0" />
                    )}
                    <span className="truncate">{Math.abs(stock.change).toLocaleString()}</span>
                    <span className="truncate">({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Ticker - visible on small screens */}
          <div className="md:hidden text-xs flex-1 mx-2">
            <div
              className="flex items-center gap-3 animate-scroll"
              onTouchStart={handlePause}
              onTouchEnd={handleResume}
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              aria-hidden
            >
              {currentData.slice(0, 4).map((stock) => (
                <div key={stock.symbol} className="flex items-center gap-1.5 whitespace-nowrap min-w-[80px] max-w-[100px]">
                  <span className="font-medium font-display truncate">{stock.symbol}</span>
                  <span className="opacity-80 numeric-tabular truncate">{stock.price.toLocaleString()}</span>
                  <span
                    className={`truncate ${
                      stock.change > 0
                        ? 'text-[var(--success-green)]'
                        : stock.change < 0
                        ? 'text-[var(--error-red)]'
                        : 'text-secondary'
                    }`}
                  >
                    {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
