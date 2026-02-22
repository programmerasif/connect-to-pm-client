import prisma from "@/db/db.config";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@gmail.com";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  const hashedPass = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPass,
    },
  });

  console.log("✅ Admin seeded:", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
