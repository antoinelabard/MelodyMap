import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Repository} from "~/data/Repository";
import {Header} from "~/components/Header";

export const meta: MetaFunction = () => {
    return [
        {title: "MelodyMap"},
        {name: "description", content: "Welcome to MelodyMap!"},
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
        <main>
            <Header/>
            <h1 className="text-6xl text-center align-middle my-40">Welcome to MelodyMap</h1>
        </main>
    );
}
