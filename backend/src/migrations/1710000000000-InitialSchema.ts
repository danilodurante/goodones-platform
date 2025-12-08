import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1710000000000 implements MigrationInterface {
  name = 'InitialSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";

      CREATE TABLE labels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        website TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        label_id UUID REFERENCES labels(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE releases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        primary_artist TEXT NOT NULL,
        upc TEXT,
        release_date DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE tracks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        release_id UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        isrc TEXT NOT NULL,
        track_number INT NOT NULL,
        audio_file_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE radio_campaigns (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        release_id UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        radio_date DATE NOT NULL,
        promo_text TEXT NOT NULL,
        target_list_id TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        provider TEXT,
        external_id TEXT,
        provider_status TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE distribution_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        release_id UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending',
        payload JSONB,
        error_message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE analytics_events (
        id BIGSERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        source TEXT NOT NULL,
        label_id UUID REFERENCES labels(id) ON DELETE SET NULL,
        release_id UUID REFERENCES releases(id) ON DELETE SET NULL,
        radio_campaign_id UUID REFERENCES radio_campaigns(id) ON DELETE SET NULL,
        distribution_job_id UUID REFERENCES distribution_jobs(id) ON DELETE SET NULL,
        occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        meta JSONB
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS analytics_events;
      DROP TABLE IF EXISTS distribution_jobs;
      DROP TABLE IF EXISTS radio_campaigns;
      DROP TABLE IF EXISTS tracks;
      DROP TABLE IF EXISTS releases;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS labels;
    `);
  }
}
