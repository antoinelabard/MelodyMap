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
            <main>
                <h1>Welcome to Remix</h1>
                <Link to="/artist/new">Add a new artist</Link>
                <fieldset>
                    <legend>Filter by genres</legend>
                    {genres.map((genre) => (
                        <label key={genre} htmlFor={genre}>
                            <input type="checkbox" id={genre} name="filteredGenres"
                                   onClick={() => toggleFilteredGenre(genre)}/>{genre}
                        </label>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Filter by instruments</legend>
                    {instruments.map((instrument) => (
                        <label key={instrument} htmlFor={instrument}>
                            <input type="checkbox" id={instrument} name="filteredInstruments"
                                   onClick={() => toggleFilteredInstrument(instrument)}/>{instrument}
                        </label>
                    ))}
                </fieldset>
                <div>
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
                        ))}</ul>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
