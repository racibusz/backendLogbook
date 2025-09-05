import { Expose } from 'class-transformer';
export class userDTO{
    @Expose()
    email: string;
    @Expose()
    firstName: string;
    @Expose()
    lastName: string;
    @Expose()
    image: string;
    @Expose()
    address1: string;
    @Expose()
    address2: string;
    @Expose()
    address3: string;
}