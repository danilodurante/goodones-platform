import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Release } from "./release.entity";

@Entity()
export class DistributionJob {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Release, {
    onDelete: "CASCADE",
  })
  release!: Release;

  @Column()
  platform!: string; // Spotify, Apple Music, ecc.

  @Column()
  status!: string; // pending, delivered, failed

  @Column({ type: "timestamptz", default: () => "NOW()" })
  createdAt!: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  updatedAt!: Date;
}
