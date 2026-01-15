import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    email: string;
    @Column()
    @Exclude()
    password: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    image: string;
    @Column()
    address1: string;
    @Column()
    address2:string;
    @Column()
    address3:string;
    constructor(email: string, password_hash: string){
        this.email = email;
        this.password = password_hash;
    }
}
