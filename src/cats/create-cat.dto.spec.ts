import { CreateCatDto, createCatDtoTypeFunction } from './create-cat.dto';

describe('CreateCatDto', () => {
  describe('createCatDtoTypeFunction', () => {
    it('should be defined', () => {
      expect(createCatDtoTypeFunction).toBeDefined();
    });
    it('should be a function', () => {
      expect(createCatDtoTypeFunction).toEqual(expect.any(Function));
    });
    it('should return a reference to the CreateCatArrayDto class', () => {
      // const val = createCatDtoTypeFunction();
      expect(createCatDtoTypeFunction()).toBe(CreateCatDto);
    });
  });
});
