import { state } from "@/store/index";

const HOSTNAME = "https://leerlevels.azurewebsites.net/api";

export function login(path: string, body: any): Promise<any> {
    return sendLoginRequest('POST', path, body);
}

export function get(path: string): Promise<any> {
    return sendRequest('GET', path, null);
}

export function post(path: string, body: any): Promise<any> {
    return sendRequest('POST', path, body);
}

export function del(path: string, body: any): Promise<any> {
    return sendRequest('DELETE', path, body);
}

async function sendLoginRequest(method: string, path: string, body: any): Promise<any> {
    const res = await fetch(`${HOSTNAME}${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
    })
    //const res = await axios.get(`${HOSTNAME}${path}`);
    return res.json();
}

async function sendRequest(method: string, path: string, body: any): Promise<any> {
    const res = await fetch(`${HOSTNAME}${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidXNlck5hbWUiOiJKb2huRCMxIiwidXNlckVtYWlsIjoiSm9obkRvZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6IlN0dWRlbnQiLCJuYmYiOjE2Njk3MzI0MDUsImV4cCI6MTY2OTczOTYwNSwiaWF0IjoxNjY5NzMyNDA1LCJpc3MiOiJMZWVyTGV2ZWxzIiwiYXVkIjoiVXNlcnMgb2YgdGhlIExlZXJMZXZlbHMgYXBwbGljYXRpb25zIn0.dnVKPZVtH3PIeTnhBeDO4-SogejTVxjMJNmBi1oVZYc"}`,
            'Authorization': `Bearer ${state().authToken}`,
        },
        body: (body === null || body === undefined) ? undefined : JSON.stringify(body),
    });

    return res.json();
}
