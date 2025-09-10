import React from 'react';

interface SparklineProps {
  points: Array<number>;
  stroke?: string;
  fill?: string;
  className?: string;
}

const Sparkline: React.FC<SparklineProps> = ({
  points,
  stroke = "#B68D40",
  fill = "rgba(182,141,64,0.15)",
  className = ""
}) => {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = width / (points.length - 1);
  const normalized = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });
  const polygon = `0,${height} ${normalized.join(" ")} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`block ${className}`}>
      <polyline points={normalized.join(" ")} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={polygon} fill={fill} />
    </svg>
  );
};

export default Sparkline;
