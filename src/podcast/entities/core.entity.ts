import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InputType, Field } from '@nestjs/graphql';

@Entity()
@InputType('CoreEntityInput', { isAbstract: true })
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;
}
