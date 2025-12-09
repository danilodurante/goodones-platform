import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Label } from "./label.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  role!: string; // "owner" | "staff" | "viewer" ecc.

  @ManyToOne(() => Label, (label) => label.users, {
    onDelete: "CASCADE",
  })
  label!: Label;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  createdAt!: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  updatedAt!: Date;
}
