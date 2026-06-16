const express = require("express");

const app = express();
app.use(express.json())
const PORT = 5000;

const targetServer ="http://localhost:8001"
app.use(async(req, res) => {
//    console.log(req.path);
//    res.send("Gateway received request");
    const options={
        method: req.method,
        headers: req.headers
    }
    if (req.body) {
    options.body = JSON.stringify(req.body);
    }
    const backendResponse = await fetch(targetServer + req.originalUrl, options)
    // console.log(backendResponse)
    res.status(backendResponse.status);
    const data = await backendResponse.text();
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`gateway running on port ${PORT}`);
});