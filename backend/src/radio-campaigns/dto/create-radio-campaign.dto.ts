import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateRadioCampaignDto {
  @IsString()
  title: string;

  @IsDateString()
  radioDate: string;

  @IsString()
  promoText: string;

  @IsOptional()
  @IsString()
  targetListId?: string;
}
