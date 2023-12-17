import {ActionArgs, json} from "@remix-run/node"
import {redirect} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react";
import {Repository} from "~/data/Repository"
import type {LoaderArgs} from "@remix-run/node"
import {Header} from "~/components/Header";
import {Concert} from "~/models/Concert";

export const action = async ({request}: ActionArgs) => {
    const form = await request.formData()
    const address = form.get("address")
    const city = form.get("city")
    const datetime = form.get("datetime")
    const genre = form.get("genre")
    const id = form.get("id")
    const intent = form.get("intent")

    switch (intent) {
        case "addOrUpdate":
            if (id === "new") {
                await Repository.addOrUpdateConcert(
                    address,
                    city,
                    datetime,
                    genre
                )
            } else {
                await Repository.addOrUpdateConcert(
                    address,
                    city,
                    datetime,
                    genre,
                    id
                )
            }
            break
        case "remove":
            await Repository.removeConcert(id)
    }
    return redirect("/")

}
export const loader = async ({params}: LoaderArgs) => {
    const concertData = {
        defaultAddress: "",
        DefaultCity: "",
        defaultDate: "",
        defaultGenre: "",
        id: params.id
    }
    if (params.id !== "new") {
        const concert: Concert = await Repository.getConcertsById(params.id)
        concertData.defaultAddress = concert.location.address
        concertData.DefaultCity = concert.location.city
        concertData.defaultDate = concert.datetime
        concertData.defaultGenre = concert.genre
        concertData.id = params.id
    }
    const cities = await Repository.getCities()
    return json({concertData, cities})
}

export default function ConcertPage() {
    const {concertData, cities} = useLoaderData<typeof loader>()

    return (
        <div>
            <Header/>
            <main className="m-5">
                <h1 className="text-6xl font-bold text-center m-5">Concert</h1>
                <form method="post" className="flex flex-col items-middle">
                    <fieldset className="border-2 rounded w-fit p-3">
                        <legend>Location</legend>
                        <label className="w-fit font-bold m-1" htmlFor="address">
                            Address:
                        </label>
                        <input className="border-4 rounded-lg border-orange-400 mb-3" defaultValue={concertData.defaultAddress} id="address" type="text"
                               name="address"
                               required/>
                        <label className="w-fit font-bold m-1" htmlFor="city-select">
                            City:

                        </label>
                        <select className="border-4 rounded-lg border-orange-400 mb-3" defaultValue={concertData.DefaultCity} name="city" id="city-select" required>
                            <option value="">--Please choose an option--</option>
                            {cities.map((city) => (
                                <option
                                    key={city}
                                    value={city}
                                >{city}</option>
                            ))}
                        </select>
                    </fieldset>
                    <label className="w-fit font-bold m-1" htmlFor="datetime">
                        Date and time:
                    </label>
                    <input className="border-4 rounded-lg border-orange-400 w-1/6 mb-3"
                        defaultValue={concertData.defaultDate}
                        id="datetime"
                        type="datetime-local"
                        name="datetime"
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                    />
                    <label className="w-fit font-bold m-1" htmlFor="genre">
                        Genre:
                    </label>
                    <input className="border-4 rounded-lg border-orange-400 w-1/6 mb-3" defaultValue={concertData.defaultGenre} id="genre" type="text" name="genre"
                           required/>
                    <input type="hidden" name="id" defaultValue={concertData.id}/>
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