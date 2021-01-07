import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastOutput,
  PodcastsOuput,
  EpisodesOutput,
} from './dtos/podcast.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>
  ) {}

  async getAllPodcasts(): Promise<PodcastsOuput> {
    try {
      const podcasts = await this.podcasts.find();
      return { ok: true, podcasts };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastDto): Promise<CoreOutput> {
    try {
      await this.podcasts.save(
        this.podcasts.create({ title, category, rating: 0 })
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(id);

      if (!podcast) {
        throw Error('podcast is not exist');
      }

      return { ok: true, podcast };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast(id);

      if (!ok) {
        return { ok, error };
      }

      await this.podcasts.delete(id);

      return { ok };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async updatePodcast({ id, ...rest }: UpdatePodcastDto): Promise<CoreOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      await this.podcasts.save({ ...podcast, ...rest });
      return { ok };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const podcast = await this.podcasts.findOne(podcastId, {
        relations: ['episodes'],
      });

      if (!podcast) {
        throw Error('podcast is not exist');
      }

      return { ok: true, episodes: podcast.episodes };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async createEpisode({
    id: podcastId,
    title,
    category,
  }: CreateEpisodeDto): Promise<CoreOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);

      if (!ok) {
        return { ok, error };
      }

      await this.episodes.save(
        this.episodes.create({ title, category, podcast })
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async deleteEpisode(episodeId: number): Promise<CoreOutput> {
    try {
      const episode = await this.episodes.findOne(episodeId);

      if (!episode) {
        throw Error('episode is not exist');
      }

      await this.episodes.delete(episodeId);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async updateEpisode({
    episodeId,
    ...rest
  }: UpdateEpisodeDto): Promise<CoreOutput> {
    try {
      const episode = await this.episodes.findOne(episodeId);

      if (!episode) {
        throw Error('episode is not exist');
      }

      await this.episodes.save({ ...episode, ...rest });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
