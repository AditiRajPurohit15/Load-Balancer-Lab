const express = require("express");

const app = express();

const PORT = 8001;

app.get("/", (req, res) => {
    // res.status(200).send("Hello from Server 1");
    res.set(
        "x-server-name",
        "aditi"
    )
    res.send("Hello from Server 1 UPDATED")
});

app.listen(PORT, () => {
    console.log(`Server1 running on port ${PORT}`);
});