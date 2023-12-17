import {Link, useLoaderData} from "@remix-run/react";
import {Repository, Artist} from "~/data/Repository";
import {ArtistCard} from "~/components/ArtistCard";
import {Header} from "~/components/Header";
import {Footer} from "~/components/Footer";
import {useState} from "react";

export const loader = async () => {
    return {
        "artists": await Repository.getArtists(),
    }
}

export default function ArtistsPage() {
    const {artists} = useLoaderData<typeof loader>()
    const [filteredGenres, setFilteredGenres] = useState([])
    const [filteredInstruments, setFilteredInstruments] = useState([])
    let genres: string[] = artists.flatMap((artist: Artist) => artist.genres)
    genres = [...new Set(genres)] // remove the duplicates entries
    let instruments: string[] = artists.flatMap((artist: Artist) => artist.instruments)
    instruments = [...new Set(instruments)]

    function toggleFilteredGenre(genre: string): void {
        if (filteredGenres.includes(genre)) {
            setFilteredGenres(filteredGenres.filter((g) => g !== genre))
        } else {
            setFilteredGenres([...filteredGenres, genre])
        }
        console.log(filteredGenres, filteredInstruments)
    }

    function toggleFilteredInstrument(instrument: string): void {
        if (filteredInstruments.includes(instrument)) {
            setFilteredInstruments(filteredInstruments.filter((i) => i != instrument))
        } else {
            setFilteredInstruments([...filteredInstruments, instrument])
        }
        console.log(filteredGenres, filteredInstruments)
    }

    return (
        <div>
            <Header/>
            <main className="p-5">
                <h1 className="text-6xl font-bold text-center m-5">Welcome to Remix</h1>
                <div className="flex flex-row justify-between">
                    <ul>{artists
                        .filter((artist: Artist) =>
                            filteredGenres.length === 0
                            || filteredGenres.some((g: string) => artist.genres.includes(g)))
                        .filter((artist: Artist) =>
                            filteredInstruments.length === 0
                            || filteredInstruments.some((i: string) => artist.instruments.includes(i)))
                        .map((artist: Artist) => (
                            <li key={artist.id}>
                                <ArtistCard artist={artist}/>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col">
                        <Link className="m-3 px-5 py-2 w-fit bg-orange-400 rounded-lg font-bold" to="/artist/new">Add a new
                            artist</Link>
                        <div className="flex flex-row">
                            <fieldset className="m-3 border-4 rounded-lg border-orange-400 flex flex-col w-fit p-3">
                                <legend>Filter by genres</legend>
                                {genres.map((genre) => (
                                    <label key={genre} htmlFor={genre}>
                                        <input type="checkbox" id={genre} name="filteredGenres"
                                               onClick={() => toggleFilteredGenre(genre)}/>{genre}
                                    </label>
                                ))}
                            </fieldset>
                            <fieldset className="m-3 border-4 rounded-lg border-orange-400 flex flex-col w-fit p-3">
                                <legend>Filter by instruments</legend>
                                {instruments.map((instrument) => (
                                    <label key={instrument} htmlFor={instrument}>
                                        <input type="checkbox" id={instrument} name="filteredInstruments"
                                               onClick={() => toggleFilteredInstrument(instrument)}/>{instrument}
                                    </label>
                                ))}
                            </fieldset>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
