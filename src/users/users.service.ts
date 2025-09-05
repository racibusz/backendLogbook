import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';
import {hashSync, genSaltSync} from 'bcrypt';
import { RegisterDTO } from '../auth/registerDTO';
import { userDTO } from './userDTO';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async findOneByEmail(email: string) {
        const result = await this.userRepository.findOne({ where: { email: email } });
        return result;
    }
    async findOneById(id: number){
        const result = await this.userRepository.findOne({where: {id: id}});
        return result;
    }
    async registerUser(registerDTO: RegisterDTO){
        return this.userRepository.save(new User(registerDTO.email, hashSync(registerDTO.password, genSaltSync(10))));
    }
    async modifyUser(id:number, newUser: userDTO){
        const user = await this.findOneById(id);
        if(!user){
            throw new NotFoundException("User not found");
        }
        Object.assign(user, newUser);
        return this.userRepository.save(user);
    }
}
