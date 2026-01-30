import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneType } from "./aircraftType.entity";
import { Flight } from "./flight.entity";
import { User } from "./user.entity";
import { userDTO } from "../users/userDTO";
import { Expose } from "class-transformer";

@Entity()
export class Airplane {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ManyToOne(()=>AirplaneType, {eager: true})
    aircraftType: AirplaneType;

    @OneToMany(() => Flight, flight => flight.aircraft)
    flights: Flight[];

    @Expose()
    @Column()
    registration: string;

    @Expose()
    @Column()
    pricePerHour: number;

    @Expose()
    @ManyToOne(()=>User, user => user.id, {eager: true})
    owner: User;

    canEdit?:boolean;
}