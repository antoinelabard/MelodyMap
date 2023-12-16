import {useEffect} from "react";
import {Link} from "@remix-run/react";

export function ArtistCard({artist}) {
    useEffect(() => {
        if (!artist) {
            throw new Error("No artist prop provided")
        }
    })
    return (<div>
            <p>{artist.name}</p>
            <ul>{artist.genres.map((genre) => (
                <li key={genre}>{genre}</li>
            ))}</ul>
            <ul>{artist.instruments.map((instrument) => (
                <li key={instrument}>{instrument}</li>
            ))}</ul>
            <Link to={""}>Modify</Link>
        </div>
    )
}
