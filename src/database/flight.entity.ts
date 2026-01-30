import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Airplane } from "./airplane.entity";
import { Expose } from "class-transformer";
import { AirportEntity } from "./airport.entity";
@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;
    @Column()
    userId: number;
    @Expose()
    @ManyToOne(() => AirportEntity, { eager: true })
    @JoinColumn({ name: "departureAerodromeId" })   // klucz obcy w tabeli Flight
    departureAerodrome: AirportEntity;

    @Expose()
    @ManyToOne(() => AirportEntity, { eager: true })
    @JoinColumn({ name: "arrivalAerodromeId" })     // klucz obcy w tabeli Flight
    arrivalAerodrome: AirportEntity;

    @Expose()
    @Column({type: 'time'})
    departureTime: Date;
    @Expose()
    @Column({type: 'time'})
    arrivalTime: Date;
    @Expose()
    @Column({type: 'date'})
    flightDate: Date;
    @Expose()
    @ManyToOne(()=>Airplane, { eager: true })
    aircraft: Airplane;
    // @ManyToOne(()=>Airplane)
    // airplane: Airplane
    @Expose()
    @Column()
    SinglePilotSeTime: string;
    @Expose()
    @Column()
    SinglePilotMeTime: string;
    @Expose()
    @Column()
    multiPilotTime: string;
    @Expose()
    @Column()
    totalTime: string;
    @Expose()
    @Column()
    picName: string;
    @Expose()
    @Column()
    landingsDay: number;
    @Expose()
    @Column()
    landingsNight: number;
    @Expose()
    @Column()
    flightConditionNightTime: string;
    @Expose()
    @Column()
    flightConditionIfrTime: string;
    @Expose()
    @Column()
    picTime: string;
    @Expose()
    @Column()
    copilotTime: string;
    @Expose()
    @Column()
    dualTime: string;
    @Expose()
    @Column()
    instructorTime: string;
    @Expose()
    @Column()
    remarks: string;

    @Expose()
    canEdit?: boolean;

}