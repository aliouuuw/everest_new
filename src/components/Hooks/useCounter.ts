import { useEffect, useState } from 'react';

interface CounterOptions {
  duration?: number;
  easing?: (t: number) => number;
  startOnMount?: boolean;
  trigger?: boolean;
}

interface CounterResult {
  value: string;
  isAnimating: boolean;
  start: () => void;
  reset: () => void;
}

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeOutQuad = (t: number): number => 1 - Math.pow(1 - t, 2);

export function useCounter(
  targetValue: number | string,
  options: CounterOptions = {}
): CounterResult {
  const {
    duration = 2000,
    easing = easeOutCubic,
    startOnMount = true,
    trigger = false
  } = options;



  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formattedValue, setFormattedValue] = useState<string>('');

  // Parse the target value to extract number and format
  const parseTargetValue = (value: number | string): { number: number; format: string; prefix: string; suffix: string } => {
    if (typeof value === 'number') {
      return { number: value, format: 'number', prefix: '', suffix: '' };
    }

    const stringValue = String(value);

    // Handle currency format (e.g., "124,5 M FCFA", "15Mds")
    const currencyMatch = stringValue.match(/^([\d,]+(?:\.\d+)?)\s*(M|Mds|K|B)?\s*(FCFA|F\s*CFA|XOF)?$/i);
    if (currencyMatch) {
      const numStr = currencyMatch[1].replace(/,/g, '');
      // Handle both 'M' and 'Mds' as million multipliers
      const multiplier = currencyMatch[2] === 'M' || currencyMatch[2] === 'Mds' ? 1000000 : currencyMatch[2] === 'K' ? 1000 : currencyMatch[2] === 'B' ? 1000000000 : 1;
      const currency = currencyMatch[3] || '';

      return {
        number: parseFloat(numStr) * multiplier,
        format: 'currency',
        prefix: currencyMatch[2] ? `${currencyMatch[1]} ${currencyMatch[2]} ` : `${currencyMatch[1]} `,
        suffix: currency ? ` ${currency}` : ''
      };
    }

    // Handle percentage format (e.g., "+8.6%", "-2.3%")
    const percentMatch = stringValue.match(/^([+-]?)(\d+(?:\.\d+)?)%$/);
    if (percentMatch) {
      const sign = percentMatch[1];
      const num = parseFloat(percentMatch[2]);
      return {
        number: sign === '-' ? -num : num,
        format: 'percentage',
        prefix: sign || '',
        suffix: '%'
      };
    }

    // Handle plain number with potential sign
    const numberMatch = stringValue.match(/^([+-]?)(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const sign = numberMatch[1];
      const num = parseFloat(numberMatch[2]);
      return {
        number: sign === '-' ? -num : num,
        format: 'number',
        prefix: sign || '',
        suffix: ''
      };
    }

    // Default fallback
    return { number: 0, format: 'string', prefix: '', suffix: stringValue };
  };

  // Format current value back to target format
  const formatValue = (value: number, target: string): string => {
    const parsed = parseTargetValue(target);

    if (parsed.format === 'currency') {
      // For currency, animate the numerical part and keep the format
      const currencyMatch = target.match(/^([\d,]+(?:\.\d+)?)\s*(M|Mds|K|B)?\s*(FCFA|F\s*CFA|XOF)?$/i);
      if (currencyMatch) {
        const originalNum = parseFloat(currencyMatch[1].replace(/,/g, ''));
        // Handle both 'M' and 'Mds' as million multipliers for proper animation
        const multiplier = currencyMatch[2] === 'M' || currencyMatch[2] === 'Mds' ? 1000000 : currencyMatch[2] === 'K' ? 1000 : currencyMatch[2] === 'B' ? 1000000000 : 1;

        if (multiplier > 1) {
          const animatedNum = value / multiplier;
          const formattedNum = animatedNum.toLocaleString('fr-FR', {
            minimumFractionDigits: currencyMatch[1].includes('.') ? 1 : 0,
            maximumFractionDigits: currencyMatch[1].includes('.') ? 1 : 0
          });
          return `${formattedNum} ${currencyMatch[2]} ${currencyMatch[3] || ''}`.trim();
        } else {
          return value.toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
        }
      }
    }

    if (parsed.format === 'percentage') {
      const sign = value < 0 ? '-' : (target.startsWith('+') ? '+' : '');
      return `${sign}${Math.abs(value).toFixed(1)}%`;
    }

    if (parsed.format === 'number') {
      const sign = value < 0 ? '-' : (target.startsWith('+') ? '+' : '');
      const absValue = Math.abs(value);

      // Handle decimal places based on original format
      const hasDecimal = target.includes('.');
      const decimalPlaces = hasDecimal ? (target.split('.')[1]?.length || 1) : 0;

      return `${sign}${absValue.toFixed(decimalPlaces)}`;
    }

    return target;
  };

  const startAnimation = () => {
    if (isAnimating) return;

    const parsed = parseTargetValue(targetValue);

    setIsAnimating(true);

    const startValue = 0;
    const endValue = parsed.number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const current = startValue + (endValue - startValue) * easedProgress;
      setCurrentValue(current);
      setFormattedValue(formatValue(current, String(targetValue)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setFormattedValue(String(targetValue)); // Ensure final value is exact
      }
    };

    requestAnimationFrame(animate);
  };

  const reset = () => {
    setCurrentValue(0);
    setFormattedValue('');
    setIsAnimating(false);
  };

  useEffect(() => {
    if (startOnMount && !trigger) {
      startAnimation();
    }
  }, [targetValue, startOnMount]);

  useEffect(() => {
    if (trigger) {
      startAnimation();
    }
  }, [trigger]);

  return {
    value: formattedValue || String(targetValue),
    isAnimating,
    start: startAnimation,
    reset
  };
}
