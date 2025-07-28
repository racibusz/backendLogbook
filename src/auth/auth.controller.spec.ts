import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { emitWarning } from 'process';
import { PassThrough } from 'stream';
import { access } from 'fs';
import { RegisterDTO } from './registerDTO';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  
  const mockAuthService = {
    singIn: jest.fn(dto=>{return {accessToken: 'mockToken'}}),
    register: jest.fn(dto => {
      return { id: 1, ...dto };
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('singIn', ()=>{
    // We test that singIn function in controller works.
    it('Should call singIn and return a token', async()=>{
      const dto = {email: 'test@test.com', password: '1234'};
      const result = await controller.logIn(dto);
      expect(result).toEqual({accessToken: 'mockToken'});
    });
  });
  describe("register", () => {
    it('should call register and return saved user data', async () => {
      const dto: RegisterDTO = { email: 'test@test.com', password: '123456'}
      const result = await controller.register(dto);
      expect(result).toEqual({id:1,...dto})
    })
    
    
  })
});
