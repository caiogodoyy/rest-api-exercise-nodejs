import { readFile, writeFile } from "node:fs/promises";

export default class HeroRepository {

    constructor({ file }) {
        this.file = file
    }

    async #getDatabase() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#getDatabase()
    }

    async create(data) {
        const db = this.#getDatabase
        db.push(data)

        await writeFile(
            this.file,
            JSON.stringify(db)
        )

        return data.id
    }

}
