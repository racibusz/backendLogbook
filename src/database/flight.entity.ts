import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Airplane } from "./airplane.entity";
@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    departureAerodrome: string;
    @Column()
    arrivalAerodrome: string;
    @Column({type: 'time'})
    departureTime: Date;
    @Column({type: 'time'})
    arrivalTime: Date;
    @Column({type: 'date'})
    flightDate: Date;
    @ManyToOne(()=>Airplane, { eager: true })
    aircraft: Airplane;
    // @ManyToOne(()=>Airplane)
    // airplane: Airplane
    @Column()
    SinglePilotSeTime: string;
    @Column()
    SinglePilotMeTime: string;
    @Column()
    multiPilotTime: string;
    @Column()
    totalTime: string;
    @Column()
    picName: string;
    @Column()
    landingsDay: number;
    @Column()
    landingsNight: number;
    @Column()
    flightConditionNightTime: string;
    @Column()
    flightConditionIfrTime: string;
    @Column()
    picTime: string;
    @Column()
    copilotTime: string;
    @Column()
    dualTime: string;
    @Column()
    instructorTime: string;
    @Column()
    remarks: string;

}