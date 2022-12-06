import { state } from "@/store/index";

const HOSTNAME = "https://leerlevels2.azurewebsites.net/api";

export function get(path: string): Promise<any> {
    return sendRequest('GET', path, null);
}

export function post(path: string, body: any): Promise<any> {
    return sendRequest('POST', path, body);
}

export function put(path: string, body: any): Promise<any> {
    return sendRequest('PUT', path, body);
}

export function del(path: string): Promise<any> {
    return sendRequest('DELETE', path, null);
}

async function sendRequest(method: string, path: string, body: any): Promise<any> {
    const res = await fetch(`${HOSTNAME}${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwidXNlck5hbWUiOiJNYXJ5U3VlIzIyIiwidXNlckVtYWlsIjoiTWFyeVN1ZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6IlRlYWNoZXIiLCJuYmYiOjE2NzAzMzUyNTMsImV4cCI6MTY3MDM0MjQ1MywiaWF0IjoxNjcwMzM1MjUzLCJpc3MiOiJMZWVyTGV2ZWxzIiwiYXVkIjoiVXNlcnMgb2YgdGhlIExlZXJMZXZlbHMgYXBwbGljYXRpb25zIn0.hLFbXKKFaBpluKJHgisRoEDWsdObmSwgi1EJig4mgMQ`,
            // 'Authorization': `Bearer ${state().authToken}`,
        },
        body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
    });

    if (res.status != 200 && res.status != 201) {
        throw await res.text();
    }
    
    return res.json();
}
