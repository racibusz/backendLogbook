import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    address2:string;
    @Expose()
    @Column()
    address3:string;
    constructor(email: string, password_hash: string){
        this.email = email;
        this.password = password_hash;
    }
}
