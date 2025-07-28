import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';
import {hashSync, genSaltSync} from 'bcrypt';
import { RegisterDTO } from '../auth/registerDTO';

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
    async registerUser(registerDTO: RegisterDTO){
        return this.userRepository.save(new User(registerDTO.email, hashSync(registerDTO.password, genSaltSync(10))));
    }
}
