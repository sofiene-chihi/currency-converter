import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  currencyFrom: string;
  @Column()
  currencyTo: string;
  @Column('decimal', { precision: 10, scale: 3 })
  amountInitial: number;
  @Column('decimal', { precision: 10, scale: 3 })
  amountResult: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.conversions)
  user: User;
}
