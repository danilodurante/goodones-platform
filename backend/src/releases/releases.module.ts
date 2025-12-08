import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Release } from '../entities/release.entity';
import { Track } from '../entities/track.entity';
import { Label } from '../entities/label.entity';
import { ReleasesService } from './releases.service';
import { ReleasesController } from './releases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Release, Track, Label])],
  providers: [ReleasesService],
  controllers: [ReleasesController],
  exports: [ReleasesService],
})
export class ReleasesModule {}
