import { parse } from "node:url";
import { heroes } from "./routes/HeroesRoutes.js";
import { JSON_CONTENT_TYPE } from "./utils/Header.js";

const heroesRoutes = heroes({ heroService: {} })

const serverRoutes = {
    ...heroesRoutes, // adiciona as propriedades do objeto heroesRoutes ao objeto serverRoutes (spread)

    default: (request, response) => {
        response.writeHead(404, JSON_CONTENT_TYPE)
        response.write("Page Not Found")
        response.end()
    }
}

function handler(request, response) {
    const { url, method } = request
    const { pathname } = parse(url, true)
    const key = `${pathname}:${method}`
    const chosen = serverRoutes[key] || routes.default

    console.log(`requesting ${key}...`)
    return Promise.resolve(chosen(request, response)).catch(errorHandler(response))
}

function errorHandler(response) {
    return error => {
        console.log(`Something went wrong...\n${error.stack}`)
        response.writeHead(500, JSON_CONTENT_TYPE)
        response.write(JSON.stringify({
            error: "Internal Server Error"
        }))
        response.end()
    }
}

export {
    handler,
}
