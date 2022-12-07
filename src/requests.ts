import { state } from "@/store/index";

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
            'Authorization': `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwidXNlck5hbWUiOiJNYXJ5U3VlIzIyIiwidXNlckVtYWlsIjoiTWFyeVN1ZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6IlRlYWNoZXIiLCJuYmYiOjE2NzA0MDMxODIsImV4cCI6MTY3MDQxMDM4MiwiaWF0IjoxNjcwNDAzMTgyLCJpc3MiOiJMZWVyTGV2ZWxzIiwiYXVkIjoiVXNlcnMgb2YgdGhlIExlZXJMZXZlbHMgYXBwbGljYXRpb25zIn0.PnQ_TD4ToHwSxJsShD9jPtnZdSTWhWysExcGK2nm5Ic`,
            // 'Authorization': `Bearer ${state().authToken}`,
        },
        body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
    });

    if (res.status != 200 && res.status != 201) {
        throw await res.text();
    }

    let contentType = res.headers.get("Content-Type");

    if (contentType === null || contentType.indexOf("application/json") < 0) {
        return null;
    }

    return res.json();
}
