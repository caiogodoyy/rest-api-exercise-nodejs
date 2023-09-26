import { createServer } from "node:http";
import { handler } from './Handler.js';

const PORT = process.env.PORT || 3333

const server = createServer(handler)

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}...`)
})

export {
    server,
}
