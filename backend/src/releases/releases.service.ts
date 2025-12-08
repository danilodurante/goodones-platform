import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Release } from '../entities/release.entity';
import { Track } from '../entities/track.entity';
import { Label } from '../entities/label.entity';
import { CreateReleaseDto } from './dto/create-release.dto';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(Release)
    private readonly releaseRepo: Repository<Release>,
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    @InjectRepository(Label)
    private readonly labelRepo: Repository<Label>,
  ) {}

  async create(labelId: string, dto: CreateReleaseDto) {
    const label = await this.labelRepo.findOne({ where: { id: labelId } });
    if (!label) throw new NotFoundException('Label not found');

    const release = this.releaseRepo.create({
      title: dto.title,
      type: dto.type,
      primaryArtist: dto.primaryArtist,
      upc: dto.upc,
      releaseDate: new Date(dto.releaseDate),
      label,
    });

    const saved = await this.releaseRepo.save(release);

    const tracks = dto.tracks.map((t) =>
      this.trackRepo.create({
        title: t.title,
        isrc: t.isrc,
        trackNumber: t.trackNumber,
        release: saved,
      }),
    );
    await this.trackRepo.save(tracks);

    return this.releaseRepo.findOne({
      where: { id: saved.id },
      relations: ['tracks', 'label'],
    });
  }

  async findOne(id: string) {
    const release = await this.releaseRepo.findOne({
      where: { id },
      relations: ['tracks', 'label'],
    });
    if (!release) throw new NotFoundException('Release not found');
    return release;
  }
}
