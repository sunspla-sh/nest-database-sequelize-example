import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { instanceToPlain } from 'class-transformer';
import { Cat } from './cat.model';
import { CreateCatArrayDto } from './create-cat-array.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat) private catModel: typeof Cat,
    private sequelize: Sequelize,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catModel.findAll();
  }

  findOne(id: number): Promise<Cat> {
    return this.catModel.findOne({
      where: {
        id,
      },
    });
  }

  async createMany(createCatArrayDto: CreateCatArrayDto): Promise<void> {
    try {
      const catsArray = createCatArrayDto.action;
      await this.sequelize.transaction(async (transaction) => {
        for (let i = 0; i < catsArray.length; i++) {
          await this.catModel.create(instanceToPlain(catsArray[i]), {
            transaction,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await cat.destroy();
  }
}
