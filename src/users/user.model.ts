import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Cat } from '../cats/cat.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Cat)
  cats: Cat[];
}
