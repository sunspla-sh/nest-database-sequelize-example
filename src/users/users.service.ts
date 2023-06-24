import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    // return this.userModel.create({ firstName: createUserDto.firstName, lastName: createUserDto.lastName });
    return this.userModel.create(instanceToPlain(createUserDto));
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
