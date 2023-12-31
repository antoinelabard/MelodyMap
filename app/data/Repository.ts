import {promises as fs} from "fs"
import {v4 as uuid4} from "uuid"
import {Artist} from "~/models/Artist";
import {Concert} from "~/models/Concert";
import {Data} from "~/models/Data";

/**
 * Repository handles all the requests to the database and provide an interface for the project. It allows to only deal
 * with JS objects.
 *
 * It uses db-default.json to re-populate the database at each server start, in order to reset the previous state.
 */
export class Repository {
    static async getArtists(): Promise<Artist[]> {
        const data = await this.loadData()
        return data.artists
    }

    static async getArtistById(id: string): Promise<Artist | undefined> {
        const data = await this.loadData()
        return data.artists.filter((artist: Artist) => artist.id === id)[0]
    }

    static async addOrUpdateArtist(
        name: string,
        instruments: string[],
        genres: string[],
        id: string = uuid4()
    ): Promise<void> {
        const data = await this.loadData()
        const filteredArtists = data.artists.filter((artist: Artist) => artist.id !== id)
        filteredArtists.push({
            "id": id,
            "name": name,
            "instruments": instruments,
            "genres": genres
        })
        data.artists = filteredArtists
        await this.saveData(data)
    }

    static async removeArtist(id: string): Promise<void> {
        const data = await this.loadData()
        data.artists = data.artists.filter((artist: Artist) => artist.id !== id)
        await this.saveData(data)
    }

    static async getConcerts(): Promise<Concert[]> {
        const data = await this.loadData()
        return data.concerts
    }

    static async getConcertsById(id: string): Promise<Concert> {
        const data = await this.loadData()
        return data.concerts.filter((concert: Concert) => concert.id === id)[0]
    }

    static async getIncomingConcerts(): Promise<Concert[]> {
        const data = await this.loadData()
        return data.concerts
    }

    static async addOrUpdateConcert(
        address: string,
        city: string,
        date: string,
        genre: string,
        id: string = uuid4()
    ): Promise<void> {
        const data = await this.loadData()
        const filteredConcerts = data.concerts.filter((concert: Concert) => concert.id !== id)
        filteredConcerts.push({
            "id": id,
            "location": {
                "address": address,
                "city": city
            },
            "datetime": date,
            "genre": genre
        })
        data.concerts = filteredConcerts
        await this.saveData(data)
    }

    static async removeConcert(
        id: string
    ): Promise<void> {
        const data = await this.loadData()
        data.concerts = data.concerts.filter((concert: Concert) => concert.id !== id)
        await this.saveData(data)
    }

    static async getCities(): Promise<string[]> {
        const data = await this.loadData()
        return data.cities
    }

    static async loadData(): Promise<Data> {
        return JSON.parse(await fs.readFile("./db.json", "utf-8"))
    }

    static async saveData(data: Data): Promise<void> {
        await fs.writeFile("./db.json", JSON.stringify(data), "utf-8")
    }

    static async resetDatabase(): Promise<void> {
        const dbDefault = await fs.readFile("./app/data/db-default.json", "utf-8")
        await fs.writeFile("./db.json", dbDefault, "utf-8")
    }
}
