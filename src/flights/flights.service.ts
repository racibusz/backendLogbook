import { Flight } from "../database/flight.entity";
import { NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { FlightsPage } from "./flights.page";

//  In this Service:
// Adding flights
// Modifying flights
// Removing flights
// Getting flights, with pagination, with flight summary
// Getting a summary alone

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
    ) {}

    async getFlights(userId: number, pageNumber?: number) : Promise<FlightsPage>{
        const [data, total] = await this.flightsRepository.findAndCount({
            where: {userId: userId},
            order: {flightDate: 'DESC'},
            take: 10,
            skip: (pageNumber?10*(pageNumber-1):0)
        })
        return {flights: data, totalPages: total/10, presentPage: (pageNumber? Number(pageNumber): 0)}
    }

    
}
