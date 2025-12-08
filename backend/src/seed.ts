import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import { Label } from "./entities/label.entity";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

async function runSeed() {
  console.log("⚡ Running seed...");

  await AppDataSource.initialize();

  const labelRepo = AppDataSource.getRepository(Label);
  const userRepo = AppDataSource.getRepository(User);

  // Check if label exists
  let label = await labelRepo.findOne({
    where: { name: "Good Ones Demo Label" },
  });

  if (!label) {
    label = labelRepo.create({
      name: "Good Ones Demo Label",
      website: "https://goodones.ai",
    });
    await labelRepo.save(label);
    console.log("✓ Label created");
  } else {
    console.log("✓ Label already exists");
  }

  // Check if user exists
  let user = await userRepo.findOne({
    where: { email: "demo@goodones.ai" },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash("demo123", 10);

    user = userRepo.create({
      email: "demo@goodones.ai",
      passwordHash,
      role: "owner",
      label, // relazione TypeORM
    });

    await userRepo.save(user);
    console.log("✓ Demo user created");
  } else {
    console.log("✓ Demo user already exists");
  }

  console.log("🌱 Seed completed!");

  await AppDataSource.destroy();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
