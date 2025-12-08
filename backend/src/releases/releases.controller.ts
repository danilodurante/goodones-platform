import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Post('labels/:labelId/releases')
  create(
    @Param('labelId') labelId: string,
    @Body() dto: CreateReleaseDto,
  ) {
    return this.releasesService.create(labelId, dto);
  }

  @Get('labels/:labelId/releases/:id')
  findOne(@Param('id') id: string) {
    return this.releasesService.findOne(id);
  }
}
