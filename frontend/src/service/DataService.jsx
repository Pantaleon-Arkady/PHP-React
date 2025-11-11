const postsUrl = "http://localhost:8080/posts"

export async function getAllData() {
    try {
        const res = await fetch(postsUrl);
        const json = await res.json();

        if (!res.ok) {
            return { success: false, error: json.err || json.message || "Fetch failed!" };
        }

        return { success: !!json.success, data: json.data ?? json};
    } catch (err) {
        return { success: false, error: err.message };
    }
};