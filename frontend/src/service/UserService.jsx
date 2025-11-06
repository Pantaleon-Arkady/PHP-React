const url = 'http://localhost:8080/pr-users';
const logUrl = 'http://localhost:8080/pr-users/login';

export async function createAccount(payload) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            return { success: false, error: json.error || json.message || "Create failed" };
        }
        
        const data = await res.json();

        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function logInAccount(payload) {
    try {
        const res = await fetch(logUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            return { success: false, error: json.error || json.message || "Log in failed" };
        }
        
        const data = await res.json();

        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
}