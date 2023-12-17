import {ActionArgs, json} from "@remix-run/node"
import {redirect} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react";
import {Artist, Repository} from "~/data/Repository"
import type {LoaderArgs} from "@remix-run/node"

export const action = async ({request}: ActionArgs) => {
    const form = await request.formData()
    const name = form.get("name")
    const instruments = form.get("instruments").split("\n")
    const genres = form.get("genres").split("\n")
    const id = form.get("id")
    const intent = form.get("intent")

    switch (intent) {
        case "addOrUpdate":
            if (id === "new") {
                await Repository.addOrUpdateArtist(
                    name,
                    instruments,
                    genres
                )
            } else {
                await Repository.addOrUpdateArtist(
                    name,
                    instruments,
                    genres,
                    id
                )
            }
            break
        case "remove":
            await Repository.removeArtist(id)
    }
    return redirect("/")
}
export const loader = async ({params}: LoaderArgs) => {
    const artistData = {
        defaultName: "",
        defaultInstruments: [],
        defaultGenres: [],
        id: params.id
    }
    if (params.id !== "new") {
        const artist: Artist = await Repository.getArtistById(params.id)
        artistData.defaultName = artist.name
        artistData.defaultInstruments = artist.instruments
        artistData.defaultGenres = artist.genres
        artistData.id = params.id
    }
    return json({artistData})
}

export default function ArtistPage() {
    const {artistData} = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Artist</h1>
            <form method="post">
                <label htmlFor="name">
                    Name: <input defaultValue={artistData.defaultName} id="name" type="text" name="name" required/>
                </label>
                <label htmlFor="instruments">
                    Instruments (separated with new lines):
                    <textarea id="instruments" name="instruments" rows={10} cols={20} defaultValue={artistData.defaultInstruments.join("\n")}>
                    </textarea>
                </label>
                <label htmlFor="genres">
                    Genres (separated with new lines):
                    <textarea id="genres" name="genres" rows={10} cols={20} defaultValue={artistData.defaultGenres.join("\n")}>
                    </textarea>
                </label>
                <input type="hidden" name="id" defaultValue={artistData.id}/>
                <button name="intent" value="addOrUpdate">Add or update</button>
                <button name="intent" value="remove">Remove</button>
            </form>
        </div>
    )
}