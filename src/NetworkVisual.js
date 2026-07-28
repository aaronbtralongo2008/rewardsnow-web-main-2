import { useState } from 'react';

const nodes = [
  { x: 78,  y: 108, label: 'Merchants', delay: '0s' },
  { x: 248, y: 78,  label: 'Customers', delay: '0.6s' },
  { x: 362, y: 158, label: 'Rewards',   delay: '1.2s' },
  { x: 118, y: 230, label: 'Discovery', delay: '0.3s' },
  { x: 282, y: 258, label: 'Network',   delay: '0.9s' },
];

const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 3], [2, 4], [1, 4]];

const LABEL       = 'rgba(255,248,234,0.65)';
const LABEL_HOVER = '#FFF8EA';
const LINE        = 'rgba(255,248,234,0.20)';
const LINE_ACTIVE = '#5CB2C9';
const RING_FILL   = 'rgba(92,178,201,0.16)';
const RING_STROKE = 'rgba(92,178,201,0.50)';
const DOT         = '#5CB2C9';
const DOT_HOVER   = '#0E96CD';

export default function NetworkVisual() {
  const [hoveredNode, setHoveredNode] = useState(null);
  return (
    <div className="vn-network-card">
      <span className="vn-network-eyebrow">SHARED NETWORK</span>

      <svg
        viewBox="0 0 420 300"
        width="100%"
        role="img"
        aria-label="Diagram showing merchants, customers, rewards, discovery, and the Veniar network connected together"
        style={{ display: 'block', width: '100%', height: 'auto' }}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <defs>
          <filter id="vn-node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="vn-node-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0 0 0 0 0.36   0 0 0 0 0.70   0 0 0 0 0.79   0 0 0 1 0"
              result="colorBlur" />
            <feMerge>
              <feMergeNode in="colorBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map(([a, b], i) => {
          const active = hoveredNode === a || hoveredNode === b;
          return (
            <line
              key={i}
              className="vn-network-line"
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={active ? LINE_ACTIVE : LINE}
              strokeWidth={active ? 2 : 1}
              style={{
                opacity: active ? 0.9 : 0.6,
                transition: 'stroke 0.18s ease, stroke-width 0.18s ease, opacity 0.18s ease',
              }}
            />
          );
        })}

        {nodes.map((node, i) => {
          const hovered = hoveredNode === i;
          return (
            <g
              key={i}
              className="vn-network-node"
              style={{ animationDelay: node.delay }}
              onMouseEnter={() => setHoveredNode(i)}
            >
              <circle
                cx={node.x} cy={node.y}
                r={hovered ? 24 : 20}
                fill={RING_FILL}
                stroke={RING_STROKE}
                strokeWidth="1"
                filter={hovered ? 'url(#vn-node-glow-strong)' : 'url(#vn-node-glow)'}
                style={{ transition: 'r 0.18s ease, fill 0.18s ease, stroke 0.18s ease' }}
              />
              <circle
                cx={node.x} cy={node.y}
                r={hovered ? 8 : 6}
                fill={hovered ? DOT_HOVER : DOT}
                style={{ transition: 'r 0.18s ease, fill 0.18s ease' }}
              />
              <text
                x={node.x} y={node.y - 30}
                textAnchor="middle"
                fontSize={hovered ? 13 : 11}
                fontWeight={hovered ? 700 : 600}
                style={{
                  fill: hovered ? LABEL_HOVER : LABEL,
                  fontFamily: 'inherit',
                  transition: 'font-size 0.18s ease, fill 0.18s ease',
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
