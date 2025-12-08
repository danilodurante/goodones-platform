import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RadioCampaign } from '../entities/radio-campaign.entity';
import { Release } from '../entities/release.entity';
import { CreateRadioCampaignDto } from './dto/create-radio-campaign.dto';
import { PlayMpeClient } from './plaympe.client';

@Injectable()
export class RadioCampaignsService {
  constructor(
    @InjectRepository(RadioCampaign)
    private readonly campaignRepo: Repository<RadioCampaign>,
    @InjectRepository(Release)
    private readonly releaseRepo: Repository<Release>,
    private readonly playMpeClient: PlayMpeClient,
  ) {}

  async create(releaseId: string, dto: CreateRadioCampaignDto) {
    const release = await this.releaseRepo.findOne({
      where: { id: releaseId },
      relations: ['tracks', 'label'],
    });
    if (!release) throw new NotFoundException('Release not found');

    const campaign = this.campaignRepo.create({
      title: dto.title,
      radioDate: new Date(dto.radioDate),
      promoText: dto.promoText,
      targetListId: dto.targetListId,
      status: 'draft',
      release,
    });

    return this.campaignRepo.save(campaign);
  }

  async buildPayload(campaignId: string) {
    const campaign = await this.campaignRepo.findOne({
      where: { id: campaignId },
      relations: ['release', 'release.tracks', 'release.label'],
    });
    if (!campaign) throw new NotFoundException('Campaign not found');

    const mainTrack = campaign.release.tracks[0];

    return {
      subject: campaign.title,
      radioDate: campaign.radioDate,
      promoText: campaign.promoText,
      label: campaign.release.label?.name,
      mainTrack: mainTrack
        ? { title: mainTrack.title, isrc: mainTrack.isrc }
        : null,
      links: {},
    };
  }

  async sendCampaign(campaignId: string) {
    const payload = await this.buildPayload(campaignId);
    const campaign = await this.campaignRepo.findOne({
      where: { id: campaignId },
      relations: ['release'],
    });
    if (!campaign) throw new NotFoundException('Campaign not found');

    const result = await this.playMpeClient.send(payload);

    campaign.status = 'sent';
    campaign.provider = 'plaympe';
    campaign.externalId = result.externalId;
    campaign.providerStatus = result.status;

    await this.campaignRepo.save(campaign);

    return {
      message: 'Campaign sent to Fake PlayMPE',
      provider: 'plaympe',
      externalId: result.externalId,
      providerStatus: result.status,
    };
  }
}
