const {
    getPosts
} = require("../server/database");

const postsHandler = async (req, res) => {
    if (req.method === "GET" && req.url === "/api/posts") {
        try {
            const posts = await getPosts();
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(posts));
            return true;
        } catch (err) {
            console.error("Database Error:", err);
            res.writeHead(500);
            res.end(JSON.stringify({
                message: "Gagal mengambil data",
                err: err.message,
            }));
            return true;
        }
    }
    return false;
};

module.exports = postsHandler;