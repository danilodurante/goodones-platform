import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Label } from "./label.entity";
import { Track } from "./track.entity";

@Entity()
export class Release {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Label, (label) => label.releases, {
    onDelete: "CASCADE",
  })
  label!: Label;

  @Column()
  title!: string;

  @Column()
  type!: string; // "album" | "ep" | "single"

  @Column()
  primaryArtist!: string;

  @Column()
  upc!: string;

  @Column({ type: "date" })
  releaseDate!: Date;

  @OneToMany(() => Track, (track) => track.release, {
    cascade: true,
  })
  tracks!: Track[];
}
