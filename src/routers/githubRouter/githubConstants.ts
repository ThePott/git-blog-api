import type { ContentType, ContentTypeFormat } from "./githubTypes.js"

export const CONTENT_TYPE_TO_FORMAT: Record<ContentType, ContentTypeFormat> = { dir: "json", file: "raw" } as const
