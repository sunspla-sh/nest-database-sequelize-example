import { IsArray } from 'class-validator';
import { CreateCatDto } from './create-cat.dto';

export class CreateCatArrayDto {
  @IsArray({
    each: true,
  })
  action: CreateCatDto[];
}
