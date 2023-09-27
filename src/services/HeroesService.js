export default class HeroesService {

    constructor({ heroesRepository }) {
        this.heroesRepository = heroesRepository
    }

    find() {
        return this.heroesRepository.find()
    }

    create(data) {
        return this.heroesRepository.create(data)
    }

}
