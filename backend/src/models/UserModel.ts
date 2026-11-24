import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";

const withLinks = { paymentLinks: { orderBy: { position: "asc" } } } satisfies Prisma.UserInclude;

export type UserWithLinks = Prisma.UserGetPayload<{ include: typeof withLinks }>;

export type PaymentLinkInput = Pick<Prisma.PaymentLinkCreateManyInput, "url" | "label" | "amountCents">;

export const UserModel = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id }, include: withLinks });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findBySlug(slug: string) {
    return prisma.user.findUnique({ where: { slug }, include: withLinks });
  },

  async isSlugTaken(slug: string, ignoreUserId?: string) {
    const user = await prisma.user.findUnique({ where: { slug }, select: { id: true } });
    return Boolean(user && user.id !== ignoreUserId);
  },

  create(data: Omit<Prisma.UserCreateInput, "paymentLinks">, links: PaymentLinkInput[]) {
    return prisma.user.create({
      data: {
        ...data,
        paymentLinks: { create: links.map((link, position) => ({ ...link, position })) },
      },
      include: withLinks,
    });
  },

  async update(id: string, data: Prisma.UserUpdateInput, links?: PaymentLinkInput[]) {
    return prisma.$transaction(async (tx) => {
      if (links) {
        const existing = await tx.paymentLink.findMany({ where: { userId: id } });
        await tx.paymentLink.deleteMany({ where: { userId: id } });
        await tx.paymentLink.createMany({
          data: links.map((link, position) => ({
            ...link,
            position,
            userId: id,
            clicks: existing.find((e) => e.url === link.url)?.clicks ?? 0,
          })),
        });
      }
      return tx.user.update({ where: { id }, data, include: withLinks });
    });
  },

  incrementViews(id: string) {
    return prisma.user.update({ where: { id }, data: { views: { increment: 1 } } });
  },
};
