import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { CreatorView } from "../views/CreatorView";
import { AppError } from "../utils/AppError";
import type { UpdateProfileInput } from "../validators/creatorValidators";

export const ProfileController = {
  async show(req: Request, res: Response) {
    const user = await UserModel.findById(req.userId!);
    if (!user) throw new AppError("Conta não encontrada", 404);
    res.json(CreatorView.private(user));
  },

  async update(req: Request, res: Response) {
    const { socials, paymentLinks, ...data } = req.body as UpdateProfileInput;
    if (data.slug && (await UserModel.isSlugTaken(data.slug, req.userId))) {
      throw new AppError("Este endereço já está em uso", 409, { slug: "Endereço já está em uso" });
    }
    const user = await UserModel.update(req.userId!, { ...data, ...socials }, paymentLinks);
    res.json(CreatorView.private(user));
  },
};
