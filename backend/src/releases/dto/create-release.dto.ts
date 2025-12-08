import {
  IsArray,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TrackInputDto {
  @IsString()
  title: string;

  @IsString()
  isrc: string;

  @Type(() => Number)
  trackNumber: number;
}

export class CreateReleaseDto {
  @IsString()
  title: string;

  @IsIn(['single', 'ep', 'album'])
  type: string;

  @IsString()
  primaryArtist: string;

  @IsDateString()
  releaseDate: string;

  @IsOptional()
  @IsString()
  upc?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackInputDto)
  tracks: TrackInputDto[];
}
