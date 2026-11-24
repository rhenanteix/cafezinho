import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { PaymentLinkModel } from "../models/PaymentLinkModel";
import { CreatorView } from "../views/CreatorView";
import { AppError } from "../utils/AppError";
import { slugSchema } from "../validators/creatorValidators";

export const CreatorController = {
  async show(req: Request<{ slug: string }>, res: Response) {
    const user = await UserModel.findBySlug(req.params.slug.toLowerCase());
    if (!user) throw new AppError("Página não encontrada", 404);
    if (req.query.preview !== "1") await UserModel.incrementViews(user.id);
    res.json(CreatorView.public(user));
  },

  async registerClick(req: Request<{ slug: string; linkId: string }>, res: Response) {
    const user = await UserModel.findBySlug(req.params.slug.toLowerCase());
    const link = user && (await PaymentLinkModel.findForUser(req.params.linkId, user.id));
    if (!link) throw new AppError("Link não encontrado", 404);
    await PaymentLinkModel.registerClick(link.id);
    res.json({ url: link.url });
  },

  async slugAvailability(req: Request<{ slug: string }>, res: Response) {
    const parsed = slugSchema.safeParse(req.params.slug);
    if (!parsed.success) {
      return res.json({ slug: req.params.slug, available: false, reason: parsed.error.issues[0].message });
    }
    const taken = await UserModel.isSlugTaken(parsed.data, req.query.ignore as string | undefined);
    res.json({ slug: parsed.data, available: !taken, reason: taken ? "Este endereço já está em uso" : undefined });
  },
};
