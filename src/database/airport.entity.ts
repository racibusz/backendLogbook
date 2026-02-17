import { Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class AirportEntity {
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

    @ManyToOne(() => User, user => user.airportsAdded, { eager: true })
    @JoinColumn()
    userThatAdded: User;
}