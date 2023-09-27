import { readFile, writeFile } from "node:fs/promises";

export default class HeroesRepository {

    constructor({ dbPath }) {
        this.dbPath = dbPath
    }

    async #getDatabase() {
        return JSON.parse(await readFile(this.dbPath))
    }

    find() {
        return this.#getDatabase()
    }

    async create(data) {
        const db = await this.#getDatabase()
        db.push(data)

        await writeFile(
            this.dbPath,
            JSON.stringify(db)
        )
    }

}
