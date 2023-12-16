import { promises as fs } from "fs"

    static removeArtist(id: string): void {
        //todo
    }

    static getConcerts(): [Concert] {
        //todo
    }

    static getConcertsById(): Concert {
        //todo
    }

    static getIncomingConcerts(): [Concert] {
        //todo
    }

    static addConcert(
        id: string,
        address: string,
        city: string,
        date: string,
        genre: string
    ): void {
        //todo
    }

    static updateConcert(
        id: string,
        address: string,
        city: string,
        date: string,
        genre: string
    ): void {
        //todo
    }

    static removeConcert(
        id: string
    ): void {
        //todo
    }

    getCities(): [string] {
        //todo
    }

    static async resetDatabase(): Promise<void> {
        const dbDefault = await fs.readFile("./app/data/db-default.json", "utf-8")
        await fs.writeFile("./db.json", dbDefault, "utf-8")
    }
}

export default Repository