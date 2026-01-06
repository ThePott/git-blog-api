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
        const type: string = req.query.type ? String(req.query.type) : ""

        const response = await octokit.rest.git.getTree({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            tree_sha: GITHUB_TREE_SHA,
            recursive: "true",
        })

        const treeArray = type ? response.data.tree.filter((el) => el.type === type) : response.data.tree
        res.status(200).json(treeArray)
    } catch (error) {
        res.status(500).json({ message: "github failed", error })
    }
})

githubRouter.get<{ pathSplat: string[] }>("/content/*pathSplat", async (req, res) => {
    try {
        const { pathSplat } = req.params
        const response = await octokit.rest.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: pathSplat.join("/"),
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
