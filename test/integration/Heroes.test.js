import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

test("Heroes Integration Test Suite", async (t) => {
    const TEST_PORT = 3334
    process.env.PORT = TEST_PORT

    const { server } = await import("../../src/Server.js")
    const testUrl = `http://localhost:${TEST_PORT}/heroes`

    await t.test("it should create a hero", async (t) => {
        const request = await fetch(testUrl, { // gerando uma requisição http com a função fetch
            method: 'POST',
            body: JSON.stringify({
                name: "Ironman",
                age: 50,
                power: "money"
            })
        })

        const result = await request.json() // obtem o body da resposta da requisição

        assert.deepStrictEqual(request.headers.get("content-type"), "application/json")
        assert.strictEqual(request.status, 201)
        assert.deepStrictEqual(result.message, "Hero registered with success!")
        assert.ok(result.id.length == 36)
    })

    await promisify(server.close.bind(server))() // converte o método server.close em uma função que retorna uma promise, permitindo o uso do await
    // garante que seja executado no contexto do server com a função bind
})
