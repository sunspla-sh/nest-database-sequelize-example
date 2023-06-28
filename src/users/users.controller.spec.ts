import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: DeepMocked<UsersService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker(createMock)
      .compile();
    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService, DeepMocked<UsersService>>(
      UsersService,
    );
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should be instance of UsersController', () => {
    expect(usersController).toBeInstanceOf(UsersController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(usersController.findAll).toEqual(expect.any(Function));
    });
    it('should invoke findAll method of an instance of UsersService', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
    it('should return a promise', () => {
      const fakeUserArray = [{}];
      usersService.findAll.mockResolvedValue(fakeUserArray as User[]);
      expect(usersController.findAll()).toEqual(expect.any(Promise));
    });
  });

  describe('findOne', () => {
    it('should be a method', () => {
      expect(usersController.findOne).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      usersController.findOne(fakeId);
      expect(usersService.findOne).toHaveBeenCalledWith(fakeId);
    });
    it('should return a promise', () => {
      const fakeUser = {};
      const fakeId = 1;
      usersService.findOne.mockResolvedValue(fakeUser as User);
      expect(usersController.findOne(fakeId)).toEqual(expect.any(Promise));
    });
  });
  describe('create', () => {
    it('should be a method', () => {
      expect(usersController.create).toEqual(expect.any(Function));
    });
    it('should invoke create method of an instance of UsersService with a CreateUserDto argument', () => {
      const fakeCreateUserDto = {};
      usersController.create(fakeCreateUserDto as CreateUserDto);
      expect(usersService.create).toHaveBeenCalledWith(fakeCreateUserDto);
    });
    it('should return a promise', () => {
      const fakeCreateUserDto = {};
      const fakeUser = {};
      usersService.create.mockResolvedValue(fakeUser as User);
      expect(
        usersController.create(fakeCreateUserDto as CreateUserDto),
      ).toEqual(expect.any(Promise));
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(usersController.remove).toEqual(expect.any(Function));
    });
    it('should invoke remove method of an instance of UsersService with a number argument', () => {
      const fakeId = 1;
      usersController.remove(fakeId);
      expect(usersService.remove).toHaveBeenCalledWith(fakeId);
    });
    it('should return a promise', () => {
      const fakeId = 1;
      usersService.remove.mockResolvedValue();
      expect(usersController.remove(fakeId)).toEqual(expect.any(Promise));
    });
  });
});
