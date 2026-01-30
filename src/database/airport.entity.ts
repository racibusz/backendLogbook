import { Expose } from "class-transformer";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AirportEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @Expose()
    name: string;
    @Column('float')
    @Expose()
    latitute: number;
    @Column('float')
    @Expose()
    longtitute: number;
    @Column()
    @Expose()
    icaoCode: string;
    @Column()
    @Expose()
    elevation: number;  
}