import axios from "axios"
import { MONKEYTYPE_APE_KEY } from "./env.js"

const headerlessMonkeytype = axios.create()
const monkeytype = axios.create({ headers: { Authorization: `ApeKey ${MONKEYTYPE_APE_KEY}` } })

export { headerlessMonkeytype, monkeytype }
