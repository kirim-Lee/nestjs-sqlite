import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver, EpisodeResolver } from './podcasts.resolver';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [PodcastsService, PodcastsResolver, EpisodeResolver],
})
export class PodcastsModule {}
