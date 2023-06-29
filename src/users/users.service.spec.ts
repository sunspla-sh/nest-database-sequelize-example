import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { FindOptions, Optional } from 'sequelize';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';
import { instanceToPlain } from 'class-transformer';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: DeepMocked<typeof User>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: createMock<typeof User>(),
        },
      ],
    })
      // .useMocker(createMock)
      .compile();
    usersService = moduleRef.get<UsersService>(UsersService);
    userModel = moduleRef.get<typeof User, DeepMocked<typeof User>>(
      getModelToken(User),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be an instance of UsersService', () => {
    expect(usersService).toBeInstanceOf(UsersService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(usersService.findAll).toEqual(expect.any(Function));
    });
    it('should invoke findAll method of an instance of User model', () => {
      usersService.findAll();
      expect(userModel.findAll).toHaveBeenCalled();
    });
    it('should return a promise', () => {
      const fakeUser = {};
      userModel.findAll.mockResolvedValue([fakeUser as User]);
      expect(usersService.findAll()).toEqual(expect.any(Promise));
    });
  });
  describe('findOne', () => {
    it('should be a method', () => {
      expect(usersService.findOne).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of an instance of User model with a findOptions argument', () => {
      const fakeId = 1;
      usersService.findOne(fakeId);
      expect(userModel.findOne).toHaveBeenCalledWith<[FindOptions]>({
        where: { id: fakeId },
      });
    });
    it('should return a promise', () => {
      const fakeId = 1;
      const fakeUser = {};
      userModel.findOne.mockResolvedValue(fakeUser as User);
      expect(usersService.findOne(fakeId)).toEqual(expect.any(Promise));
    });
  });
  describe('create', () => {
    it('should be a method', () => {
      expect(usersService.create).toEqual(expect.any(Function));
    });
    it('should invoke create method of an instance of User model with an Optional argument', () => {
      const fakeCreateUserDto = new CreateUserDto();
      fakeCreateUserDto.firstName = 'jimmy';
      fakeCreateUserDto.lastName = 'smith';
      const plainUserObj = instanceToPlain(fakeCreateUserDto);
      usersService.create(fakeCreateUserDto);
      expect(userModel.create).toHaveBeenCalledWith<[Optional<any, string>]>(
        plainUserObj,
      );
    });
    it('should return a promise', () => {
      const fakeCreateUserDto = new CreateUserDto();
      fakeCreateUserDto.firstName = 'jimmy';
      fakeCreateUserDto.lastName = 'smith';
      jest.spyOn(userModel, 'create').mockResolvedValue({} as User);
      expect(usersService.create(fakeCreateUserDto)).toEqual(
        expect.any(Promise),
      );
    });
  });
  describe('remove', () => {
    it('should be a method', () => {
      expect(usersService.remove).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of an instance of UsersService with a findOptions argument', () => {
      const fakeId = 5;
      const spy = jest.spyOn(usersService, 'findOne');
      usersService.remove(fakeId);
      expect(spy).toHaveBeenCalledWith(5);
    });
    it('should invoke destroy method of an instance of User if user exists', async () => {
      const fakeId = 7;
      const fakeUser = {
        id: fakeId,
        firstName: 'jimmy',
        lastName: 'smith',
        destroy: jest.fn().mockResolvedValue(true),
      };
      userModel.findOne.mockResolvedValue(fakeUser as unknown as User);
      await usersService.remove(fakeId);
      expect(fakeUser.destroy).toHaveBeenCalled();
    });
    it('should return a promise', () => {
      const fakeId = 1;
      expect(usersService.remove(fakeId)).toEqual(expect.any(Promise));
    });
  });
});
