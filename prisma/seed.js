import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  try {
    const emailAdmin = process.env.ADMIN_EMAIL
    const senhaPura = process.env.ADMIN_PASSWORD
    const senhaHash = await bcrypt.hash(senhaPura, 10);

    const admin = await prisma.admin.upsert({
      where: { email: emailAdmin },
      update: { senha: senhaHash },
      create: {
        email: emailAdmin,
        senha: senhaHash,
      },
    });

    console.log(`Admin configurado com sucesso: ${admin.email}`);
  } catch (erro) {
    console.error("Erro ao executar o seed:", erro);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();