import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/sequelize';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions, Transaction, TransactionOptions } from 'sequelize';
import { instanceToPlain } from 'class-transformer';
import { CreateCatArrayDto } from './create-cat-array.dto';

describe('CatsService', () => {
  let catsService: CatsService;
  let catModel: DeepMocked<typeof Cat>;
  let sequelize: DeepMocked<Sequelize>;

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
    sequelize = moduleRef.get<Sequelize, DeepMocked<Sequelize>>(Sequelize);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it('should be instance of CatsService', () => {
    expect(catsService).toBeInstanceOf(CatsService);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(catsService.findAll).toEqual(expect.any(Function));
    });
    it('should invoke static findAll method of cat model', () => {
      catsService.findAll();
      expect(catModel.findAll).toHaveBeenCalled();
    });
    it('should return the result of invoking the static findAll method of cat model', () => {
      expect(catModel.findAll).toHaveReturnedWith(catsService.findAll());
    });
  });

  describe('findOne', () => {
    it('should be a method', () => {
      expect(catsService.findOne).toEqual(expect.any(Function));
    });
    it('should invoke static findOne method of cat model with a FindOptions argument that finds one cat by id', () => {
      const fakeId = 1;
      catsService.findOne(fakeId);
      const fakeFindOptions: FindOptions = {
        where: {
          id: fakeId,
        },
      };
      expect(catModel.findOne).toHaveBeenCalledWith<[FindOptions]>(
        fakeFindOptions,
      );
    });
    it('should return the result of invoking the static findOne method of cat model', () => {
      const fakeId = 2;
      expect(catModel.findOne).toHaveReturnedWith(catsService.findOne(fakeId));
    });
  });

  describe('createMany', () => {
    it('should be a method', () => {
      expect(catsService.createMany).toEqual(expect.any(Function));
    });
    it('should invoke transaction method of an instance of Sequelize with a callback function argument', () => {
      const fakeCreateCatArrayDto: CreateCatArrayDto = new CreateCatArrayDto();
      catsService.createMany(fakeCreateCatArrayDto);
      expect(sequelize.transaction).toHaveBeenCalledWith(expect.any(Function));
    });
    it('should invoke static create method of Cat model for n times, where n is the length of the action array (which contains CreateCatDto objects)', async () => {
      const fakeCreateCatArrayDto: CreateCatArrayDto = new CreateCatArrayDto();
      fakeCreateCatArrayDto.action = [
        { name: 'bob', age: 2 },
        { name: 'tim', age: 3 },
      ];
      /**
       * here we had to declare a type matching the overload that we wanted to use for sequelize.transaction
       * see https://javascript.plainenglish.io/mocking-ts-method-overloads-with-jest-e9c3d3f1ce0c for more details
       */
      type AutoCallback = (
        autoCallback: (t: Transaction) => PromiseLike<void>,
      ) => Promise<void>;
      /**
       * here we had to typecast sequelize.transaction to match the overload that we wanted to test and
       * provide a fake implementation that properly invoked the expected callback function
       */
      (sequelize.transaction as unknown as AutoCallback) = jest.fn(
        async (cb) => {
          cb({} as Transaction);
        },
      );
      await catsService.createMany(fakeCreateCatArrayDto);
      expect(catModel.create).toHaveBeenCalledTimes(
        fakeCreateCatArrayDto.action.length,
      );
    });
  });

  describe('remove', () => {
    it('should be a method', () => {
      expect(catsService.remove).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of an instance of CatsService with a number argument', () => {
      const fakeId = 1;
      const spy = jest.spyOn(catsService, 'findOne');
      catsService.remove(fakeId);
      expect(spy).toHaveBeenCalledWith(fakeId);
    });
    it('should invoke destroy method of an instance of Cat if cat exists', async () => {
      const fakeId = 2;
      const fakeCat = {
        id: fakeId,
        name: 'fluffy',
        age: 5,
        destroy: jest.fn().mockResolvedValue(true),
      };
      catModel.findOne.mockResolvedValue(fakeCat as unknown as Cat);
      await catsService.remove(fakeId);
      expect(fakeCat.destroy).toHaveBeenCalled();
    });

    it('should not invoke destroy method of an instance of Cat if cat does not exist', async () => {
      const fakeId = 2;
      const fakeCat = {
        id: fakeId,
        name: 'fluffy',
        age: 5,
        destroy: jest.fn().mockResolvedValue(true),
      };
      catModel.findOne.mockResolvedValue(null);
      await catsService.remove(fakeId);
      expect(fakeCat.destroy).not.toHaveBeenCalled();
    });
  });
});
