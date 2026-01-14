import express from "express"
import cors, { type CorsOptions } from "cors"
import "@/config/github.js"
import githubRouter from "./routers/githubRouter/githubRouter.js"
import debugRouter from "./routers/debugRouter/debugRouter.js"
import monkeytypeRouter from "./routers/monkeytypeRouter/monkeytypeRouter.js"

const app = express()

const corsOptions: CorsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT", "DELETE"],
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.text())

app.use("/github", githubRouter)
app.use("/monkeytype", monkeytypeRouter)
app.use("/", debugRouter)

const port = process.env.PORT || 3030

app.listen(port, () => console.log("---- server is on", port))
