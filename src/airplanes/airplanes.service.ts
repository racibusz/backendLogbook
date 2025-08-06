import { Flight } from "../database/flight.entity";
import { Like, NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { AirplaneType } from "../database/aircraftType.entity";
import { Airplane } from "../database/airplane.entity";

@Injectable()
export class AirplanesService {
    constructor(
        @InjectRepository(AirplaneType)
        private airplaneTypesRepo: Repository<AirplaneType>,
        @InjectRepository(Airplane)
        private airplaneRepository: Repository<Airplane>
    ) {}

    getTypes(type: string){
        return(this.airplaneTypesRepo.find({where: [{model: Like(`%${type}%`)}, {type: Like(`%${type}%`)}], take: 20} ));
    }

    getTypeById(id: number){
        return(this.airplaneTypesRepo.findOne({where: {id: id}}));
    }

    async getAirplaneByRegistration(registration: string, aircraftTypeId: number){
        let airplane = await this.airplaneRepository.findOne({where: {registration: registration}});
        if(airplane == null)
            airplane = await this.airplaneRepository.save({registration: registration, aircraftType: {id: aircraftTypeId}});
        return airplane;
    }

}
