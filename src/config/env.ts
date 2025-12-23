import dotenv from "dotenv"
dotenv.config()

const checkEnvVar = (envVar: string | undefined, label?: string): string => {
    if (!envVar) {
        throw new Error(`---- MISSING ENV VAR: ${String(label)}`)
    }

    return envVar
}

export const MONKEYTYPE_APE_KEY = checkEnvVar(process.env.MONKEYTYPE_APE_KEY, "MONKEYTYPE_APE_KEY")
export const MONKEYTYPE_USER_NAME = checkEnvVar(process.env.MONKEYTYPE_USER_NAME, "MONKEYTYPE_USER_NAME")

export const GITHUB_FINE_GRAINED_TOKEN = checkEnvVar(process.env.GITHUB_FINE_GRAINED_TOKEN, "GITHUB_FINE_GRAINED_TOKEN")
export const GITHUB_OWNER = checkEnvVar(process.env.GITHUB_OWNER, "GITHUB_OWNER")
export const GITHUB_REPO = checkEnvVar(process.env.GITHUB_REPO, "GITHUB_REPO")
export const GITHUB_TREE_SHA = checkEnvVar(process.env.GITHUB_TREE_SHA, "GITHUB_TREE_SHA")
