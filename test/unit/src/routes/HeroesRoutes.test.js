import test from "node:test";
import assert from "node:assert";
import { heroes } from "../../../../src/routes/HeroesRoutes.js";
import { JSON_CONTENT_TYPE } from "../../../../src/utils/Header.js";

const tracker = new assert.CallTracker()
process.on("exit", () => tracker.verify()) // quando o evento "exit" ocorrer, o verify será chamado
// o verify verifica quantas vezes a função foi realmente chamada em comparação com o número esperado

test("HeroesRoutes Test Suite", async (t) => {
    await t.test("it should call /heroes:get", async (t) => {
        const dbMock = [{
            "id": "fa4bfbe6-2d60-484d-882e-bcee1ae0637e",
            "name": "Ironman",
            "age": 50,
            "power": "money"
        }]

        const heroesServiceMock = {
            find: async () => dbMock // heroesServiceMock tem uma propriedade find que é uma função que retorna o dbMock
        }

        const routes = heroes({ heroesService: heroesServiceMock })

        const request = {}
        const response = {
            write: tracker.calls(actual => { // tracker.calls é usado para verificar os parâmetros
                const expected = JSON.stringify(dbMock)
                assert.strictEqual(actual, expected)
            }),
            end: tracker.calls(actual => {
                const expected = undefined
                assert.strictEqual(actual, undefined)
            })
        }

        const route = routes["/heroes:GET"]
        await route(request, response) // simula uma chamada à rota e verifica os parâmetros passados
    })

    await t.skip("it should call /heroes:post", async (t) => {

    })
})
