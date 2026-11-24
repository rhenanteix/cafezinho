import { prisma } from "../database/prisma";

export const PaymentLinkModel = {
  findForUser(linkId: string, userId: string) {
    return prisma.paymentLink.findFirst({ where: { id: linkId, userId } });
  },

  registerClick(id: string) {
    return prisma.paymentLink.update({ where: { id }, data: { clicks: { increment: 1 } } });
  },
};
