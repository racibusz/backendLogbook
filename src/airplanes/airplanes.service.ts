import { Flight } from "../database/flight.entity";
import { Like, NumericType, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { AirplaneType } from "../database/aircraftType.entity";
import { Airplane } from "../database/airplane.entity";
import { CreateFlightDTO } from "../flights/createFlightDTO";
import { plainToInstance } from "class-transformer";
import { AirplaneDTO } from "./airplaneDTO";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AirplanesService {
    constructor(
        @InjectRepository(AirplaneType)
        private airplaneTypesRepo: Repository<AirplaneType>,
        @InjectRepository(Airplane)
        private airplaneRepository: Repository<Airplane>
    ) {}

    async modifyAirplane(userId: number, newAirplane: AirplaneDTO){
        let airplane = await this.airplaneRepository.findOne({where: {id: newAirplane.id}})
        if(userId!=airplane?.owner.id)
            throw new UnauthorizedException();
        airplane = await this.airplaneRepository.save({...newAirplane, aircraftType: {id: newAirplane.aircraftType.id}});
        return plainToInstance(Airplane, airplane, {
            excludeExtraneousValues: true
        })
    }

    async getAirplanesByAssignedUser(userId: number){
        // let airplanes = await this.airplaneRepository.find({where: {registration: Like(`%${registration}%`)}, take: 20})
        const airplanes = await this.airplaneRepository
        .createQueryBuilder("airplane")
        .innerJoin("airplane.flights", "flight")
        .leftJoinAndSelect("airplane.aircraftType", "aircraftType")
        // .leftJoinAndSelect("airplane.flights", "flights")
        .leftJoinAndSelect("airplane.owner", "owner")
        .where("flight.userId = :userId", { userId })
        .distinct(true)
        .getMany();

        airplanes.forEach((airplane)=>{
            if(airplane.owner.id == userId){
                airplane.canEdit = true;
            }
        })

        const result = (plainToInstance(AirplaneDTO, airplanes, {
            excludeExtraneousValues: true,
        }));
        return result;
    }

    getTypes(type: string){
        return(this.airplaneTypesRepo.find({where: [{model: Like(`%${type}%`)}, {type: Like(`%${type}%`)}], take: 20} ));
    }

    getTypeById(id: number){
        return(this.airplaneTypesRepo.findOne({where: {id: id}}));
    }

    async getAirplanesByRegistration(registration: string){
        let airplanes = await this.airplaneRepository.find({where: {registration: Like(`%${registration}%`)}, take: 20})
        return(airplanes)
    }

    async getAirplaneByRegistration(userId:number, registration: string, aircraftTypeId: number){
        let airplane = await this.airplaneRepository.findOne({where: {registration: registration}});
        if(airplane == null)
            airplane = await this.airplaneRepository.save({registration: registration, owner: {id: userId}, aircraftType: {id: aircraftTypeId}});
        return airplane;
    }

}
