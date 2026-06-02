// src/config.js
// Set REACT_APP_API_URL in your .env file for production
// e.g. REACT_APP_API_URL=https://api.veniar.com (or https://api.rewards-now.net)

const API_BASE = process.env.REACT_APP_API_URL || '';
export const API = `${API_BASE}/api/v1`;