const express = require("express");

const app = express();

const PORT = 8001;

app.get("/", (req, res) => {
    res.send("Hello from Server 1");
});

app.listen(PORT, () => {
    console.log(`Server1 running on port ${PORT}`);
});