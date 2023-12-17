import {Location} from "~/models/Location";

export type Concert = {
    id: string,
    location: Location,
    datetime: string,
    genre: string
}