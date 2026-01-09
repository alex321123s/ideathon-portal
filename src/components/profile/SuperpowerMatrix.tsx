'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { SuperpowerRating } from '@/types';

interface SuperpowerMatrixProps {
  superpowers: SuperpowerRating[];
  size?: number;
  showLabels?: boolean;
  interactive?: boolean;
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  design: { label: 'Design', color: '#EC4899' },
  strategy: { label: 'Strategy', color: '#8B5CF6' },
  storytelling: { label: 'Storytelling', color: '#F59E0B' },
  prototyping: { label: 'Prototyping', color: '#10B981' },
  research: { label: 'Research', color: '#3B82F6' },
  technical: { label: 'Technical', color: '#6366F1' },
};

export function SuperpowerMatrix({ 
  superpowers, 
  size = 280, 
  showLabels = true,
  interactive = false 
}: SuperpowerMatrixProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 40;
  const numPoints = superpowers.length;
  const angleStep = (2 * Math.PI) / numPoints;

  const points = useMemo(() => {
    return superpowers.map((sp, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const radius = (sp.verifiedScore / 10) * maxRadius;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        category: sp.category,
        score: sp.verifiedScore,
        labelX: center + (maxRadius + 25) * Math.cos(angle),
        labelY: center + (maxRadius + 25) * Math.sin(angle),
      };
    });
  }, [superpowers, center, maxRadius, angleStep]);

  const pathData = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((path, point, i) => {
      return path + (i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`);
    }, '') + ' Z';
  }, [points]);

  const gridLines = useMemo(() => {
    return [0.25, 0.5, 0.75, 1].map(scale => ({
      scale,
      points: superpowers.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = scale * maxRadius;
        return {
          x: center + radius * Math.cos(angle),
          y: center + radius * Math.sin(angle),
        };
      }),
    }));
  }, [superpowers, center, maxRadius, angleStep]);

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLines.map((grid, i) => (
          <motion.polygon
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            points={grid.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((point, i) => (
          <motion.line
            key={`axis-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(angleStep * i - Math.PI / 2)}
            y2={center + maxRadius * Math.sin(angleStep * i - Math.PI / 2)}
            stroke="rgba(100, 116, 139, 0.3)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon fill */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="url(#gradient)"
          fillOpacity="0.3"
          stroke="url(#gradient)"
          strokeWidth="2"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((point, i) => {
          const info = categoryLabels[point.category];
          return (
            <motion.g key={i}>
              {/* Point circle */}
              <motion.circle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                cx={point.x}
                cy={point.y}
                r={interactive ? 8 : 6}
                fill={info.color}
                stroke="white"
                strokeWidth="2"
                className={interactive ? 'cursor-pointer hover:r-10 transition-all' : ''}
              />
              
              {/* Label */}
              {showLabels && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.05 }}
                >
                  <text
                    x={point.labelX}
                    y={point.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-slate-300"
                  >
                    {info.label}
                  </text>
                  <text
                    x={point.labelX}
                    y={point.labelY + 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-slate-500"
                  >
                    {point.score.toFixed(1)}
                  </text>
                </motion.g>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
