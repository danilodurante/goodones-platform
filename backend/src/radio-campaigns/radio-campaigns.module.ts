import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadioCampaign } from '../entities/radio-campaign.entity';
import { Release } from '../entities/release.entity';
import { RadioCampaignsService } from './radio-campaigns.service';
import { RadioCampaignsController } from './radio-campaigns.controller';
import { PlayMpeClient } from './plaympe.client';

@Module({
  imports: [TypeOrmModule.forFeature([RadioCampaign, Release])],
  providers: [RadioCampaignsService, PlayMpeClient],
  controllers: [RadioCampaignsController],
})
export class RadioCampaignsModule {}
