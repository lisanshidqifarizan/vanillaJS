let postList = document.getElementById("postList");
const defaultImg = "/public/img/image.png";

async function fetchPosts() {
    try {
        const response = await fetch("/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        const data = await response.json();

        // **Tampilkan post dalam format HTML**
        postList.innerHTML = data.map(post => `
            <div class="post">
                <p>${post.title}</p>
                <div>
                    <img src="${(post.image && post.image[0]) ? post.image[0] : defaultImg}" alt="Post Image">
                </div>
            </div>
        `).join("");
        return;
    } catch (err) {
        console.error("Can't fetch:", err.message);
        postList.innerHTML = `<p style="color: red;">Gagal memuat data.</p>`;
        return;
    }
}

// **Panggil fungsi saat halaman dimuat**
fetchPosts();