import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatArrayDto } from './create-cat-array.dto';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: DeepMocked<CatsService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker(createMock)
      .compile();
    catsController = moduleRef.get<CatsController>(CatsController);
    catsService = moduleRef.get<CatsService, DeepMocked<CatsService>>(
      CatsService,
    );
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  it('should be an instance of CatsController', () => {
    expect(catsController).toBeInstanceOf(CatsController);
  });

  describe('findAll', () => {
    it('should be a method', () => {
      expect(catsController.findAll).toEqual(expect.any(Function));
    });
    it('should invoke findAll method of an instance of CatsService', () => {
      catsController.findAll();
      expect(catsService.findAll).toHaveBeenCalled();
    });
    it('should return the result of invoking the findAll method of an instance of CatsService', () => {
      expect(catsService.findAll).toHaveReturnedWith(catsController.findAll());
    });
  });
  describe('findOne', () => {
    it('should be a method', () => {
      expect(catsController.findOne).toEqual(expect.any(Function));
    });
    it('should invoke findOne method of an instance of CatsService with a number argument', () => {
      const fakeId = 1;
      catsController.findOne(fakeId);
      expect(catsService.findOne).toHaveBeenCalledWith(fakeId);
    });
    it('should return the result of invoking the findOne method of an instance of CatsService', () => {
      const fakeId = 2;
      expect(catsService.findOne).toHaveReturnedWith(
        catsController.findOne(fakeId),
      );
    });
  });
  describe('createMany', () => {
    it('should be a method', () => {
      expect(catsController.createMany).toEqual(expect.any(Function));
    });
    it('should invoke createMany method of an instance of CatsService with a CreateCatArrayDto argument', () => {
      const fakeCreateCatArrayDto = new CreateCatArrayDto();
      catsController.createMany(fakeCreateCatArrayDto);
      expect(catsService.createMany).toHaveBeenCalledWith<[CreateCatArrayDto]>(
        fakeCreateCatArrayDto,
      );
    });
    it('should return the result of invoking the createMany method of an instance of CatsService with a CreateCatArrayDto argument', () => {
      const fakeCreateCatArrayDto = new CreateCatArrayDto();
      expect(catsService.createMany).toHaveReturnedWith(
        catsController.createMany(fakeCreateCatArrayDto),
      );
    });
  });
  describe('remove', () => {
    it('should be a method', () => {
      expect(catsController.remove).toEqual(expect.any(Function));
    });
    it('should invoke remove method of an instance of CatsService with a number argument', () => {
      const fakeId = 1;
      catsController.remove(fakeId);
      expect(catsService.remove).toHaveBeenCalledWith(fakeId);
    });
    it('should return the result of invoking the remove method of an instance of CatsService with a number argument', () => {
      const fakeId = 2;
      expect(catsService.remove).toHaveReturnedWith(
        catsController.remove(fakeId),
      );
    });
  });
});
