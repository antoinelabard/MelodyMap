import {useLoaderData} from "@remix-run/react";
import {Repository, Concert} from "~/data/Repository";
import {ConcertCard} from "~/components/ConcertCard"
import {Header} from "~/components/Header";
import {Footer} from "~/components/Footer";
import {useState} from "react";

export const loader = async () => {
    return {
        "concerts": await Repository.getConcerts(),
    }
}

export default function ConcertsPage() {
    const {concerts} = useLoaderData<typeof loader>()
    const [filteredGenres, setFilteredGenres] = useState([])
    let genres = concerts.map((concert: Concert) => concert.genre)
    genres = [...new Set(genres)] // remove the duplicates entries

    function toggleFilteredGenre(genre: string): void {
        if (filteredGenres.includes(genre)) {
            setFilteredGenres(filteredGenres.filter((e) => e !== genre))
        } else {
            setFilteredGenres([...filteredGenres, genre])
        }
    }

    return (
        <div>
            <Header/>
            <main>
                <h1>Welcome to Remix</h1>
                <fieldset>
                    <legend>Filter by genres</legend>
                    {genres.map((genre) => (
                        <label key={genre} htmlFor="genreA1">
                            <input type="checkbox" id={genre} name="filteredGenres"
                                   onClick={() => toggleFilteredGenre(genre)}/>{genre}
                        </label>
                    ))}
                </fieldset>
                <ul>
                    {concerts
                        .filter((concert: Concert) => new Date(concert.datetime) > new Date())
                        .filter((concert: Concert) =>
                            filteredGenres.length === 0 || filteredGenres.includes(concert.genre))
                        .map((concert: Concert) => (
                            <li key={concert.id}>
                                <ConcertCard concert={concert}/>
                            </li>
                        ))}
                </ul>
            </main>
            <Footer/>
        </div>
    )
}
