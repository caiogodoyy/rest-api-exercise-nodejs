import { once } from 'node:events';
import Hero from "../entities/Hero.js"
import { JSON_CONTENT_TYPE } from '../utils/Header.js';

const heroes = ({ heroesService }) => ({ // função que recebe um objeto heroesService como paramêtro e retorna um objeto
    "/heroes:GET": async (request, response) => {
        response.write("HEROES GET")
        response.end()
    },

    "/heroes:POST": async (request, response) => {
        const data = await once(request, "data") // aguarda até que os dados da requisição estejam disponíveis com a função once
        // retorna uma string contendo os dados da requisição
        const item = JSON.parse(data)
        const hero = new Hero(item)

        await heroesService.create(hero)

        response.writeHead(201, JSON_CONTENT_TYPE)
        response.write(JSON.stringify({
            id: hero.id,
            message: "Hero registered with success!",
        }))
        response.end()
    },
})

export { heroes }
