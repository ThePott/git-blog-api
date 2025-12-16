import express from "express"
import "./github.js"

const app = express()

const port = process.env.PORT || 3030

app.listen(port, () => console.log("---- server is on", port))
