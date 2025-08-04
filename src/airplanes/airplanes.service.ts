import { Flight } from "../database/flight.entity";
import { Like, NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { AirplaneType } from "../database/aircraftType.entity";

@Injectable()
export class AirplanesService {
    constructor(
        @InjectRepository(AirplaneType)
        private airplaneTypesRepo: Repository<AirplaneType>,
    ) {}

    getTypes(type: string){
        return(this.airplaneTypesRepo.find({where: [{model: Like(`%${type}%`)}, {type: Like(`%${type}%`)}]}));
    }
}
