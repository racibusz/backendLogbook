import { Column, Entity, Generated, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Endorsement } from "./endorsement.entity";
import { User } from "./user.entity";

@Entity()
export class License {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User)
    user: User;

    @Column()
    number: string;

    @OneToMany(() => Endorsement, (endorsement) => endorsement.license, {
        cascade: true,
        eager: true
    })
    endorsements: Endorsement[];
}