import { Flight } from "../database/flight.entity";
import { NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { FlightsPage } from "./flights.page";
import { CreateFlightDTO } from "./createFlightDTO";
import { AirplanesService } from "../airplanes/airplanes.service";
import { SummaryDTO } from "./summaryDTO";

//  In this Service:
// Adding flights
// Modifying flights
// Removing flights
// Getting flights, with pagination
// Getting a summary

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
        private readonly airplaneService: AirplanesService,
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
    async addFlight(userId: number, flightDTO: CreateFlightDTO){
        const airplane = await this.airplaneService.getAirplaneByRegistration(flightDTO.aircraftRegistration, flightDTO.aircraftTypeId);
        return(this.flightsRepository.save({
            ...flightDTO,
            userId,
            aircraft: airplane,
        }))
    }
    async getSummary(userId: number){
        // TODO: Implement this thing
        // Possibly will have to change the system of saving time, to store just the minutes as int
        return null;
    }
}
