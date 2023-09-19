import express from "express"
import redis from 'redis'
const client = redis.createClient({
    socket: {
        host: "redis-server"
    }
})
await client.connect()
client.set("counts", 0)
const app = express()
app.get("/", async (req, res) => {
    const vis = await client.get("counts")
    res.send(vis)
    client.set("counts", +vis + 1)
})
app.listen(3000, () => {
    console.log("Running: ", 3000);
})