import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Release } from "./release.entity";

@Entity()
export class Label {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  website?: string;

  @OneToMany(() => User, (user) => user.label)
  users!: User[];

  @OneToMany(() => Release, (release) => release.label)
  releases!: Release[];
}
