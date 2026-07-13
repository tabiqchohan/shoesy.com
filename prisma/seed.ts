import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    { name: "Men", slug: "men" },
    { name: "Women", slug: "women" },
    { name: "Kids", slug: "kids" },
    { name: "Sports", slug: "sports" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const adminPassword = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@shoesy.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@shoesy.com",
      password: adminPassword,
      role: "admin",
    },
  });

  console.log("Seed completed!");
  console.log("Admin login: admin@shoesy.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
