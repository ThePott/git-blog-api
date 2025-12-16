import { GITHUB_OWNER, GITHUB_REPO } from "@/config/env.js"
import octokit from "@/config/github.js"
import { Router } from "express"

const githubRouter = Router()

githubRouter.get("/", async (req, res) => {
    try {
        const response = await octokit.request("GET /repos/{owner}/{repo}", {
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
        })

        res.status(200).json({ data: response.data })
    } catch (error) {
        res.status(500).json({ message: "github failed", error })
    }
})

export default githubRouter
