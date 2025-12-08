import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RadioCampaignsService } from './radio-campaigns.service';
import { CreateRadioCampaignDto } from './dto/create-radio-campaign.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('releases/:releaseId/radio-campaigns')
export class RadioCampaignsController {
  constructor(private readonly radioService: RadioCampaignsService) {}

  @Post()
  create(
    @Param('releaseId') releaseId: string,
    @Body() dto: CreateRadioCampaignDto,
  ) {
    return this.radioService.create(releaseId, dto);
  }

  @Get(':campaignId/payload')
  payload(@Param('campaignId') campaignId: string) {
    return this.radioService.buildPayload(campaignId);
  }

  @Post(':campaignId/send')
  send(@Param('campaignId') campaignId: string) {
    return this.radioService.sendCampaign(campaignId);
  }
}
