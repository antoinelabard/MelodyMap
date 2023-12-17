import {ActionArgs, json} from "@remix-run/node"
import {redirect} from "@remix-run/node"
import {Link, useLoaderData} from "@remix-run/react";
import {Concert, Repository} from "~/data/Repository"
import type {LoaderArgs} from "@remix-run/node"

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
            <h1>Concert</h1>
            <form method="post">
                <fieldset>
                    <legend>Location</legend>
                    <label htmlFor="address">
                        Address: <input defaultValue={concertData.defaultAddress} id="address" type="text"
                                        name="address"
                                        required/>
                    </label>
                    <label htmlFor="city-select">
                        City:
                        <select defaultValue={concertData.DefaultCity} name="city" id="city-select" required>
                            <option value="">--Please choose an option--</option>
                            {cities.map((city) => (
                                <option
                                    key={city}
                                    value={city}
                                >{city}</option>
                            ))}
                        </select>
                    </label>
                </fieldset>
                <label htmlFor="datetime">
                    Date and time:
                    <input
                        defaultValue={concertData.defaultDate}
                        id="datetime"
                        type="datetime-local"
                        name="datetime"
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                    />
                </label>
                <label htmlFor="genre">
                    Genre: <input defaultValue={concertData.defaultGenre} id="genre" type="text" name="genre" required/>
                </label>
                <input type="hidden" name="id" defaultValue={concertData.id}/>
                <button name="intent" value="addOrUpdate">Add or update</button>
                <button name="intent" value="remove">Remove</button>
            </form>
        </div>
    )
}