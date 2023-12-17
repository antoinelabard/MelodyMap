import type {ActionArgs} from "@remix-run/node"
import {redirect} from "@remix-run/node"
import {Link} from "@remix-run/react";
import {Repository} from "~/data/Repository";

export const action = async ({request}: ActionArgs) => {
    const form = await request.formData()
    const address = form.get("address")
    const city = form.get("city")
    const datetime = form.get("datetime")
    const genre = form.get("genre")

    await Repository.addOrUpdateConcert(
        address,
        city,
        datetime,
        genre
    )
    return redirect("/")
}

export default function ConcertPage() {
    return (
        <div>
            <h1>Concert</h1>
            <form method="post">
                <fieldset>
                    <legend>Location</legend>
                    <label htmlFor="address">
                        Address: <input value="formtest" id="address" type="text" name="address" required/>
                    </label>
                    <label htmlFor="city-select">
                        City:
                        <select value="Bordeaux" id="city-select" required>
                            <option value="">--Please choose an option--</option>
                            <option value="Bordeaux">Bordeaux</option>
                            <option value="Paris">Paris</option>
                            <option value="Rennes">Rennes</option>
                            <option value="Rouen">Rouen</option>
                        </select>
                    </label>
                </fieldset>
                <label htmlFor="datetime">
                    Date and time:
                    <input
                        value="2023-12-17T12:53"
                        id="datetime"
                        type="datetime-local"
                        name="datetime"
                        required
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                    />
                </label>
                <label htmlFor="genre">
                    Genre: <input value="formtest" id="genre" type="text" name="genre" required/>
                </label>
                <button type="submit">Add or update</button>
            </form>
            <Link to={""}>Delete</Link>
        </div>
    )
}