import { Conversion } from 'src/conversion/conversion.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity()
export class User{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Conversion, conversion => conversion.user)
  conversions: Conversion[];
}