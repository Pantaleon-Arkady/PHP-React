const postsUrl = "http://localhost:8080/posts"
const likeUrl = "http://localhost:8080/posts-like"
const dislikeUrl = "http://localhost:8080/posts-dislike"
const allPosts = "http://localhost:8080/all-posts";
const commentUrl = "http://localhost:8080/post-comment";
const userPostInteraction = "http://localhost:8080/post-user-interaction";

export async function getAllData() {
    try {
        const res = await fetch(allPosts);
        const json = await res.json();

        if (!res.ok) {
            return { success: false, error: json.error || json.message || "Fetch failed!" };
        }

        return { success: true, data: json.data || json };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

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

export async function updatePost(payload) {
    try {
        const res = await fetch(postsUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errorJson = await res.json().catch(() => ({}));
            return {
                success: false,
                error: errorJson.error || errorJson.message || "Update post failed"
            };
        }

        const data = await res.json();
        return { success: true, data };

    } catch (err) {
        return { success: false, error: err.message };
    }
}


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
};

export async function likePost(payload) {
    try {
        const res = await fetch(likeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            return { success: false, error: error.json || json.message || "Liking failed" }
        }

        const data = await res.json();

        return { success: true, data: data};
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function dislikePost(payload) {
    try {
        const res = await fetch(dislikeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            return { success: false, error: error.json || json.message || "Disliking failed" }
        }

        const data = await res.json();

        return { success: true, data: data};
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function createComment(payload) {
    try {
        const res = await fetch(commentUrl, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            return { success: false, error: error.json || json.message || "Comment failed" }
        }

        const data = await res.json();

        return { success: true, data: data};
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export async function postInteraction(payload, postId) {
    try {

        const res = await fetch(
            `http://localhost:8080/api/posts/${postId}/reactions`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        )

        if (!res.ok) {
            return { success: false, error: error.json || json.message || "Reaction to post failed" }
        }

        const data = await res.json();
        
        return { success: true, data: data};
    } catch (err) {
        return { success: false, error: err.message };
    }
}

export const functionName = async (props) => {

}