import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Release } from "./release.entity";

@Entity()
export class RadioCampaign {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Release, {
    onDelete: "CASCADE",
  })
  release!: Release;

  @Column()
  country!: string;

  @Column()
  status!: string; // "planned" | "running" | "completed"

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
