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

export async function createPost(payload) {
    try {
        const res = await fetch(postsUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            return { success: false, error: json.error || json.message || "Create post failed" };
        }
        
        const data = await res.json();

        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export async function deletePost(postId) {
    try {
        const res = await fetch(
            `${postsUrl}?id=${encodeURIComponent(postId)}`, { method: "DELETE" } 
        );
        const json = await res.json();

        if (!res.ok) {
            return { success: false, error: json.error || json.message || "Delete failed" }
        };

        return { success: true, data: json };
    } catch (err) {
        return { success: false, error: err.message };
    }
}