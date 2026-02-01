import { monkeytype } from "@/config/axios.js"
import prisma from "@/config/prisma.js"
import type { MonkeytypeResult } from "../../../../generated/prisma/client.js"

type RawMonkeytypeResult = Omit<MonkeytypeResult, "monkeytypeId"> & { _id: string }

export const updateMonkeytypeResult = async () => {
    const lastResult = await prisma.monkeytypeResult.findFirst({ orderBy: { timestamp: "desc" } })
    const params = {
        onOrAfterTimestamp: lastResult ? lastResult.timestamp + BigInt(1) : undefined,
    }
    const response = await monkeytype.get("https://api.monkeytype.com/results", { params })
    const monkeytypeResultArray = response.data.data as RawMonkeytypeResult[]
    monkeytypeResultArray.sort((a, b) => Number(b.timestamp - a.timestamp))

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
            console.log("... auto syncing ...")
        },
        1000 * 60 * 60 * 24,
    )
}

export default repeatMonkeytypeResultUpdate
