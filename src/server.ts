import express from "express"
import "@/config/github.js"
import githubRouter from "./routers/githubRouter/githubRouter.js"
import debugRouter from "./routers/debugRouter/debugRouter.js"

const app = express()

app.use(express.json())
app.use(express.text())

app.use("/github", githubRouter)
app.use("/", debugRouter)

const port = process.env.PORT || 3030

app.listen(port, () => console.log("---- server is on", port))
