import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneType } from "./aircraftType.entity";
import { Flight } from "./flight.entity";
import { User } from "./user.entity";
import { userDTO } from "../users/userDTO";

@Entity()
export class Airplane {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>AirplaneType, {eager: true})
    aircraftType: AirplaneType;

    @OneToMany(() => Flight, flight => flight.aircraft)
    flights: Flight[];

    @Column()
    registration: string;

    @ManyToOne(()=>User, user => user.id, {eager: true})
    owner: User;
}