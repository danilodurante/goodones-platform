import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Label } from './label.entity';
import { Track } from './track.entity';

@Entity('releases')
export class Release extends BaseEntity {
  @ManyToOne(() => Label, (label) => label.releases, { onDelete: 'CASCADE' })
  label: Label;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  primaryArtist: string;

  @Column({ nullable: true })
  upc: string;

  @Column()
  releaseDate: Date;

  @OneToMany(() => Track, (track) => track.release)
  tracks: Track[];
}
