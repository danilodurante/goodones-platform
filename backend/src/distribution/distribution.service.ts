import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistributionJob } from '../entities/distribution-job.entity';
import { Release } from '../entities/release.entity';

@Injectable()
export class DistributionService {
  constructor(
    @InjectRepository(DistributionJob)
    private readonly jobRepo: Repository<DistributionJob>,
    @InjectRepository(Release)
    private readonly releaseRepo: Repository<Release>,
  ) {}

  async triggerJob(releaseId: string) {
    const release = await this.releaseRepo.findOne({
      where: { id: releaseId },
      relations: ['tracks', 'label'],
    });
    if (!release) throw new NotFoundException('Release not found');

    const payload = {
      releaseId: release.id,
      title: release.title,
      artist: release.primaryArtist,
      label: release.label?.name,
      tracks: release.tracks?.map((t) => ({
        title: t.title,
        isrc: t.isrc,
        trackNumber: t.trackNumber,
      })),
    };

    const job = this.jobRepo.create({
      release,
      status: 'pending',
      payload,
    });

    return this.jobRepo.save(job);
  }

  async getJob(jobId: string) {
    const job = await this.jobRepo.findOne({
      where: { id: jobId },
      relations: ['release'],
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }
}
