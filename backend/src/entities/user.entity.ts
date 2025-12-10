import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Label } from './label.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column()
  role!: string;

  @ManyToOne(() => Label, (label) => label.users, { nullable: true })
  @JoinColumn({ name: 'label_id' })
  label?: Label | null;
}
