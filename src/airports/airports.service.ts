import { Equal, NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AirplanesService } from "../airplanes/airplanes.service";
import { AirportEntity } from "../database/airport.entity";
import { userDTO } from "../users/userDTO";

@Injectable()
export class AirportsService {
    constructor(
        @InjectRepository(AirportEntity)
        private airportRepository: Repository<AirportEntity>,
    ) {}
    async saveAirport(airportToSave: AirportEntity) {
        console.log("XDs");
        return await this.airportRepository.save(airportToSave);
    }
    async getAirports(){
        return await this.airportRepository.findAndCount();
    }
    async getAirportByIcao(icaoCode: string, userId:number): Promise<AirportEntity>{
        let airport = await this.airportRepository.findOne({where: {icaoCode: icaoCode}})
        if(airport == null){
            if(userId)
                airport = await this.airportRepository.save({name: "CUSTOM", elevation: 0, userThatAdded:{id: userId} ,icaoCode: icaoCode, latitute: 0, longtitute: 0})
            else
                airport = new AirportEntity;
        }
        return airport;
    }
}
