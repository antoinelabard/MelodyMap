import {useEffect} from "react";
import {Link} from "@remix-run/react";

export function ConcertCard({concert}) {
    useEffect(() => {
        if (!concert) {
            throw new Error("No concert prop provided")
        }
    })
    return (<div>
            <p>{concert.date}</p>
            <p>{concert.location.address}, {concert.location.city}</p>
            <p>{concert.genre}</p>
            <Link to={""}>Modify</Link>
        </div>
    )
}
