# Load Balancer Lab

A hands-on project built to understand how reverse proxies and load balancers work under the hood.

Instead of relying on existing tools like Nginx or HAProxy, this project implements core load balancing concepts from scratch using Node.js and Express.

---

## Features

### Reverse Proxy

* Forwards incoming client requests to backend servers
* Preserves request method, headers, and body
* Preserves response status codes, headers, and body

### Round Robin Load Balancing

* Distributes traffic across multiple backend servers
* Rotates requests sequentially among available servers

### Health Checks

* Periodically monitors backend server availability
* Updates server health status automatically

### Automatic Failover

* Removes unhealthy servers from rotation
* Routes traffic only to healthy servers
* Re-adds servers automatically when they recover

### Error Handling

* Returns `502 Bad Gateway` when backend communication fails
* Returns `503 Service Unavailable` when no healthy servers are available

---

## Architecture

```text
                 Client
                    |
                    v
          +------------------+
          |  Load Balancer   |
          +------------------+
             |           |
             |           |
             v           v
       +---------+  +---------+
       | Server1 |  | Server2 |
       +---------+  +---------+
```

---

## How It Works

### Request Flow

1. Client sends a request to the Load Balancer.
2. Load Balancer selects a backend server using the Round Robin algorithm.
3. Request is forwarded to the selected server.
4. Backend server generates a response.
5. Load Balancer forwards the response back to the client.

### Health Check Flow

Every 5 seconds:

1. Load Balancer sends a health check request to all backend servers.
2. If a server responds successfully:

   * `healthy = true`
3. If a server is unreachable:

   * `healthy = false`
4. Only healthy servers participate in load balancing.

---

## Round Robin Algorithm

```javascript
const targetServer =
healthyServers[
    currentServer % healthyServers.length
];

currentServer++;
```

Example:

Request 1 → Server1

Request 2 → Server2

Request 3 → Server1

Request 4 → Server2

---

## Tech Stack

* Node.js
* Express.js
* Native Fetch API

---

## Project Structure

```text
load-balancer-lab/
│
├── gateway/
│   └── server.js
│
├── server1/
│   └── server.js
│
├── server2/
│   └── server.js
│
└── README.md
```

---

## Running Locally

### Install Dependencies

```bash
cd gateway
npm install

cd ../server1
npm install

cd ../server2
npm install
```

### Start Backend Servers

```bash
cd server1
node server.js
```

```bash
cd server2
node server.js
```

### Start Load Balancer

```bash
cd gateway
node server.js
```

### Test

```bash
curl http://localhost:5000
```

---

## Future Improvements

* Weighted Round Robin
* Least Connections Algorithm
* Metrics Dashboard
* Dynamic Server Registration
* Request Logging
* Auto Scaling Simulation
* Docker Support

---

## Key Learnings

This project helped me understand:

* HTTP request/response lifecycle
* Reverse Proxy architecture
* Load Balancing strategies
* Health Checks and Failover mechanisms
* Status Codes (502, 503)
* Header forwarding and caching behavior
* Building distributed systems from first principles

```
```
