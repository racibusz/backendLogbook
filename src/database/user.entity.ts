import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AirportEntity } from './airport.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Expose()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Expose()
    @Column()
    firstName: string;

    @Expose()
    @Column()
    lastName: string;

    @Expose()
    @Column()
    image: string;

    @Expose()
    @Column()
    address1: string;

    @Expose()
    @Column()
    address2: string;

    @Expose()
    @Column()
    address3: string;

    @OneToMany(() => AirportEntity, airport => airport.userThatAdded)
    airportsAdded: AirportEntity[];

    constructor(email: string, password_hash: string) {
        this.email = email;
        this.password = password_hash;
    }
}