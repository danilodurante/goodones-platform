import { DataSource } from 'typeorm';
import { Label } from '../entities/label.entity';
import { User } from '../entities/user.entity';
import { Release } from '../entities/release.entity';
import { Track } from '../entities/track.entity';
import { RadioCampaign } from '../entities/radio-campaign.entity';
import { DistributionJob } from '../entities/distribution-job.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Label,
    User,
    Release,
    Track,
    RadioCampaign,
    DistributionJob,
  ],
  synchronize: false,
  logging: true,
});
