import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from './user.entity';
import { Release } from './release.entity';

@Entity('labels')
export class Label extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => User, (user) => user.label)
  users: User[];

  @OneToMany(() => Release, (release) => release.label)
  releases: Release[];
}
