const TOKEN_KEY = "cargo_auth_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* localStorage unavailable */
  }
}

/**
 * Thin fetch wrapper for the CarGo API.
 * - Adds the Authorization header when a token is stored.
 * - Throws an Error with the server's message on non-2xx responses.
 * - JSON-encodes plain object bodies; passes FormData through untouched.
 */
export async function apiFetch(path, options = {}) {
  const { body, headers, ...rest } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const token = getToken();

  const finalHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  let res;
  try {
    res = await fetch(`/api${path}`, {
      ...rest,
      headers: finalHeaders,
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Could not reach the server. Is the API running?");
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  if (data === null) {
    // A 2xx response with no JSON body means this request never actually
    // reached the API (e.g. the server is down and something else — Vite's
    // dev server, a static host — answered instead).
    throw new Error("Unexpected response from the server. Is the API running?");
  }
  return data;
}
