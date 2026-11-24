import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@cafezinho.dev";
  if (await prisma.user.findUnique({ where: { email } })) return;
  await prisma.user.create({
    data: {
      name: "Marina Lopes",
      email,
      passwordHash: await bcrypt.hash("cafezinho", 10),
      slug: "marina",
      area: "Ilustradora e quadrinista",
      bio: "Desenho tirinhas sobre o dia a dia de quem trabalha de casa. Se meu trabalho te fez sorrir, me paga um café!",
      instagram: "https://instagram.com/marina",
      youtube: "https://youtube.com/@marina",
      website: "https://marina.art.br",
      paymentLinks: {
        create: [
          { label: "Um cafezinho (R$ 5,00)", url: "https://nubank.com.br/cobrar/demo5", amountCents: 500, position: 0 },
          { label: "Café com pão de queijo (R$ 10,00)", url: "https://mpago.la/demo10", amountCents: 1000, position: 1 },
          { label: "Valor livre", url: "https://pag.ae/demo", position: 2 },
        ],
      },
    },
  });
  console.log("Seed: perfil demo criado → /marina (demo@cafezinho.dev / cafezinho)");
}

main().finally(() => prisma.$disconnect());
