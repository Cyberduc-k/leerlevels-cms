import { state, store } from "@/store/index";

const HOSTNAME = "https://leerlevels2.azurewebsites.net/api";

export function get(path: string): Promise<any> {
    return sendRequest('GET', path, null);
}

export function post(path: string, body: any): Promise<any> {
    return sendRequest('POST', path, body);
}

export function put(path: string, body: any): Promise<null> {
    return sendRequest('PUT', path, body);
}

export function del(path: string): Promise<null> {
    return sendRequest('DELETE', path, null);
}

async function sendRequest(method: string, path: string, body: any): Promise<any> {
    const res = await fetch(`${HOSTNAME}${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.getters.getAuthToken}`,
        },
        body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
    });

    if (res.status != 200 && res.status != 201) {
        throw { status: res.status, text: await res.text() };
    }

    let contentType = res.headers.get("Content-Type");

    if (contentType === null || contentType.indexOf("application/json") < 0) {
        return null;
    }

    return res.json();
}
