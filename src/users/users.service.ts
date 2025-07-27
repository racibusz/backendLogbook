import { Injectable } from '@nestjs/common';


// TODO: Implement the UsersService with necessary methods and logic
// This is only for test
@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            email: 'john@doe.com',
            password: 'password123',
        },
        {
            id: 2,
            email: 'test@test.com',
            password: 'test123',
        }
    ];
    async findOneByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }
}
