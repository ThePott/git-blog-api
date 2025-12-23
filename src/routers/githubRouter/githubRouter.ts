import { GITHUB_OWNER, GITHUB_REPO, GITHUB_TREE_SHA } from "@/config/env.js"
import octokit from "@/config/github.js"
import { Router } from "express"

const githubRouter = Router()

// NOTE: 깃헙이랑 연결이 되었는지를 확인하기 위한 테스트용 api
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

        res.status(200).json({ message: "---- healthy", ...response.data })
    } catch (error) {
        res.status(500).json({ message: "github failed", error })
    }
})

githubRouter.get("/tree", async (req, res) => {
    try {
        const response = await octokit.rest.git.getTree({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            tree_sha: GITHUB_TREE_SHA,
        })
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: "github failed", error })
    }
})

githubRouter.get("/markdown/specific-example", async (req, res) => {
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
