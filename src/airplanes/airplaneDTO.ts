import { AirplaneType } from "../database/aircraftType.entity";
import { Flight } from "../database/flight.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { userDTO } from "../users/userDTO";
import { Expose, Type } from "class-transformer";

@Entity()
export class AirplaneDTO {
    @Expose()
    id: number;

    @Expose()
    @Type(()=>AirplaneType)
    aircraftType: AirplaneType;

    // @Expose()
    @Type(()=>Flight)
    flights: Flight[];

    @Expose()
    pricePerHour: number;

    @Expose()
    registration: string;

    @Expose()
    @Type(()=>userDTO)
    owner: userDTO;

    @Expose()
    canEdit?:boolean;
}