import type { MonkeytypeResult } from "../../../../generated/prisma/client.js"

export type RawMonkeytypeResult = Omit<MonkeytypeResult, "monkeytypeId"> & { _id: string }
