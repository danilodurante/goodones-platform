import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Label } from './label.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  role: string;

  @ManyToOne(() => Label, (label) => label.users, { onDelete: 'CASCADE' })
  label: Label;
}
