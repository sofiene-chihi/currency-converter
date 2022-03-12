import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Conversion{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    currencyFrom: string;
    @Column()
    currencyTo: string;
    @Column()
    amountInitial: Number;
    @Column()
    amountResult: Number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @ManyToOne(type => User, user => user.conversions)
    user: User;
}

