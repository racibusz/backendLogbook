import { Flight } from "../database/flight.entity";

export interface FlightsPage{
    flights: Flight[];
    totalPages: number;
    presentPage: number;
}