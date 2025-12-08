import { Controller, Param, Post, Get, UseGuards } from '@nestjs/common';
import { DistributionService } from './distribution.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('releases')
export class DistributionController {
  constructor(private readonly distributionService: DistributionService) {}

  @Post(':id/distribution')
  trigger(@Param('id') id: string) {
    return this.distributionService.triggerJob(id);
  }

  @Get(':id/distribution/:jobId')
  getJob(@Param('jobId') jobId: string) {
    return this.distributionService.getJob(jobId);
  }
}
