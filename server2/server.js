const express = require("express");

const app = express();

const PORT = 8002;

app.get("/", (req, res) => {
    res.send("Hello from Server 2");
});

app.listen(PORT, () => {
    console.log(`Server2 running on port ${PORT}`);
});