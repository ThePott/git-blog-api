import { Octokit } from "octokit"
import { GITHUB_FINE_GRAINED_TOKEN } from "./env.js"

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: GITHUB_FINE_GRAINED_TOKEN })

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
    data: { login },
} = await octokit.rest.users.getAuthenticated()
console.log("Hello, %s", login)

export default octokit
