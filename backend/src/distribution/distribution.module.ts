import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributionJob } from '../entities/distribution-job.entity';
import { Release } from '../entities/release.entity';
import { DistributionService } from './distribution.service';
import { DistributionController } from './distribution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DistributionJob, Release])],
  providers: [DistributionService],
  controllers: [DistributionController],
})
export class DistributionModule {}
