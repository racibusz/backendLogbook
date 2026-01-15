import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneType } from "./aircraftType.entity";
import { Flight } from "./flight.entity";

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
}