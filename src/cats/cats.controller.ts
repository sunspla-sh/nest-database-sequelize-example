import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';
import { CreateCatArrayDto } from './create-cat-array.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Post()
  createMany(@Body() createCatArrayDto: CreateCatArrayDto): Promise<void> {
    return this.catsService.createMany(createCatArrayDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.catsService.remove(id);
  }
}
