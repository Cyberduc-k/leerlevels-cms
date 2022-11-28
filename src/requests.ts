const HOSTNAME = "https://leerlevels.azurewebsites.net/api";

export function get(path: string): Promise<any> {
    return sendRequest('GET', path, null);
}

export function post(path: string, body: any): Promise<any> {
    return sendRequest('POST', path, body);
}

export function del(path: string, body: any): Promise<any> {
    return sendRequest('DELETE', path, body);
}

async function sendRequest(method: string, path: string, body: any): Promise<any> {
    const res = await fetch(`${HOSTNAME}/${path}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: (body === null || body === undefined) ? "" : JSON.stringify(body),
    });

    return res.json();
}
