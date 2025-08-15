import { Flight } from "../database/flight.entity";

export interface FlightsPage{
    userId: number;
    flights: Flight[];
    totalPages: number;
    presentPage: number;
}