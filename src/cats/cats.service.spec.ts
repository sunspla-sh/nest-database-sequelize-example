import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/sequelize';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { Sequelize } from 'sequelize-typescript';

describe('CatsService', () => {
  let catsService: CatsService;
  let catModel: typeof Cat;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: createMock<typeof Cat>(),
        },
        {
          provide: Sequelize,
          useValue: createMock<Sequelize>(),
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catModel = moduleRef.get<typeof Cat, DeepMocked<typeof Cat>>(
      getModelToken(Cat),
    );
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it('should be instance of CatsService', () => {
    expect(catsService).toBeInstanceOf(CatsService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      throw new Error();
    });
  });

  describe('findOne', () => {
    it('should be a method', () => {
      throw new Error();
    });
  });

  describe('createMany', () => {
    it('should be a method', () => {
      throw new Error();
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      throw new Error();
    });
  });
});
