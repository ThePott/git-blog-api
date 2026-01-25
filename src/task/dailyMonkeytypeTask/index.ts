import { monkeytype } from "@/config/axios.js"
import prisma from "@/config/prisma.js"
import type { MonkeytypeResult } from "../../../generated/prisma/client.js"
import type { RawMonkeytypeResult } from "./types/index.js"

export const updateMonkeytypeResult = async () => {
    const lastResult = await prisma.monkeytypeResult.findFirst({ orderBy: { timestamp: "desc" } })
    const params = {
        onOrAfterTimestamp: lastResult ? lastResult.timestamp + 1 : undefined,
    }
    const response = await monkeytype.get("https://api.monkeytype.com/results", { params })
    const monkeytypeResultArray = response.data.data as RawMonkeytypeResult[]

    await prisma.monkeytypeResult.createMany({
        data: monkeytypeResultArray.map((monkeyTypeResult) => {
            const { _id, ...rest } = monkeyTypeResult
            const newResult: MonkeytypeResult = {
                ...rest,
                monkeyTypeId: _id,
            }
            return newResult
        }),
    })
}

const repeatMonkeytypeResultUpdate = async () => {
    setInterval(
        async () => {
            updateMonkeytypeResult()
        },
        1000 * 60 * 60 * 24,
    )
}

export default repeatMonkeytypeResultUpdate
