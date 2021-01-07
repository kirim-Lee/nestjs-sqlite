import { Episode } from './episode.entity';
import { CoreEntity } from './core.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field(type => Number)
  @IsNumber()
  @Column()
  id: number;

  @Field(type => String)
  @IsString()
  @Column()
  title: string;

  @Field(type => String)
  @IsString()
  @Column()
  category: string;

  @Field(type => Number)
  @IsNumber()
  @Column()
  rating: number;

  @OneToMany(type => Episode, episode => episode.podcast)
  @Field(type => [Episode])
  episodes: Episode[];
}
