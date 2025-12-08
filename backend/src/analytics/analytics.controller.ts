import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('releases/:releaseId/radio')
  getRadio(@Param('releaseId') releaseId: string) {
    return this.analyticsService.getRadioOverview(releaseId);
  }
}
