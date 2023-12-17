import {useEffect} from "react";
import {Link} from "@remix-run/react";

export function ArtistCard({artist}) {
    useEffect(() => {
        if (!artist) {
            throw new Error("No artist prop provided")
        }
    })
    return (<div className="border-2 rounded m-5 p-5 w-80 flex flex-col align-middle">
            <p className="text-xxl font-bold m-2 underline">{artist.name}</p>
            <ul className="flex flex-row flex-wrap">{artist.genres.map((genre) => (
                <li className="py-1 px-4 m-1 rounded-full border-2 border-orange-400" key={genre}>{genre}</li>
            ))}</ul>
            <ul className="flex flex-row flex-wrap">{artist.instruments.map((instrument) => (
                <li className="py-1 px-4 m-1 rounded-full border-2 border-orange-400" key={instrument}>{instrument}</li>
            ))}</ul>
            <Link className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold text-center"
                  to={`artist/${artist.id}`}>Modify</Link>
        </div>
    )
}
