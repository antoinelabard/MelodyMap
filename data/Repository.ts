type Artist = {
    id: string,
    name: string,
    instruments: [string],
    genres: [string]
}

type Location = {
    address: string,
    city: string
}

type Concert = {
    id: string,
    location: Location,
    date: string,
    genre: string
}

class Repository {
    static getArtists(): [Artist] {
        //todo
    }

    static getArtistById(): Artist {
        //todo
    }

    static addArtist(
        id: string,
        name: string,
        instruments: [string],
        genres: [string]
    ): void {
        //todo
    }

    static updateArtist(
        id: string,
        name: string,
        instruments: [string],
        genres: [string]
    ): void {
        //todo
    }

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

    static resetDatabase(): void {
        //todo
    }
}

export default Repository