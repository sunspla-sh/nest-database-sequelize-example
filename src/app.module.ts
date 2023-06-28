import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { Cat } from './cats/cat.model';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'nest_sequelize',
      models: [User, Cat],
      autoLoadModels: true, //if we don't have autoLoadModels set to true, no synchronization occurs and we have to manually create tables/migrations
      //synchronize automatically occurs when autoLoadModels is set to true (line 142 and 154 of sequelize-core.module.ts from @nestjs/sequelize)
      synchronize: true,
    }),
    UsersModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
