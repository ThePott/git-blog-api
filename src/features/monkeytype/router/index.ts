import { headerlessMonkeytype, monkeytype } from "@/config/axios.js"
import { AxiosError } from "axios"
import { Router } from "express"
import { dbFindManyMonkeytypeResult } from "../db/index.js"
import { makeSerializable } from "@/lib/utils/make-serializable.js"
import { updateMonkeytypeResult } from "../task/index.js"
import type { MonkeytypeMode } from "../../../../generated/prisma/enums.js"

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

monkeytypeRouter.get("/results", async (req, res) => {
    const mode = req.query.mode ? (String(req.query.mode) as MonkeytypeMode) : null
    const mode2 = req.query.mode2 ? String(req.query.mode2) : null
    const result = await dbFindManyMonkeytypeResult({ mode, mode2 })
    const serializable = makeSerializable(result)
    res.status(200).json(serializable)
})

monkeytypeRouter.post("/sync", async (req, res) => {
    await updateMonkeytypeResult()
    res.status(200).send("---- good")
})

monkeytypeRouter.get("/test/results", async (req, res) => {
    const response = await monkeytype.get("https://api.monkeytype.com/results")
    const data = response.data
    res.status(200).json(data)
})

export default monkeytypeRouter
