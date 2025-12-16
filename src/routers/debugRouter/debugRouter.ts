import { Router } from "express"

const debugRouter = Router()

debugRouter.get("/", (req, res) => {
    res.status(200).send("---- hello world")
})

debugRouter.get("/checkhealth", (req, res) => {
    res.status(200).json({ message: "healty" })
})

export default debugRouter
