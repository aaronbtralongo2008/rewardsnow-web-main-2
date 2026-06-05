// src/config.js
// Set REACT_APP_API_URL in Cloudflare Pages env vars for production
// e.g. REACT_APP_API_URL=https://rewardsnow-production.up.railway.app:8080

const API_BASE = process.env.REACT_APP_API_URL || '';
export const API = `${API_BASE}/api/v1`;