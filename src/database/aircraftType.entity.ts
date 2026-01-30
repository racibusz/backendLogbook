import { Expose } from "class-transformer";
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class AirplaneType {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;
    @Expose()
    @Column()
    @Expose()
    model: string;
    @Expose()
    @Column()
    type: string;
    @Expose()
    @Column()
    category: string;
}