import dotenv from "dotenv"
dotenv.config()

const checkEnvVar = (envVar: string | undefined, label?: string): string => {
    if (!envVar) {
        throw new Error(`---- MISSING ENV VAR: ${String(label)}`)
    }

    return envVar
}

export const MONKEYTYPE_APE_KEY = checkEnvVar(process.env.MONKEYTYPE_APE_KEY, "ape")
export const MONKEYTYPE_USER_NAME = checkEnvVar(process.env.MONKEYTYPE_USER_NAME, "user name")

export const GITHUB_FINE_GRAINED_TOKEN = checkEnvVar(process.env.GITHUB_FINE_GRAINED_TOKEN, "github")
