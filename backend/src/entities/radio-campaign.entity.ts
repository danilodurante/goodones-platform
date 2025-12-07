import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Release } from './release.entity';

@Entity('radio_campaigns')
export class RadioCampaign extends BaseEntity {
  @ManyToOne(() => Release, (release) => release.id, { onDelete: 'CASCADE' })
  release: Release;

  @Column()
  title: string;

  @Column()
  radioDate: Date;

  @Column('text')
  promoText: string;

  @Column({ nullable: true })
  targetListId: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  externalId: string;

  @Column({ nullable: true })
  providerStatus: string;
}
