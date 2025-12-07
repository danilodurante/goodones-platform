import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Release } from './release.entity';

@Entity('distribution_jobs')
export class DistributionJob extends BaseEntity {
  @ManyToOne(() => Release, (release) => release.id, { onDelete: 'CASCADE' })
  release: Release;

  @Column()
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @Column({ nullable: true })
  errorMessage: string;
}
