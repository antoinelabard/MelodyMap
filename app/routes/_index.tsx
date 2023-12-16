import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Repository, Concert, Artist} from "~/data/Repository";
import {ConcertCard} from "~/components/ConcertCard"
import {ArtistCard} from "~/components/ArtistCard";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export const loader = async () => {
    return {
        "artists": await Repository.getArtists(),
        "concerts": await Repository.getConcerts(),
        "cities": await Repository.getCities(),
    }
}

export default function Index() {
    const {concerts, artists, cities} = useLoaderData<typeof loader>()
    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <h1>Welcome to Remix</h1>
            <div>
                <ul>
                    {concerts.map((concert: Concert) => (
                        <li key={concert.id}>
                            <ConcertCard concert={concert}/>
                        </li>
                    ))}
                </ul>
                <ul>{artists.map((artist: Artist) => (
                    <li key={artist.id}>
                        <ArtistCard artist={artist}/>
                    </li>
                ))}</ul>
            </div>
        </div>
    );
}
