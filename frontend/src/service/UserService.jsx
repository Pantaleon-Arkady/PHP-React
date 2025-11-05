const url = 'http://localhost:8080/pr-users';

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