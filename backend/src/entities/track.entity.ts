import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Release } from './release.entity';

@Entity('tracks')
export class Track extends BaseEntity {
  @ManyToOne(() => Release, (release) => release.tracks, { onDelete: 'CASCADE' })
  release: Release;

  @Column()
  title: string;

  @Column()
  isrc: string;

  @Column()
  trackNumber: number;

  @Column({ nullable: true })
  audioFileUrl: string;
}
