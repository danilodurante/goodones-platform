import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Release } from "./release.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Release, (release) => release.tracks, {
    onDelete: "CASCADE",
  })
  release!: Release;

  @Column()
  title!: string;

  @Column()
  isrc!: string;

  @Column()
  artist!: string;

  @Column({ type: "int" })
  trackNumber!: number;

  @Column({ nullable: true })
  version?: string;
}
