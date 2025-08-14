import { Flight } from "../database/flight.entity";
import { NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { FlightsPage } from "./flights.page";
import { CreateFlightDTO } from "./createFlightDTO";
import { AirplanesService } from "../airplanes/airplanes.service";
import { SummaryDTO } from "./summaryDTO";
import { SummaryResponseDTO } from "./SummaryResponse";

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

    async getFlights(userId: number, pageNumber: number = 0) : Promise<FlightsPage>{
        if(pageNumber == 0)
            pageNumber = Math.ceil((await this.flightsRepository.count({where: {userId:userId}})) / 10);
        const [data, total] = await this.flightsRepository.findAndCount({
            where: {userId: userId},
            order: {flightDate: 'ASC'},
            take: 10,
            skip: 10*(pageNumber-1)
        })
        return {flights: data, totalPages: Math.ceil(total/10), presentPage: (pageNumber? Number(pageNumber): 0)}
    }
    async addFlight(userId: number, flightDTO: CreateFlightDTO){
        const airplane = await this.airplaneService.getAirplaneByRegistration(flightDTO.aircraftRegistration, flightDTO.aircraftTypeId);
        return(this.flightsRepository.save({
            ...flightDTO,
            userId: userId,
            aircraft: airplane,
        }))
    }
    async getSummary(userId: number, pageNumber: number = 0):Promise<SummaryResponseDTO>{
        const summarizingQuery = `
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.totalTime, '%H:%i')))) AS total,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.picTime, '%H:%i')))) AS pic,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.singlePilotSeTime, '%H:%i')))) AS singlePilotSE,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.singlePilotMeTime, '%H:%i')))) AS singlePilotME,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.multiPilotTime, '%H:%i')))) AS multiPilot,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.flightConditionIfrTime, '%H:%i')))) AS ifr,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.flightConditionNightTime, '%H:%i')))) AS night,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.copilotTime, '%H:%i')))) AS coPilot,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.dualTime, '%H:%i')))) AS \`dual\`,
            SEC_TO_TIME(SUM(TIME_TO_SEC(STR_TO_DATE(f.instructorTime, '%H:%i')))) AS instructor
            `;
        if(pageNumber == 0)
            pageNumber = Math.ceil((await this.flightsRepository.count({where: {userId:userId}})) / 10);

        // Select flights that need to be summarized
        const subQueryTotal = this.flightsRepository.createQueryBuilder("f_sub")
            .where("f_sub.userId = :userId", { userId })
            .take(10*pageNumber)
            .orderBy("f_sub.flightDate", "ASC");
        const subQueryPrevious = this.flightsRepository.createQueryBuilder("f_sub")
            .where("f_sub.userId = :userId", { userId })
            .orderBy("f_sub.flightDate", "ASC")
            .take(10*(pageNumber - 1));
        const subQueryThis = this.flightsRepository.createQueryBuilder("f_sub")
            .where("f_sub.userId = :userId", { userId })
            .orderBy("f_sub.flightDate", "ASC")
            .skip(10*(pageNumber-1))
            .take(10);

        const totalSummary = await this.flightsRepository.createQueryBuilder("f")
            .select(summarizingQuery)
            .from('('+subQueryTotal.getQuery()+')', 'f')
            .where('f_sub_id=f.id')
            .setParameters(subQueryTotal.getParameters())
            .getRawOne<SummaryDTO>();
        
        const thisPageSummary = await this.flightsRepository.createQueryBuilder("f")
            .select(summarizingQuery)
            .from('('+subQueryThis.getQuery()+')', 'f')
            .where('f_sub_id=f.id')
            .setParameters(subQueryThis.getParameters())
            .getRawOne<SummaryDTO>();
        const previousPagesSummary = await this.flightsRepository.createQueryBuilder("f")
            .select(summarizingQuery)
            .from('('+subQueryPrevious.getQuery()+')', 'f')
            .where('f_sub_id=f.id')
            .setParameters(subQueryPrevious.getParameters())
            .getRawOne<SummaryDTO>();
        if(!totalSummary || !thisPageSummary || !previousPagesSummary){
            throw NotFoundException;
        }
        return({
            page: pageNumber,
            totalSummary: totalSummary,
            thisPageSummary: thisPageSummary,
            previousPagesSummary: previousPagesSummary,
        });
    }
}
