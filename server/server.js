const http = require("http");
const fs = require("fs");
const path = require("path");

// * Routes Handler disini
const postsHandler = require("../routes/posts");

const PORT = 10000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    // * API Routes
    if (await postsHandler(req, res)) return;

    // * Menampilkan halaman utama: index.html "/"
    if (req.method === "GET" && req.url === "/") {
        fs.readFile("./public/index.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.end("Gagal memuat halaman utama");
                return;
            }
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end(data);
        });
        return;
    }

    // * Pengambilan file tambahan misal: CSS
    if (req.method === "GET" && req.url.startsWith("/public/")) {
        const filePath = path.join(__dirname, "..", req.url);

        const ext = path.extname(filePath);
        let contentType = "text/plain";
        if (ext === ".css") contentType = "text/css";
        if (ext === ".js") contentType = "application/javascript";
        if (ext === ".png") contentType = "image/png";
        if (ext === ".ico") contentType = "image/x-ico";
        if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    "Content-Type": "text/plain",
                });
                res.end("File tidak ditemukan");
                return;
            }
            res.writeHead(200, {
                "Content-Type": contentType,
            });
            res.end(data);
        });
        return;
    }

    // * Pengambilan file tambahan misal: CSS
    res.writeHead(404);
    res.end(JSON.stringify({
        message: "Route tidak ditemukan.",
    }));
});

server.listen(PORT, () => {
    console.log(`Server Berjalan di http://localhost:${PORT}`);
});