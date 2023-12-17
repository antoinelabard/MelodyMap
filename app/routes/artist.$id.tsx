import {ActionArgs, json} from "@remix-run/node"
import {redirect} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react";
import {Artist, Repository} from "~/data/Repository"
import type {LoaderArgs} from "@remix-run/node"
import {Header} from "~/components/Header";

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
            <Header/>
            <main className="m-5">
                <h1 className="text-6xl font-bold text-center m-5">{!artistData.name ? "New artist" : artistData.defaultName}</h1>
                <form method="post" className="flex flex-col items-middle">
                    <label className="w-fit font-bold m-1" htmlFor="name">
                        Name:
                    </label>
                    <input className="border-4 rounded-lg border-orange-400 w-1/6 mb-3" defaultValue={artistData.defaultName} id="name" type="text" name="name" required/>
                    <label className="w-fit font-bold m-1" htmlFor="instruments">
                        Instruments (separated with new lines):
                    </label>
                    <textarea className="border-4 rounded-lg border-orange-400 w-1/6 mb-3" id="instruments" name="instruments" rows={10} cols={20}
                              defaultValue={artistData.defaultInstruments.join("\n")}>
                    </textarea>
                    <label className="w-fit font-bold m-1" htmlFor="genres">
                        Genres (separated with new lines):
                    </label>
                    <textarea className="border-4 rounded-lg border-orange-400 w-1/6 mb-3" id="genres" name="genres" rows={10} cols={20}
                              defaultValue={artistData.defaultGenres.join("\n")}>
                    </textarea>
                    <input className="border-4 rounded-lg border-orange-400 w-1/6" type="hidden" name="id" defaultValue={artistData.id}/>
                        <button className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold w-fit" name="intent"
                                value="addOrUpdate">Add or update
                        </button>
                        <button className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold w-fit" name="intent"
                                value="remove">Remove
                        </button>
                </form>
            </main>
        </div>
    )
}