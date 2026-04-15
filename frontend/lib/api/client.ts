export class ApiError extends Error {
    status: number;
    body: unknown;

    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.body = body;
    }
}

function getBaseUrl() {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    return base.endsWith('/') ? base.slice(0, -1) : base;
}

function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

function buildHeaders(extra?: HeadersInit): HeadersInit {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    if (!extra) return headers;

    if (Array.isArray(extra)) {
        extra.forEach(([k, v]) => {
            headers[k] = v;
        });
        return headers;
    }

    if (extra instanceof Headers) {
        extra.forEach((v, k) => {
            headers[k] = v;
        });
        return headers;
    }

    return { ...headers, ...(extra as Record<string, string>) };
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

    const headers = buildHeaders(init?.headers);
    const requestBody = init?.body && typeof init.body === 'object' && !(init.body instanceof FormData) 
        ? JSON.stringify(init.body) 
        : init?.body;

    let res: Response;
    try {
        res = await fetch(url, {
            ...init,
            headers,
            body: requestBody,
            mode: 'cors',
            credentials: 'include'
        });
    } catch (e: any) {
        console.error(`[API ERROR] Failed to connect to ${url}.`, e);
        throw new Error(`Connection failed to ${url} (${e.message}). Please ensure backend is running at ${baseUrl}.`);
    }

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

    if (!res.ok) {
        let msg = `Request failed (${res.status})`;
        if (typeof body === 'object' && body && 'detail' in (body as any)) {
            const detail = (body as any).detail;
            msg = typeof detail === 'string' ? detail : JSON.stringify(detail);
        }
        throw new ApiError(msg, res.status, body);
    }

    return body as T;
}
