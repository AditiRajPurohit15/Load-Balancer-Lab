const express = require("express");

const app = express();
app.use(express.json())
const PORT = 5000;

const servers = [
    {
        url: "http://localhost:8001",
        healthy: true
    },
    {
        url: "http://localhost:8002",
        healthy: true
    }
];

setInterval(async()=>{
for(const server of servers){
    try {
        await fetch(server.url)
        server.healthy=true

    } catch (error) {
        server.healthy=false;
    }
    console.log(
    server.url,
    server.healthy
);
}
},5000)



let currentServer=0;


app.use(async(req, res) => {
//    console.log(req.path);
//    res.send("Gateway received request");
    try {

        const options={
        method: req.method,
        headers: req.headers
        }

        if (req.body) {
        options.body = JSON.stringify(req.body);
        }

            if (req.originalUrl !== "/") {
    return res.status(404).send("Ignored");
}

const healthyServers =
servers.filter(
    server => server.healthy
);

        if(healthyServers.length===0){
            return res.status(503).json({
                message:"Service unavailable"
            })
        }
        const targetServer = healthyServers[currentServer % healthyServers.length];
        currentServer++;
        
        console.log(req.originalUrl);
        console.log(targetServer);

    

        const backendResponse = await fetch(targetServer.url + req.originalUrl, options)
        // console.log(backendResponse)
        res.status(backendResponse.status);

        for(const [key,value] of backendResponse.headers){
        res.set(key,value)
        }

        const data = await backendResponse.text();

        res.send(data);

    } catch (error) {
        console.error(error);
        return res.status(502).json({
            message:"Bad Gateway"
        })
    }
});

app.listen(PORT, () => {
    console.log(`gateway running on port ${PORT}`);
});