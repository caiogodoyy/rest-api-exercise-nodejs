import HeroesRepository from "../repositories/HeroesRepository.js";
import HeroesService from "../services/HeroesService.js";

const createHeroesServiceInstance = (dbPath) => {
    const heroesRepository = new HeroesRepository({ dbPath: dbPath })
    const heroesService = new HeroesService({heroesRepository: heroesRepository})

    return heroesService
}

export { createHeroesServiceInstance }