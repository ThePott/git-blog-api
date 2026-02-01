import prisma from "@/config/prisma.js"
import type { MonkeytypeMode } from "../../../../generated/prisma/enums.js"

type DbFindManyMonkeytypeResultProps = {
    mode: MonkeytypeMode | null
    mode2: string | null
}
export const dbFindManyMonkeytypeResult = async ({ mode, mode2 }: DbFindManyMonkeytypeResultProps) => {
    const result = await prisma.monkeytypeResult.findMany({
        where: {
            ...(mode && { mode }),
            ...(mode2 && { mode2 }),
        },
        orderBy: [{ timestamp: "desc" }],
    })
    return result
}
