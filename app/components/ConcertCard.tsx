import {useEffect} from "react";
import {Link} from "@remix-run/react";

export function ConcertCard({concert}) {
    useEffect(() => {
        if (!concert) {
            throw new Error("No concert prop provided")
        }
    })
    return (<div>
            <p>{new Date(concert.datetime).toString()}</p>
            <p>{concert.location.address}, {concert.location.city}</p>
            <p>{concert.genre}</p>
            <Link to={`concert/${concert.id}`}>Modify</Link>
        </div>
    )
}
