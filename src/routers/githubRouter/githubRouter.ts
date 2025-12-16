import { GITHUB_OWNER, GITHUB_REPO } from "@/config/env.js"
import octokit from "@/config/github.js"
import { Router } from "express"

const githubRouter = Router()

githubRouter.get("/", async (req, res) => {
    try {
        const response = await octokit.rest.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: "src/tiny-knowledge/readonly-vs-Readonly.md",
            mediaType: {
                format: "raw",
            },
        })

        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: "github failed", error })
    }
})

export default githubRouter
