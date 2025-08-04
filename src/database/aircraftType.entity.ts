import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AirplaneType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    model: string;
    @Column()
    type: string;
    @Column()
    category: string;
}