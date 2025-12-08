import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import { Label } from "./entities/label.entity";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

async function runSeed() {
  await AppDataSource.initialize();

  console.log("⚡ Running seed...");

  // Check if label exists
  let label = await AppDataSource.getRepository(Label).findOne({
    where: { name: "Good Ones Demo Label" },
  });

  if (!label) {
    label = AppDataSource.getRepository(Label).create({
      name: "Good Ones Demo Label",
      website: "https://goodones.ai",
    });
    await AppDataSource.getRepository(Label).save(label);
    console.log("✓ Label created");
  } else {
    console.log("✓ Label already exists");
  }

  // Check if user exists
  let user = await AppDataSource.getRepository(User).findOne({
    where: { email: "demo@goodones.ai" },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash("demo123", 10);

    user = AppDataSource.getRepository(User).create({
      email: "demo@goodones.ai",
      passwordHash,
      role: "owner",
      label,
    });

    await AppDataSource.getRepository(User).save(user);
    console.log("✓ Demo user created");
  } else {
    console.log("✓ Demo user already exists");
  }

  console.log("🌱 Seed completed!");
  process.exit(0);
}

runSeed();
