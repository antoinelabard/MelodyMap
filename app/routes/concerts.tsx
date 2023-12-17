import {Link, useLoaderData} from "@remix-run/react";
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
                <Link to="/concert/new">Add a new concert</Link>
                <fieldset>
                    <legend>Filter by genres</legend>
                    {genres.map((genre) => (
                        <label key={genre} htmlFor={genre}>
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
                        .sort((a: Concert, b: Concert) => {
                            const datetimeA =new Date(a.datetime)
                            const datetimeB =new Date(b.datetime)
                            if (datetimeA < datetimeB) return -1
                            if (datetimeA > datetimeB) return 1
                            return 0
                        })
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
