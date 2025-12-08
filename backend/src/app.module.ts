import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { User } from './entities/user.entity';
import { Release } from './entities/release.entity';
import { Track } from './entities/track.entity';
import { RadioCampaign } from './entities/radio-campaign.entity';
import { DistributionJob } from './entities/distribution-job.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReleasesModule } from './releases/releases.module';
import { DistributionModule } from './distribution/distribution.module';
import { RadioCampaignsModule } from './radio-campaigns/radio-campaigns.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
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
    }),
    UsersModule,
    AuthModule,
    ReleasesModule,
    DistributionModule,
    RadioCampaignsModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
