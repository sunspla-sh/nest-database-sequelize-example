import { Length } from 'class-validator';

export class CreateCatDto {
  @Length(1, 64)
  name: string;

  @Length(1, 64)
  age: string;
}
