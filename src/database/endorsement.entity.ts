import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { License } from "./license.entity";

@Entity()
export class Endorsement {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    flightHoursReneval: boolean;
    @ManyToOne(() => License, (license) => license.endorsements, {
        onDelete: 'CASCADE',
    })
    license: License;
    
    @Column()
    expirationDate: Date;

    extensionStatus: boolean[];
}