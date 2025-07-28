import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    email: string;
    @Column()
    password: string;
    constructor(email: string, password_hash: string){
        this.email = email;
        this.password = password_hash;
    }
}
