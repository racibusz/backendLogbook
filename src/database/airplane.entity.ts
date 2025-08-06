import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneType } from "./aircraftType.entity";

@Entity()
export class Airplane {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>AirplaneType, {eager: true})
    aircraftType: AirplaneType;

    @Column()
    registration: string;
}