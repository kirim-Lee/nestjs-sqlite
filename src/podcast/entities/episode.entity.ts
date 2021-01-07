import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Field(type => String)
  @Column()
  title: string;

  @Field(type => String)
  @Column()
  category: string;

  @ManyToOne(type => Podcast, podcast => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;

  @RelationId((episode: Episode) => episode.podcast)
  podcastId: number;
}
