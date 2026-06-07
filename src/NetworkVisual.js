import { useState } from 'react';

const nodes = [
  { x: 70,  y: 60,  label: 'Merchants', delay: '0s' },
  { x: 230, y: 36,  label: 'Customers', delay: '0.6s' },
  { x: 350, y: 112, label: 'Rewards',   delay: '1.2s' },
  { x: 108, y: 202, label: 'Discovery', delay: '0.3s' },
  { x: 288, y: 232, label: 'Network',   delay: '0.9s' },
];

const edges = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 3], [2, 4], [1, 4]];

export default function NetworkVisual() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="vn-network-card">
      <span className="vn-network-eyebrow">SHARED NETWORK</span>
      <div className="vn-network-haze" />

      <svg viewBox="0 0 420 280" width="100%" height="100%" onMouseLeave={() => setHoveredNode(null)}>
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
              values="0 0 0 0 0.055   0 0 0 0 0.588   0 0 0 0 0.804   0 0 0 1 0"
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
              stroke={active ? '#0E96CD' : 'rgba(95,107,115,0.28)'}
              strokeWidth={active ? 2 : 1}
              style={{
                opacity: active ? 0.85 : 0.4,
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
                fill="rgba(22,146,162,0.10)"
                stroke="rgba(22,146,162,0.40)"
                strokeWidth="1"
                filter={hovered ? 'url(#vn-node-glow-strong)' : 'url(#vn-node-glow)'}
                style={{ transition: 'r 0.18s ease, fill 0.18s ease, stroke 0.18s ease' }}
              />
              <circle
                cx={node.x} cy={node.y}
                r={hovered ? 8 : 6}
                fill={hovered ? '#0E96CD' : '#1692A2'}
                style={{ transition: 'r 0.18s ease, fill 0.18s ease' }}
              />
              <text
                x={node.x} y={node.y - 30}
                textAnchor="middle"
                fontSize={hovered ? 13 : 11}
                fontWeight={hovered ? 700 : 600}
                style={{
                  fill: hovered ? 'var(--vn-text)' : 'var(--vn-text-sub)',
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

      <div className="vn-network-stats">
        <div>
          <p className="vn-network-stat-label">Network</p>
          <p className="vn-network-stat-value">Businesses</p>
        </div>
        <div>
          <p className="vn-network-stat-label">Shared</p>
          <p className="vn-network-stat-value">Customer flow</p>
        </div>
        <div>
          <p className="vn-network-stat-label">Local</p>
          <p className="vn-network-stat-value">Ownership</p>
        </div>
      </div>
    </div>
  );
}
