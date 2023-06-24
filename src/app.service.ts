import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}
  getHello(): string {
    console.log(this.sequelize);
    return 'Hello World!';
  }
}
