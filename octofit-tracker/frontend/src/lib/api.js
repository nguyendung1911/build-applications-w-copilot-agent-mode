const DEFAULT_PORT = 8000;

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && String(codespaceName).trim().length > 0) {
    return `https://${codespaceName}-${DEFAULT_PORT}.app.github.dev/api`;
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://localhost:${DEFAULT_PORT}/api`;
    }

    const codespacesHostMatch = hostname.match(/^([a-z0-9-]+)-(\d+)\.app\.github\.dev$/i);

    if (codespacesHostMatch) {
      const currentCodespaceName = codespacesHostMatch[1];
      return `https://${currentCodespaceName}-${DEFAULT_PORT}.app.github.dev/api`;
    }
  }

  return `http://localhost:${DEFAULT_PORT}/api`;
}

export function getCollectionUrl(collectionName) {
  return `${getApiBaseUrl()}/${collectionName}/`;
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      pagination: null,
      total: payload.length,
    };
  }

  if (!payload || typeof payload !== 'object') {
    return {
      items: [],
      pagination: null,
      total: 0,
    };
  }

  const candidates = [
    payload.data,
    payload.items,
    payload.results,
    payload.docs,
    payload.records,
  ];

  const found = candidates.find((entry) => Array.isArray(entry));
  const items = found || [];

  const pagination = payload.pagination || payload.meta || null;

  const total =
    typeof payload.total === 'number'
      ? payload.total
      : typeof payload.count === 'number'
        ? payload.count
        : items.length;

  return {
    items,
    pagination,
    total,
  };
}

export async function fetchCollection(collectionName) {
  const response = await fetch(getCollectionUrl(collectionName));

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
}

export async function fetchFromEndpoint(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
}
