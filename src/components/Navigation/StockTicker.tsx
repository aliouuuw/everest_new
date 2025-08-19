import React, { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Simplified BRVM stock data
  const stockData: Array<StockData> = [
    { symbol: 'BOAS', price: 1250, change: 25, changePercent: 2.04 },
    { symbol: 'SGBS', price: 8500, change: -150, changePercent: -1.73 },
    { symbol: 'CBAO', price: 7200, change: 100, changePercent: 1.41 },
    { symbol: 'SONATEL', price: 12500, change: 200, changePercent: 1.63 },
    { symbol: 'PALM', price: 6800, change: -80, changePercent: -1.16 },
    { symbol: 'ONTBF', price: 3400, change: 75, changePercent: 2.26 },
    { symbol: 'BICC', price: 4200, change: -45, changePercent: -1.06 },
    { symbol: 'ETIT', price: 2800, change: 120, changePercent: 4.48 }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Duplicate for seamless scroll
  const duplicatedStocks = [...stockData, ...stockData];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--pure-white)] border-t border-[var(--line-soft)]">
      {/* Single Row Layout */}
      <div className="flex items-center justify-between px-6 lg:px-8 py-3">
        {/* Market Status */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-night kicker">BRVM</span>
        </div>

        {/* Scrolling Stocks */}
        <div className="flex-1 mx-6 overflow-hidden">
          <div 
            className={`flex items-center space-x-8 ${
              isPlaying ? 'ticker-scroll' : 'ticker-scroll-paused'
            }`}
            style={{ width: `${duplicatedStocks.length * 180}px` }}
          >
            {duplicatedStocks.map((stock, index) => (
              <div
                key={`${stock.symbol}-${index}`}
                className="flex items-center space-x-3 flex-shrink-0"
                style={{ width: '160px' }}
              >
                <span className="font-semibold text-night text-sm numeric-tabular">
                  {stock.symbol}
                </span>
                <span className="font-medium text-night text-sm numeric-tabular">
                  {formatPrice(stock.price)}
                </span>
                <div className="flex items-center space-x-1">
                  {stock.change >= 0 ? (
                    <IoIosTrendingUp className="text-green-600 text-xs" />
                  ) : (
                    <IoIosTrendingDown className="text-red-600 text-xs" />
                  )}
                  <span 
                    className={`text-xs font-medium numeric-tabular ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stock.changePercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-7 h-7 rounded-full text-night hover:text-[var(--gold-metallic)] transition-colors duration-200 flex-shrink-0"
          aria-label={isPlaying ? 'Pause ticker' : 'Play ticker'}
        >
          {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
        </button>
      </div>
    </div>
  );
};

export default StockTicker;