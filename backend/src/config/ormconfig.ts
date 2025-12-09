import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Label } from '../entities/label.entity';
import { Release } from '../entities/release.entity';
import { Track } from '../entities/track.entity';
import { RadioCampaign } from '../entities/radio-campaign.entity';
import { DistributionJob } from '../entities/distribution-job.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'goodones',
  entities: [User, Label, Release, Track, RadioCampaign, DistributionJob],
  // 👇 qui il punto chiave: prendiamo sia .ts che .js
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});
