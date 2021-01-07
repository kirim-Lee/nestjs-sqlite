import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType('CoreEntityInput', { isAbstract: true })
@ObjectType()
@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;
}
