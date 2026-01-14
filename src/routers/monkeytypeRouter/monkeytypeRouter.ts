import { headerlessMonkeytype, monkeytype } from "@/config/axios.js"
import { AxiosError } from "axios"
import { Router } from "express"

const monkeytypeRouter = Router()

monkeytypeRouter.get("/", async (_req, res) => {
    try {
        const response = await headerlessMonkeytype.get("https://api.monkeytype.com/users/checkName/thisnewname")
        res.status(200).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

monkeytypeRouter.get("/best", async (req, res) => {
    try {
        const response = await monkeytype.get("https://api.monkeytype.com/users/personalBests?mode=words")
        res.status(200).send(response.data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            res.status(error.response?.status ?? 500).json(error.response?.data)
            return
        }
        res.status(500).json({ message: "---- unknown error" })
    }
})

monkeytypeRouter.get("/stats", async (req, res) => {
    try {
        const response = await monkeytype.get("https://api.monkeytype.com/results")
        res.status(200).send(response.data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            res.status(error.response?.status ?? 500).json(error.response?.data)
            return
        }
        res.status(500).json({ message: "---- unknown error" })
    }
})

export default monkeytypeRouter
