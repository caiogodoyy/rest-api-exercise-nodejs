import { once } from 'node:events';
import Hero from "../entities/Hero.js"
import { JSON_CONTENT_TYPE } from '../utils/Header.js';

const heroes = ({ heroService }) => ({
    "/heroes:GET": async (request, response) => {
        response.write("HEROES GET")
        response.end()
    },

    "/heroes:POST": async (request, response) => {
        const data = await once(request, "data")
        const item = JSON.parse(data)
        const hero = new Hero(item)

        response.writeHead(201, JSON_CONTENT_TYPE)
        response.write(JSON.stringify({
            id: hero.id,
            message: "Hero registered with success!",
        }))
        response.end()
    },
})

export { heroes }
