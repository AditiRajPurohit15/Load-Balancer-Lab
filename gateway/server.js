const express = require("express");

const app = express();

const PORT = 5000;

const targetServer ="http://localhost:8001"
app.use(async(req, res) => {
//    console.log(req.path);
//    res.send("Gateway received request");
    const backendResponse = await fetch(targetServer + req.path)
    const data = await backendResponse.text();
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`gateway running on port ${PORT}`);
});